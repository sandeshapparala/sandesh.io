import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { parseEnquiry } from "../src/lib/enquiry-validation.ts";
import {
  saveEnquiry,
  EnquiryConflict,
  EnquiryRateLimit,
} from "../src/lib/save-enquiry.ts";

const sample = () => ({
  submissionId: randomUUID(),
  name: " QA Test ",
  company: "Test project",
  email: "QA@EXAMPLE.COM",
  type: "Other",
  requirement: "Business website",
  volume: "Not sure",
  current: "",
  goal: "Synthetic contact test",
  website: "",
});
test("validates and normalizes submitted fields", () => {
  const parsed = parseEnquiry(sample());
  assert.equal(parsed.name, "QA Test");
  assert.equal(parsed.email, "qa@example.com");
  for (const changes of [
    { name: "   " },
    { email: "not-an-email" },
    { requirement: "unlisted" },
    { goal: "x".repeat(451) },
    { website: "spam" },
    { submissionId: "../../bad" },
    { company: 123 },
  ])
    assert.throws(() => parseEnquiry({ ...sample(), ...changes }));
});

// Contract double: writes are only published when the transaction completes.
function database() {
  const records = new Map();
  const snapshot = (ref) => ({
    exists: records.has(ref),
    get: (key) => records.get(ref)?.[key],
  });
  return {
    records,
    collection: (name) => ({ doc: (id) => `${name}/${id}` }),
    runTransaction: async (fn) => {
      const writes = [];
      const result = await fn({
        get: async (ref) => snapshot(ref),
        getAll: async (...refs) => refs.map(snapshot),
        create: (ref, data) => writes.push([ref, data]),
        set: (ref, data) => writes.push([ref, data]),
      });
      for (const [ref, data] of writes) records.set(ref, data);
      return result;
    },
  };
}
test("retries return the same reference without another lead or rate-limit write", async () => {
  const db = database();
  const data = parseEnquiry(sample());
  const first = await saveEnquiry(db, data, "test-secret");
  const count = db.records.size;
  const second = await saveEnquiry(db, data, "test-secret");
  assert.equal(first.reference, second.reference);
  assert.equal(second.duplicate, true);
  assert.equal(db.records.size, count);
  assert.equal(
    db.records.get(`enquiries/${data.submissionId}`).notification.status,
    "not_configured",
  );
  await assert.rejects(
    saveEnquiry(db, { ...data, goal: "Different brief" }, "test-secret"),
    EnquiryConflict,
  );
});
test("email rate limit blocks a fourth new enquiry without partial writes", async () => {
  const db = database();
  for (let i = 0; i < 3; i++)
    await saveEnquiry(db, parseEnquiry(sample()), "test-secret");
  const count = db.records.size;
  await assert.rejects(
    saveEnquiry(db, parseEnquiry(sample()), "test-secret"),
    EnquiryRateLimit,
  );
  assert.equal(db.records.size, count);
});
test("storage failure is propagated, never represented as a saved enquiry", async () => {
  await assert.rejects(
    saveEnquiry(
      {
        collection: () => ({ doc: () => null }),
        runTransaction: async () => {
          throw new Error("offline");
        },
      },
      parseEnquiry(sample()),
      "test-secret",
    ),
    /offline/,
  );
});
