import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type { Event, Referral } from "./types.ts";
export function digest(value: string) {
  return createHash("sha256").update(value).digest("hex");
}
export function validSignature(
  body: Buffer,
  header: string | null,
  secret: string,
) {
  if (!secret || !header || !/^sha256=[a-f\d]{64}$/i.test(header)) return false;
  return timingSafeEqual(
    Buffer.from(header.slice(7), "hex"),
    createHmac("sha256", secret).update(body).digest(),
  );
}
type Obj = Record<string, unknown>;
const obj = (v: unknown): Obj =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as Obj) : {};
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const str = (v: unknown, max = 4000) =>
  typeof v === "string" ? v.slice(0, max) : "";
export function parseWebhook(
  payload: unknown,
  phoneId: string,
  wabaId: string,
): Exclude<Event, { kind: "manual" }>[] {
  if (!phoneId || !wabaId) throw new Error("Target configuration missing");
  const root = obj(payload);
  if (root.object !== "whatsapp_business_account") return [];
  const events: Exclude<Event, { kind: "manual" }>[] = [];
  for (const rawEntry of arr(root.entry)) {
    const entry = obj(rawEntry);
    if (entry.id !== wabaId) throw new Error("Wrong target");
    for (const rawChange of arr(entry.changes)) {
      const change = obj(rawChange),
        value = obj(change.value);
      if (!["messages", "smb_message_echoes"].includes(str(change.field)))
        continue;
      if (obj(value.metadata).phone_number_id !== phoneId)
        throw new Error("Wrong target");
      for (const rawStatus of arr(value.statuses)) {
        const s = obj(rawStatus),
          status = str(s.status);
        if (
          !["sent", "delivered", "read", "failed"].includes(status) ||
          !str(s.id)
        )
          continue;
        events.push({
          kind: "status",
          id: str(s.id, 300),
          phone: str(s.recipient_id, 20),
          status: status as "sent" | "delivered" | "read" | "failed",
          timestamp: Number(s.timestamp) * 1000 || Date.now(),
        });
      }
      const echo = change.field === "smb_message_echoes";
      for (const rawMessage of arr(
        echo ? (value.message_echoes ?? value.messages) : value.messages,
      )) {
        const m = obj(rawMessage),
          phone = str(echo ? m.to : m.from, 20);
        if (!/^\d{8,15}$/.test(phone) || !str(m.id)) continue;
        const interactive = obj(m.interactive);
        const text =
          str(obj(m.text).body) ||
          str(obj(m.button).text) ||
          str(obj(interactive.button_reply).title) ||
          str(obj(interactive.list_reply).title);
        const r = obj(m.referral);
        const referral: Referral | null = m.referral
          ? {
              headline: str(r.headline, 300),
              body: str(r.body, 1200),
              sourceId: str(r.source_id, 200),
              sourceUrl: str(r.source_url, 500),
              clickId: str(r.ctwa_clid, 500),
            }
          : null;
        const contact = arr(value.contacts)
          .map(obj)
          .find((c) => c.wa_id === phone);
        const timestamp = Number(m.timestamp) * 1000;
        if (
          !Number.isFinite(timestamp) ||
          timestamp <= 0 ||
          timestamp > Date.now() + 300000
        )
          continue;
        events.push({
          kind: echo ? "echo" : "inbound",
          id: str(m.id, 300),
          phone,
          name: str(obj(contact?.profile).name, 120),
          text: text || `[${str(m.type, 30) || "Unsupported message"}]`,
          timestamp,
          unsupported: !text,
          referral,
        });
      }
    }
  }
  if (events.length > 200) throw new Error("Too many events");
  return events;
}
export async function boundedBody(request: Request, maximum: number) {
  if (Number(request.headers.get("content-length")) > maximum)
    throw new Error("Body too large");
  const reader = request.body?.getReader();
  if (!reader) return Buffer.alloc(0);
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > maximum) {
        await reader.cancel();
        throw new Error("Body too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks);
}
