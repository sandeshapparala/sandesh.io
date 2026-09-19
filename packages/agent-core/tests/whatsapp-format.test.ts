import test from "node:test";
import assert from "node:assert/strict";
import { formatWhatsAppReply, isSimpleGreeting, WELCOME_REPLY } from "../src/whatsapp-format.ts";
import { safeDecision } from "../src/policy.ts";

test("formats emphasis, lists and links for WhatsApp without changing facts", () => {
  assert.equal(formatWhatsAppReply("## How it works\r\n\r\n• **Answer enquiries**\n* Qualify leads\n\n\n[Services](https://sandesh.io/services)"), "*How it works*\n\n- *Answer enquiries*\n- Qualify leads\n\nServices: https://sandesh.io/services");
});
test("preserves native formatting, language, URLs and paragraph spacing", () => {
  const text = "*సేవలు*\n\n- వివరాలు\n\nhttps://sandesh.io/services\n\nWhat do you need?";
  assert.equal(formatWhatsAppReply(text), text);
});
test("short greeting does not swallow a question or commercial intent", () => {
  for (const greeting of ["Hi", "Hello!", "hey 👋", "Good morning"]) assert.ok(isSimpleGreeting(greeting));
  for (const question of ["Hi, I need a website", "Hello pricing?", "Are you AI?", "stop"]) assert.equal(isSimpleGreeting(question), false);
  assert.ok(WELCOME_REPLY.split(/\s+/).length < 25);
  assert.equal(safeDecision({ reply: WELCOME_REPLY, handoff: false }, "Hi").handoff, false);
});
