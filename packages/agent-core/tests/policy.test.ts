import test from "node:test";
import assert from "node:assert/strict";
import {
  eligible,
  inWindow,
  isPricing,
  optedOut,
  safeDecision,
  PRICE_REPLY,
  FALLBACK_REPLY,
} from "../src/policy.ts";
test("commercial enquiries always receive a human pricing handoff", () => {
  for (const message of [
    "How much does this cost?",
    "give me a quote",
    "monthly subscription",
    "What is your budget package?",
    "ధర ఎంత",
    "ಬೆಲೆ",
    "कीमत बताओ",
  ]) {
    assert.ok(isPricing(message));
    const d = safeDecision({ reply: "It costs 100", handoff: false }, message);
    assert.equal(d.reply, PRICE_REPLY);
    assert.equal(d.handoff, true);
  }
});
test("output gate blocks money, offers, and false booking guarantees", () => {
  for (const reply of [
    "₹5000 per month",
    "It is free",
    "20k",
    "one thousand rupees",
    "Booking confirmed",
    "100% accurate",
    "$99",
    "INR 200",
  ]) {
    assert.equal(
      safeDecision({ reply, handoff: false }, "Tell me about agents").reply,
      FALLBACK_REPLY,
    );
  }
});
test("normal service explanations remain useful", () => {
  assert.equal(
    safeDecision(
      {
        reply: "I can help qualify enquiries. What business do you run?",
        handoff: false,
      },
      "Can you help?",
    ).handoff,
    false,
  );
});
test("missing or malformed model decisions fail to human review", () => {
  for (const value of [null, {}, { reply: "" }, { reply: "x".repeat(1500) }])
    assert.equal(safeDecision(value, "").handoff, true);
});
test("mode and 24-hour window are closed by default", () => {
  assert.equal(eligible("off", "919999999999", []), false);
  assert.equal(eligible("internal", "919999999999", []), false);
  assert.equal(eligible("internal", "919999999999", ["919999999999"]), true);
  assert.equal(inWindow(0), false);
  assert.equal(inWindow(1000, 86401000), false);
  assert.equal(inWindow(1000, 2000), true);
  assert.equal(inWindow(3000, 2000), false);
});
test("opt-out is an explicit persistent signal", () => {
  assert.ok(optedOut("STOP"));
  assert.ok(optedOut("Don't message me"));
  assert.equal(optedOut("Can it stop missed enquiries?"), false);
});
