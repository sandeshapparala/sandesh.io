import type { Decision, Mode } from "./types.ts";
export const PRICE_REPLY =
  "Sandesh will discuss the scope and pricing with you personally. What would you like the agent to handle for your business?";
export const FALLBACK_REPLY =
  "This needs Sandesh’s input. I’ll leave your message for him to review.";
const priceIntent =
  /\b(price|pricing|cost|costs|rates?|quote|quotation|charges?|fees?|discount|cheap|expensive|budget|investment|package|payment|subscription)\b|how much|ఎంత|ధర|ಬೆಲೆ|ದರ|कीमत|दाम|कितन/iu;
const money =
  /[₹$€£]|\b(?:inr|usd|rupees?|dollars?|rs\.?|lakh|crore|thousand|hundred|free|discount|per month|monthly fee)\b|\d[\d,.]*\s*(?:k\b|\/\s*(?:mo|month|year))|ధర|ಬೆಲೆ|कीमत/iu;
export function isPricing(text: string) {
  return priceIntent.test(text.normalize("NFKC"));
}
export function optedOut(text: string) {
  return /^(stop|unsubscribe|opt out|do not contact|don't message me|remove me)[.!\s]*$/i.test(
    text.trim(),
  );
}
export function eligible(mode: Mode, phone: string, testers: string[]) {
  return mode === "public" || (mode === "internal" && testers.includes(phone));
}
export function inWindow(lastInboundAt: number, now = Date.now()) {
  return (
    lastInboundAt > 0 &&
    now - lastInboundAt < 24 * 60 * 60 * 1000 &&
    lastInboundAt <= now
  );
}
export function safeDecision(value: unknown, input: string): Decision {
  const fallback: Decision = {
    reply: FALLBACK_REPLY,
    handoff: true,
    reason: "needs_review",
    summary: "",
    service: "",
    business: "",
    timeline: "",
  };
  if (isPricing(input))
    return { ...fallback, reply: PRICE_REPLY, reason: "pricing_requested" };
  if (!value || typeof value !== "object") return fallback;
  const v = value as Record<string, unknown>;
  if (
    typeof v.reply !== "string" ||
    !v.reply.trim() ||
    v.reply.length > 1400 ||
    money.test(v.reply) ||
    /\b(?:booked|booking confirmed|guaranteed|100% accurate)\b/i.test(v.reply)
  )
    return fallback;
  const text = (key: string) =>
    typeof v[key] === "string" ? (v[key] as string).slice(0, 600) : "";
  return {
    reply: v.reply.trim(),
    handoff: v.handoff !== false,
    reason: text("reason"),
    summary: text("summary"),
    service: text("service"),
    business: text("business"),
    timeline: text("timeline"),
  };
}
