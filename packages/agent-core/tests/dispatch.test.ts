import { test, mock, afterEach } from "node:test";
import assert from "node:assert/strict";
import { dispatchReply, verifyWorker } from "../src/dispatch.ts";

const originalSecret = process.env.AGENT_DISPATCH_SECRET;
const originalTarget = process.env.AGENT_WORKER_URL;
afterEach(() => {
  mock.restoreAll();
  if (originalSecret === undefined) delete process.env.AGENT_DISPATCH_SECRET;
  else process.env.AGENT_DISPATCH_SECRET = originalSecret;
  if (originalTarget === undefined) delete process.env.AGENT_WORKER_URL;
  else process.env.AGENT_WORKER_URL = originalTarget;
});
test("worker rejects missing, short and incorrect credentials", () => {
  const request = (value: string) => new Request("https://agent.test", { headers: { authorization: value } });
  delete process.env.AGENT_DISPATCH_SECRET;
  assert.equal(verifyWorker(request("Bearer test")), false);
  process.env.AGENT_DISPATCH_SECRET = "test";
  assert.equal(verifyWorker(request("Bearer test")), false);
  process.env.AGENT_DISPATCH_SECRET = "a".repeat(48);
  assert.equal(verifyWorker(request(`Bearer ${"b".repeat(48)}`)), false);
  assert.equal(verifyWorker(request(`Bearer ${"a".repeat(48)}`)), true);
});
test("manual dispatch requires HTTPS and explicit worker acceptance", async () => {
  process.env.AGENT_DISPATCH_SECRET = "a".repeat(48);
  process.env.AGENT_WORKER_URL = "http://agent.test/api/jobs/reply";
  const fetchMock = mock.method(globalThis, "fetch", async (_url: unknown, init?: RequestInit) => {
    assert.equal(init?.redirect, "error");
    assert.equal(JSON.parse(init?.body as string).id, "f".repeat(64));
    assert.equal(new Headers(init?.headers).get("authorization"), `Bearer ${"a".repeat(48)}`);
    return new Response("Accepted", { status: 202 });
  });
  await assert.rejects(dispatchReply("f".repeat(64)));
  assert.equal(fetchMock.mock.callCount(), 0);
  process.env.AGENT_WORKER_URL = "https://agent.test/api/jobs/reply";
  await dispatchReply("f".repeat(64));
  fetchMock.mock.mockImplementation(async () => new Response("Unavailable", { status: 503 }));
  await assert.rejects(dispatchReply("f".repeat(64)));
});
