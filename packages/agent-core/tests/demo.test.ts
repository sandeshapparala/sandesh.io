import test from "node:test";
import assert from "node:assert/strict";
import { wantsDemo, DEMO_OFFER, DEMO_REPLY, DEMO_URL } from "../src/demo.ts";
import { generateReply } from "../src/model.ts";
import { PRICE_REPLY } from "../src/policy.ts";

test("demo requests and acceptance use the approved number without a model call", async (t) => {
  const fetch = t.mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected model call"); });
  for (const text of ["demo", "Can I try the demo?", "Send me your demo link", "Share the demo number please"])
    assert.equal((await generateReply(text, [])).reply, DEMO_REPLY);
  assert.equal((await generateReply("Yes please", [{id:"offer",direction:"outbound",text:DEMO_OFFER,timestamp:1}])).reply, DEMO_REPLY);
  assert.ok(DEMO_REPLY.includes(DEMO_URL));
  assert.equal(fetch.mock.callCount(), 0);
});
test("demo shortcuts do not override declines, ambiguous yes, or pricing", async () => {
  assert.equal(wantsDemo("No demo please", []), false);
  assert.equal(wantsDemo("Yes", []), false);
  assert.equal(wantsDemo("Will the demo integrate with my CRM?", []), false);
  assert.equal((await generateReply("What is the demo pricing?", [])).reply, PRICE_REPLY);
});
