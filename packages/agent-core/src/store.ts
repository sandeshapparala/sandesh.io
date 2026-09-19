import "server-only";
import { db } from "./firebase";
import { digest } from "./webhook";
import { optedOut } from "./policy";
import type { Event, Mode, Message } from "./types";
export const conversationRef = (phone: string) =>
  db().collection("wa_conversations").doc(digest(phone));
export const settingsRef = () => db().collection("wa_settings").doc("agent");
export async function settings() {
  const data = (await settingsRef().get()).data();
  const mode: Mode = ["off", "internal", "public"].includes(data?.mode)
    ? data!.mode
    : "off";
  return {
    mode,
    testers: (process.env.AGENT_TEST_NUMBERS || "")
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean),
  };
}
export async function persist(event: Exclude<Event, { kind: "manual" }>) {
  const id = digest(
    `${event.kind}:${event.id}${event.kind === "status" ? `:${event.status}` : ""}`,
  );
  const ref = db().collection("wa_jobs").doc(id),
    conv = conversationRef(event.phone);
  await db().runTransaction(async (tx) => {
    const existing = await tx.get(ref);
    if (existing.exists) return;
    const old =
      event.kind !== "status" ? (await tx.get(conv)).data() : undefined;
    tx.create(ref, {
      event,
      state: "pending",
      createdAt: Date.now(),
      attempts: 0,
    });
    if (event.kind !== "status") {
      const stop = event.kind === "inbound" && optedOut(event.text);
      const newer = event.timestamp >= (old?.lastInboundAt || 0);
      tx.set(
        conv,
        {
          phone: event.phone,
          name: event.name || old?.name || event.phone,
          ...(!old
            ? {
                aiEnabled: true,
                optedOut: false,
                needsAttention: false,
                reason: "",
                lastInboundAt: 0,
                revision: 0,
              }
            : {}),
          ...(newer ? { preview: event.text, updatedAt: event.timestamp } : {}),
          ...(event.kind === "inbound" && newer
            ? {
                lastInboundAt: Math.max(
                  event.timestamp,
                  old?.lastInboundAt || 0,
                ),
                latestInboundId: event.id,
                revision: (old?.revision || 0) + 1,
              }
            : {}),
          ...(event.referral ? { referral: event.referral } : {}),
          ...(stop
            ? {
                optedOut: true,
                aiEnabled: false,
                needsAttention: true,
                reason: "opted_out",
              }
            : {}),
          ...(event.kind === "echo"
            ? {
                aiEnabled: false,
                needsAttention: true,
                reason: "whatsapp_app_reply",
                revision: (old?.revision || 0) + 1,
              }
            : {}),
        },
        { merge: true },
      );
      tx.set(conv.collection("messages").doc(digest(event.id)), {
        providerId: event.id,
        text: event.text,
        direction: event.kind === "inbound" ? "inbound" : "outbound",
        sentBy: event.kind === "echo" ? "whatsapp_app" : "customer",
        timestamp: event.timestamp,
        status: event.kind === "echo" ? "sent" : "received",
      });
    }
  });
  return id;
}
export async function history(phone: string): Promise<Message[]> {
  const snap = await conversationRef(phone)
    .collection("messages")
    .orderBy("timestamp", "desc")
    .limit(20)
    .get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Message).reverse();
}
export async function applyStatus(event: Extract<Event, { kind: "status" }>) {
  const ref = conversationRef(event.phone)
    .collection("messages")
    .doc(digest(event.id));
  await db().runTransaction(async (tx) => {
    const old = (await tx.get(ref)).data();
    const rank: Record<string, number> = {
      sent: 1,
      failed: 2,
      delivered: 3,
      read: 4,
    };
    // Status can arrive before the outbound record. Preserve it for the send commit.
    if ((rank[event.status] || 0) > (rank[old?.status] || 0))
      tx.set(
        ref,
        { status: event.status, providerId: event.id },
        { merge: true },
      );
    if (event.status === "failed")
      tx.set(
        conversationRef(event.phone),
        { needsAttention: true, reason: "delivery_failed" },
        { merge: true },
      );
  });
}
