import { cookies } from "next/headers";
import { COOKIE, verifySession } from "@sandesh/agent-core/admin-auth";
import { db } from "@sandesh/agent-core/firebase";
import { settingsRef, settings } from "@sandesh/agent-core/store";
import { boundedBody, digest } from "@sandesh/agent-core/webhook";
import { dispatchReply } from "@sandesh/agent-core/dispatch";
import { eligible, inWindow, safeDecision } from "@sandesh/agent-core/policy";
export const runtime = "nodejs";
export const maxDuration = 30;
const json = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
async function authorized() {
  return verifySession((await cookies()).get(COOKIE)?.value);
}
export async function GET(request: Request) {
  if (!(await authorized()))
    return json({ error: "Sign in to continue." }, 401);
  const p = new URL(request.url).searchParams;
  try {
    if (p.get("view") === "enquiries") {
      const snap = await db()
        .collection("enquiries")
        .orderBy("createdAt", "desc")
        .limit(50)
        .get();
      return json({
        items: snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          createdAt: d.data().createdAt?.toMillis?.() || 0,
        })),
      });
    }
    const id = p.get("id");
    if (id) {
      if (!/^[a-f0-9]{64}$/.test(id))
        return json({ error: "Invalid conversation" }, 400);
      const ref = db().collection("wa_conversations").doc(id);
      const before = p.get("before");
      let query = ref.collection("messages").orderBy("timestamp", "desc");
      if (before) {
        if (!/^[a-f0-9]{64}$/.test(before))
          return json({ error: "Invalid cursor" }, 400);
        const cursor = await ref.collection("messages").doc(before).get();
        if (!cursor.exists) return json({ error: "Cursor expired" }, 400);
        query = query.startAfter(cursor);
      }
      const [conversation, messages] = await Promise.all([
        ref.get(),
        query.limit(40).get(),
      ]);
      if (!conversation.exists)
        return json({ error: "Conversation not found" }, 404);
      return json({
        conversation: { id, ...conversation.data() },
        messages: messages.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .reverse(),
        next: messages.size === 40 ? messages.docs.at(-1)?.id : null,
      });
    }
    let query = db()
      .collection("wa_conversations")
      .orderBy("updatedAt", "desc");
    const before = p.get("before");
    if (before) {
      if (!/^[a-f0-9]{64}$/.test(before))
        return json({ error: "Invalid cursor" }, 400);
      const cursor = await db()
        .collection("wa_conversations")
        .doc(before)
        .get();
      if (!cursor.exists) return json({ error: "Cursor expired" }, 400);
      query = query.startAfter(cursor);
    }
    const [snapshot, config] = await Promise.all([
      query.limit(40).get(),
      settings(),
    ]);
    return json({
      items: snapshot.docs.map((d) => ({ id: d.id, ...d.data() })),
      mode: config.mode,
      next: snapshot.size === 40 ? snapshot.docs.at(-1)?.id : null,
    });
  } catch {
    return json(
      { error: "Inbox could not be loaded. Check the Firebase configuration." },
      503,
    );
  }
}
export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return json({ error: "Forbidden" }, 403);
  if (!(await authorized()))
    return json({ error: "Sign in to continue." }, 401);
  try {
    const data = JSON.parse((await boundedBody(request, 8000)).toString());
    if (
      data.action === "mode" &&
      ["off", "internal", "public"].includes(data.mode)
    ) {
      await settingsRef().set(
        { mode: data.mode, updatedAt: Date.now() },
        { merge: true },
      );
      return json({ ok: true });
    }
    if (!/^[a-f0-9]{64}$/.test(data.id))
      return json({ error: "Invalid conversation" }, 400);
    const ref = db().collection("wa_conversations").doc(data.id);
    if (data.action === "toggle") {
      await db().runTransaction(async (tx) => {
        const c = (await tx.get(ref)).data();
        if (!c || c.optedOut)
          throw new Error("Cannot resume an opted-out contact");
        tx.update(ref, {
          aiEnabled: !c.aiEnabled,
          needsAttention: c.aiEnabled,
          reason: c.aiEnabled ? "owner_paused" : "",
          revision: (c.revision || 0) + 1,
        });
      });
      return json({ ok: true });
    }
    if (data.action === "reply") {
      if (
        typeof data.text !== "string" ||
        !data.text.trim() ||
        data.text.length > 1400 ||
        !/^[a-f0-9-]{36}$/i.test(data.requestId)
      )
        return json({ error: "Invalid reply" }, 400);
      // The no-pricing policy applies to this inbox until the owner approves pricing.
      if (
        safeDecision({ reply: data.text, handoff: false }, "").reply !==
        data.text.trim()
      )
        return json(
          { error: "Pricing and unconfirmed promises are disabled." },
          400,
        );
      const id = digest(`manual:${data.id}:${data.requestId}`),
        job = db().collection("wa_jobs").doc(id),
        config = await settings();
      await db().runTransaction(async (tx) => {
        const c = (await tx.get(ref)).data(),
          j = (await tx.get(job)).data();
        if (j) {
          if (j.event.text !== data.text.trim())
            throw new Error("Reply request conflicts with an earlier request");
          return;
        }
        if (
          !c ||
          c.optedOut ||
          !inWindow(c.lastInboundAt) ||
          !eligible(config.mode, c.phone, config.testers)
        )
          throw new Error("Sending is disabled or the reply window has closed");
        tx.create(job, {
          event: {
            kind: "manual",
            id,
            phone: c.phone,
            text: data.text.trim(),
            timestamp: Date.now(),
          },
          state: "pending",
          createdAt: Date.now(),
          attempts: 0,
        });
        tx.create(ref.collection("messages").doc(digest(`queued:${id}`)), {
          text: data.text.trim(),
          direction: "outbound",
          sentBy: "owner",
          timestamp: Date.now(),
          status: "queued",
        });
        tx.update(ref, {
          aiEnabled: false,
          needsAttention: true,
          reason: "owner_reply_queued",
          revision: (c.revision || 0) + 1,
        });
      });
      await dispatchReply(id);
      return json({
        ok: true,
        notice: "Reply queued. Delivery status appears after processing.",
      });
    }
    return json({ error: "Unknown action" }, 400);
  } catch {
    return json(
      {
        error:
          "Action could not be completed. Verify the sending mode, reply window and agent connection.",
      },
      503,
    );
  }
}
