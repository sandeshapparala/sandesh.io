import "server-only";
import { randomUUID } from "node:crypto";
import { db } from "./firebase";
import {
  conversationRef,
  settingsRef,
  settings,
  history,
  applyStatus,
} from "./store";
import { eligible, inWindow, safeDecision } from "./policy";
import { generateReply } from "./model";
import { sendText, SendFailure } from "./transport";
import { digest } from "./webhook";
import type { Event } from "./types";

export class Busy extends Error {}
export async function processJob(id: string) {
  const job = db().collection("wa_jobs").doc(id),
    lease = randomUUID(),
    now = Date.now();
  const claimed = await db().runTransaction(async (tx) => {
    const snapshot = await tx.get(job),
      data = snapshot.data();
    if (!data || ["done", "review", "skipped"].includes(data.state))
      return null;
    const event = data.event as Event,
      conv = conversationRef(event.phone);
    const c = (await tx.get(conv)).data();
    if (data.state === "sending") {
      if (now - (data.sendingAt || 0) < 90000) throw new Busy();
      tx.update(job, { state: "review", reason: "send_outcome_unknown" });
      tx.set(
        conv.collection("messages").doc(digest(`queued:${id}`)),
        { status: "review" },
        { merge: true },
      );
      tx.set(
        conv,
        {
          needsAttention: true,
          aiEnabled: false,
          reason: "send_outcome_unknown",
          leaseUntil: 0,
        },
        { merge: true },
      );
      return null;
    }
    if (
      data.leaseUntil > now ||
      ((event.kind === "inbound" || event.kind === "manual") &&
        c?.leaseUntil > now)
    )
      throw new Busy();
    tx.update(job, {
      state: "processing",
      lease,
      leaseUntil: now + 90000,
      attempts: (data.attempts || 0) + 1,
    });
    if (event.kind === "inbound" || event.kind === "manual")
      tx.set(conv, { lease, leaseUntil: now + 90000 }, { merge: true });
    return { event, revision: c?.revision || 0 };
  });
  if (!claimed) return;
  const { event, revision } = claimed,
    conv = conversationRef(event.phone);
  const draft = conv.collection("messages").doc(digest(`queued:${id}`));
  const finish = async (state: string, reason = "") =>
    db().runTransaction(async (tx) => {
      const j = (await tx.get(job)).data(),
        c = (await tx.get(conv)).data();
      const pending = (await tx.get(draft)).exists;
      if (j?.lease !== lease) return;
      tx.update(job, { state, reason, leaseUntil: 0, finishedAt: Date.now() });
      if (pending && ["review", "skipped"].includes(state))
        tx.update(draft, { status: state });
      if (c?.lease === lease) tx.update(conv, { leaseUntil: 0 });
    });
  try {
    if (event.kind === "status") {
      await applyStatus(event);
      await finish("done");
      return;
    }
    if (event.kind === "echo") {
      await finish("done");
      return;
    }
    const config = await settings(),
      current = (await conv.get()).data();
    const manual = event.kind === "manual";
    if (
      !eligible(config.mode, event.phone, config.testers) ||
      !current ||
      (!manual && !current.aiEnabled) ||
      current.optedOut ||
      !inWindow(current.lastInboundAt)
    ) {
      await finish("skipped", "not_eligible");
      return;
    }
    if (!manual && event.id !== current.latestInboundId) {
      await finish("skipped", "superseded");
      return;
    }
    const day = new Date().toISOString().slice(0, 10);
    if (!manual && current.replyDay === day && current.replyCount >= 60) {
      await conv.update({
        aiEnabled: false,
        needsAttention: true,
        reason: "daily_reply_limit",
      });
      await finish("review", "daily_reply_limit");
      return;
    }
    const decision = manual
      ? {
          reply: event.text,
          handoff: true,
          reason: "manual_reply",
          summary: "",
          service: "",
          business: "",
          timeline: "",
        }
      : event.unsupported
        ? safeDecision(null, "")
        : await generateReply(event.text, await history(event.phone));
    const reserved = await db().runTransaction(async (tx) => {
      const j = (await tx.get(job)).data(),
        c = (await tx.get(conv)).data(),
        s = (await tx.get(settingsRef())).data();
      if (
        j?.lease !== lease ||
        c?.lease !== lease ||
        c?.revision !== revision ||
        (!manual && !c.aiEnabled) ||
        c.optedOut ||
        !inWindow(c.lastInboundAt) ||
        !eligible(s?.mode || "off", event.phone, config.testers)
      )
        return false;
      tx.update(job, {
        state: "sending",
        sendingAt: Date.now(),
        reply: decision.reply,
      });
      tx.set(draft, {
        text: decision.reply,
        direction: "outbound",
        sentBy: manual ? "owner" : "ai",
        timestamp: Date.now(),
        status: "sending",
      });
      tx.update(conv, {
        ...(!manual
          ? {
              replyDay: day,
              replyCount: c.replyDay === day ? (c.replyCount || 0) + 1 : 1,
            }
          : {}),
        summary: decision.summary || c.summary || "",
        service: decision.service || c.service || "",
        business: decision.business || c.business || "",
        timeline: decision.timeline || c.timeline || "",
        ...(decision.handoff
          ? {
              aiEnabled: false,
              needsAttention: true,
              reason: decision.reason || "human_review",
            }
          : {}),
      });
      return true;
    });
    if (!reserved) {
      await finish("skipped", "conversation_changed");
      return;
    }
    // Never automatically retry an ambiguous send. A timeout may mean Meta accepted it.
    let providerId: string;
    try {
      providerId = await sendText(event.phone, decision.reply);
    } catch (error) {
      await conv.set(
        {
          aiEnabled: false,
          needsAttention: true,
          reason:
            error instanceof SendFailure && !error.uncertain
              ? "send_rejected"
              : "send_outcome_unknown",
        },
        { merge: true },
      );
      await finish("review", "check_delivery_before_retry");
      return;
    }
    const message = conv.collection("messages").doc(digest(providerId));
    await db().runTransaction(async (tx) => {
      const status = (await tx.get(message)).data()?.status;
      tx.set(
        message,
        {
          providerId,
          text: decision.reply,
          direction: "outbound",
          sentBy: manual ? "owner" : "ai",
          timestamp: Date.now(),
          status: status || "sent",
        },
        { merge: true },
      );
      tx.update(job, { providerId });
      tx.delete(draft);
    });
    await finish("done");
  } catch (error) {
    // A crash after send reservation leaves state=sending; retry converts it to review.
    const data = (await job.get()).data();
    if (data?.state !== "sending") await finish("pending", "processing_retry");
    throw error;
  }
}
