import assert from "node:assert/strict";
(async () => {
  const url = "http://localhost:3011/api/enquiries";
  for (const [label, headers, body, status] of [
    [
      "cross-origin",
      { origin: "https://example.com", "content-type": "application/json" },
      "{}",
      403,
    ],
    [
      "wrong-format",
      { origin: "http://localhost:3011", "content-type": "text/plain" },
      "{}",
      415,
    ],
    [
      "invalid-json",
      { origin: "http://localhost:3011", "content-type": "application/json" },
      "{",
      400,
    ],
    [
      "oversized",
      { origin: "http://localhost:3011", "content-type": "application/json" },
      "x".repeat(9000),
      413,
    ],
    [
      "invalid-fields",
      { origin: "http://localhost:3011", "content-type": "application/json" },
      "{}",
      400,
    ],
  ]) {
    const r = await fetch(url, { method: "POST", headers, body });
    assert.equal(r.status, status);
    console.log("PASS", label, status);
  }
  assert.equal((await fetch(url)).status, 405);
  console.log("PASS no public read endpoint");
})().catch(() => {
  console.error("Route check failed");
  process.exitCode = 1;
});
