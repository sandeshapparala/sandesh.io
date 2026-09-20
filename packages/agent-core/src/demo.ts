import type { Message } from "./types";

export const DEMO_URL = "https://wa.me/918331837887";
export const DEMO_OFFER = "Would you like to try the demo?";
export const DEMO_REPLY = `*Try the WhatsApp demo*\n\nMessage *+91 83318 37887*:\n${DEMO_URL}\n\nSend “Hi” to start the conversation.`;

export function wantsDemo(text: string, history: Message[]) {
  const input = text.trim().toLowerCase().replace(/[.!?]+$/g, "");
  if (/^(?:demo|demo link|demo number|try demo|send demo|show demo|share demo|i want (?:a |the )?demo|i want to try (?:a |the )?demo|(?:please )?(?:send|share|show)(?: me)? (?:a |the |your )?demo(?: link| number)?(?: please)?|(?:can|could) (?:i|we) (?:try|see|have|get) (?:a |the |your )?demo|(?:can|could) you (?:send|share|show)(?: me)? (?:a |the |your )?demo(?: link| number)?)$/i.test(input)) return true;
  const lastReply = history.findLast((message) => message.direction === "outbound")?.text || "";
  return /^(yes|yes please|sure|okay|ok|send it|please do|let's try)$/i.test(input)
    && /(?:would|do) you (?:like|want) to try (?:the |a |our )?demo\?/i.test(lastReply);
}
