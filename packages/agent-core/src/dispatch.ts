import "server-only";
import { timingSafeEqual } from "node:crypto";

export function verifyWorker(request: Request) {
  const secret = process.env.AGENT_DISPATCH_SECRET;
  if (!secret || secret.length < 32) return false;
  const actual = Buffer.from(request.headers.get("authorization") || "");
  const expected = Buffer.from(`Bearer ${secret}`);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

// Only the portfolio calls this. Provider webhooks process locally with after().
export async function dispatchReply(id: string) {
  const target = process.env.AGENT_WORKER_URL;
  const secret = process.env.AGENT_DISPATCH_SECRET;
  if (!target || new URL(target).protocol !== "https:" || !secret || secret.length < 32)
    throw new Error("Agent connection is not configured");
  const response = await fetch(target, {
    method: "POST",
    headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
    signal: AbortSignal.timeout(10000),
    redirect: "error",
    cache: "no-store",
  });
  if (response.status !== 202) throw new Error("Agent dispatch unavailable");
}
