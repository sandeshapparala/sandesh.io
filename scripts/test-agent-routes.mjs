import assert from "node:assert/strict";
const site = process.argv[2] || "http://localhost:3013";
const agent = process.argv[3] || "http://localhost:3012";
const cases = [
  [site, "/admin", {}, 200],
  [site, "/api/admin/inbox", {}, 401],
  [
    site,
    "/api/admin/inbox",
    { headers: { Cookie: "sandesh_admin=forged" } },
    401,
  ],
  [
    site,
    "/api/admin/inbox",
    {
      method: "POST",
      headers: {
        Origin: "https://untrusted.example",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "mode", mode: "public" }),
    },
    403,
  ],
  [
    site,
    "/api/admin/session",
    {
      method: "POST",
      headers: { Origin: site, "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: "forged" }),
    },
    401,
  ],
  [
    agent,
    "/api/jobs/reply",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: "a".repeat(64) }),
    },
    401,
  ],
  [
    agent,
    "/api/webhooks/whatsapp/not-a-valid-secret",
    { method: "POST", body: "{}" },
    404,
  ],
];
for (const [base, path, init, status] of cases) {
  const response = await fetch(base + path, init);
  assert.equal(response.status, status, path);
  console.log(`PASS ${init.method || "GET"} ${path}: ${status}`);
}
console.log(
  "PASS admin access and worker/webhook authentication boundaries; no outbound sends.",
);
