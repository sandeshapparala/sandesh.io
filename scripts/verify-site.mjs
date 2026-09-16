import assert from "node:assert/strict";

// Run against an existing local server: npm run verify:site -- http://localhost:3010
const origin = process.argv[2] || "http://localhost:3000";
const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200, "Sitemap must load");
const sitemap = await sitemapResponse.text();
const pages = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => new URL(match[1]).pathname,
);
assert.ok(pages.length >= 10, "Expected public page collection");
const assets = new Set();
for (const path of pages) {
  const response = await fetch(`${origin}${path}`);
  assert.equal(response.status, 200, `${path} must load`);
  const html = await response.text();
  assert.equal(
    (html.match(/<h1[\s>]/g) || []).length,
    1,
    `${path} needs one H1`,
  );
  assert.ok(
    html.includes(
      `rel="canonical" href="https://sandesh.io${path === "/" ? "" : path}"`,
    ) || html.includes(`rel="canonical" href="https://sandesh.io${path}"`),
    `${path} canonical is wrong`,
  );
  assert.ok(
    !html.includes("SANITY_WRITE_TOKEN"),
    "No legacy credential identifiers in HTML",
  );
  for (const match of html.matchAll(/<img[^>]+src="([^"]+)"/g))
    assets.add(match[1].replaceAll("&amp;", "&"));
  console.log(`PASS ${path}`);
}
for (const asset of assets) {
  const response = await fetch(new URL(asset, origin));
  assert.equal(response.status, 200, `Image must load: ${asset}`);
  assert.ok(
    response.headers.get("content-type")?.startsWith("image/"),
    `Expected image: ${asset}`,
  );
}
for (const [from, to] of [
  ["/projects", "/work"],
  ["/services/whatsapp-ai-sales-agents", "/services/whatsapp-ai-agents"],
  ["/services/web-platforms", "/work#websites"],
  ["/work/megham-chocolate", "/work#websites"],
  ["/testimonial", "/work"],
]) {
  const response = await fetch(`${origin}${from}`, { redirect: "manual" });
  assert.equal(response.status, 308, `${from} must redirect permanently`);
  assert.equal(
    new URL(response.headers.get("location"), origin).href,
    new URL(to, origin).href,
  );
}
for (const path of [
  "/studio",
  "/api/booking",
  "/api/testimonials",
  "/work/not-a-real-project",
]) {
  assert.equal(
    (await fetch(`${origin}${path}`)).status,
    404,
    `${path} must not expose a legacy or unknown route`,
  );
}
const image = await fetch(`${origin}/opengraph-image`);
assert.equal(image.status, 200);
assert.match(image.headers.get("content-type"), /image\/png/);
console.log(
  `PASS ${pages.length} pages, ${assets.size} images, redirects, retired routes, and social image`,
);
