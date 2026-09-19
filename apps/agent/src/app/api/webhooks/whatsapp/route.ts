import {
  boundedBody,
  parseWebhook,
  validSignature,
} from "@sandesh/agent-core/webhook";
import { persist } from "@sandesh/agent-core/store";
import { after } from "next/server";
import { processJobs } from "@sandesh/agent-core/process-jobs";
export const runtime = "nodejs";
export const maxDuration = 300;
export async function GET(request: Request) {
  const p = new URL(request.url).searchParams,
    token = process.env.WHATSAPP_VERIFY_TOKEN;
  if (!token) return new Response("Not configured", { status: 503 });
  return p.get("hub.mode") === "subscribe" &&
    p.get("hub.verify_token") === token &&
    p.has("hub.challenge")
    ? new Response(p.get("hub.challenge"), {
        headers: { "Cache-Control": "no-store" },
      })
    : new Response("Forbidden", { status: 403 });
}
export async function POST(request: Request) {
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (
    !secret ||
    !process.env.WHATSAPP_PHONE_NUMBER_ID ||
    !process.env.WHATSAPP_WABA_ID
  )
    return new Response("Not configured", { status: 503 });
  let raw: Buffer;
  try {
    raw = await boundedBody(request, 1000000);
  } catch {
    return new Response("Too large", { status: 413 });
  }
  if (!validSignature(raw, request.headers.get("x-hub-signature-256"), secret))
    return new Response("Forbidden", { status: 403 });
  let events;
  try {
    events = parseWebhook(
      JSON.parse(raw.toString("utf8")),
      process.env.WHATSAPP_PHONE_NUMBER_ID,
      process.env.WHATSAPP_WABA_ID,
    );
  } catch {
    return new Response("Invalid event", { status: 400 });
  }
  try {
    const ids: string[] = [];
    for (const event of events) ids.push(await persist(event));
    after(() => processJobs(ids));
    return new Response("EVENT_RECEIVED");
  } catch {
    console.error("whatsapp_webhook_persist_failed");
    return new Response("Please retry", { status: 503 });
  }
}
