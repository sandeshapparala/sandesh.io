import { test, mock } from "node:test";
import assert from "node:assert/strict";

class Busy extends Error {}
const calls: string[] = [];
mock.module("../src/worker.ts", { namedExports: {
  Busy,
  processJob: async (id: string) => {
    calls.push(id);
    if (id === "busy" && calls.filter((x) => x === id).length === 1) throw new Busy();
    if (id === "failure") throw new Error("Model unavailable");
  },
} });
const { processJobs } = await import("../src/process-jobs.ts");
test("batch deduplicates, waits for a busy lease, and isolates failed jobs", async () => {
  const log = mock.method(console, "error", () => {});
  await processJobs(["busy", "failure", "success", "success"]);
  assert.equal(calls.filter((id) => id === "busy").length, 2);
  assert.equal(calls.filter((id) => id === "failure").length, 1);
  assert.equal(calls.filter((id) => id === "success").length, 1);
  assert.equal(log.mock.calls.filter((call) => call.arguments[0] === "whatsapp_job_incomplete").length, 1);
  log.mock.restore();
});
