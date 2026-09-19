import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import {
  validSignature,
  parseWebhook,
  digest,
  boundedBody,
} from "../src/webhook.ts";
const payload = {
  object: "whatsapp_business_account",
  entry: [
    {
      id: "waba",
      changes: [
        {
          field: "messages",
          value: {
            metadata: { phone_number_id: "number" },
            contacts: [
              { wa_id: "919999999999", profile: { name: "Test Lead" } },
            ],
            messages: [
              {
                id: "wamid.1",
                from: "919999999999",
                timestamp: String(Math.floor(Date.now() / 1000)),
                type: "text",
                text: { body: "I need an AI agent" },
                referral: {
                  headline: "AI for your business",
                  source_id: "ad1",
                  ctwa_clid: "click1",
                },
              },
            ],
          },
        },
      ],
    },
  ],
};
test("valid signatures pass and changed content fails", () => {
  const raw = Buffer.from(JSON.stringify(payload));
  const sig = `sha256=${createHmac("sha256", "secret").update(raw).digest("hex")}`;
  assert.ok(validSignature(raw, sig, "secret"));
  assert.equal(validSignature(Buffer.from("tampered"), sig, "secret"), false);
  assert.equal(validSignature(raw, null, "secret"), false);
  assert.equal(validSignature(raw, "sha256=x", "secret"), false);
});
test("ad attribution and customer context survive parsing", () => {
  const events = parseWebhook(payload, "number", "waba");
  assert.equal(events.length, 1);
  const event = events[0];
  assert.equal(event.kind, "inbound");
  if (event.kind !== "inbound") return;
  assert.equal(event.referral?.clickId, "click1");
  assert.equal(event.name, "Test Lead");
  assert.equal(event.text, "I need an AI agent");
});
test("other client phone IDs or WABAs are rejected", () => {
  assert.throws(() => parseWebhook(payload, "other", "waba"));
  assert.throws(() => parseWebhook(payload, "number", "other"));
  assert.throws(() => parseWebhook(payload, "", "waba"));
});
test("dedupe keys are stable and avoid slash injection", () => {
  assert.equal(digest("wamid/1"), digest("wamid/1"));
  assert.match(digest("wamid/1"), /^[a-f0-9]{64}$/);
});
test("body limit is enforced without trusting content-length", async () => {
  await assert.rejects(
    boundedBody(
      new Request("http://localhost", {
        method: "POST",
        body: "x".repeat(100),
      }),
      10,
    ),
  );
});
