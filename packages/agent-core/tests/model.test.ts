import test from "node:test";
import assert from "node:assert/strict";
import { generateReply } from "../src/model.ts";
import { WELCOME_REPLY } from "../src/whatsapp-format.ts";
import { PRICE_REPLY } from "../src/policy.ts";

test("first hello uses a concise welcome without a model request", async (t) => {
  const fetch = t.mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected request"); });
  assert.equal((await generateReply("Hello!", [])).reply, WELCOME_REPLY);
  assert.equal((await generateReply("Hi, what is the pricing?", [])).reply, PRICE_REPLY);
  assert.equal(fetch.mock.callCount(), 0);
});

test("specific enquiries reach the model and return native WhatsApp formatting", async (t) => {
  const oldKey = process.env.GEMINI_API_KEY, oldModel = process.env.GEMINI_MODEL;
  process.env.GEMINI_API_KEY = "unit-test";
  process.env.GEMINI_MODEL = "unit-test";
  t.after(() => {
    if (oldKey === undefined) delete process.env.GEMINI_API_KEY; else process.env.GEMINI_API_KEY = oldKey;
    if (oldModel === undefined) delete process.env.GEMINI_MODEL; else process.env.GEMINI_MODEL = oldModel;
  });
  const fetch = t.mock.method(globalThis, "fetch", async () => Response.json({ candidates: [{ content: { parts: [{ text: JSON.stringify({ reply: "**Website development**\n\n• Business websites\n• Ecommerce stores\n\nWhat are you building?", handoff: false }) }] } }] }));
  const result = await generateReply("Hi, I need a website", []);
  assert.equal(fetch.mock.callCount(), 1);
  assert.equal(result.reply, "*Website development*\n\n- Business websites\n- Ecommerce stores\n\nWhat are you building?");
  assert.equal(result.handoff, false);
});
