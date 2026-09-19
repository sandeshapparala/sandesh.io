import { timingSafeEqual } from "node:crypto";
import { boundedBody, parseWebhook } from "@sandesh/agent-core/webhook";
import { persist } from "@sandesh/agent-core/store";
import { after } from "next/server";
import { processJobs } from "@sandesh/agent-core/process-jobs";
import { GET as verify } from "../route";
export const runtime = "nodejs";
export const maxDuration = 300;
async function allowed(params: Promise<{ key: string }>) {
  const { key } = await params,
    expected = process.env.DUALHOOK_WEBHOOK_SECRET;
  if (
    process.env.WHATSAPP_TRANSPORT !== "dualhook" ||
    !expected ||
    expected.length < 32
  )
    return false;
  const a = Buffer.from(key),
    b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
export async function GET(
  request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  if (!(await allowed(params)))
    return new Response("Not found", { status: 404 });
  return verify(request);
}
export async function POST(
  request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  if (!(await allowed(params)))
    return new Response("Not found", { status: 404 });
  if (!process.env.WHATSAPP_PHONE_NUMBER_ID || !process.env.WHATSAPP_WABA_ID)
    return new Response("Not configured", { status: 503 });
  let raw: Buffer;
  try {
    raw = await boundedBody(request, 1000000);
  } catch {
    return new Response("Too large", { status: 413 });
  }
  let events;
  try {
    events = parseWebhook(
      JSON.parse(raw.toString()),
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
    console.error("dualhook_webhook_persist_failed");
    return new Response("Please retry", { status: 503 });
  }
}
