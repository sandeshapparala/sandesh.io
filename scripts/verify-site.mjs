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
const documents = new Map();
const internalLinks = new Set();
for (const path of pages) {
  const response = await fetch(`${origin}${path}`, { redirect: "manual" });
  assert.equal(response.status, 200, `${path} must load`);
  const html = await response.text();
  documents.set(path, html);
  assert.match(
    html,
    /data-theme="light"/,
    `${path} must render the light theme`,
  );
  assert.ok(
    !html.includes("Switch to dark theme"),
    `${path} must not offer dark mode`,
  );
  assert.ok(
    !html.includes("Design preview · Client testimonials"),
    `${path} must not publish testimonial templates`,
  );
  assert.match(
    html,
    /<meta name="description" content="[^"]+"/,
    `${path} needs a description`,
  );
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const url = new URL(match[1].replaceAll("&amp;", "&"), `${origin}${path}`);
    if (url.origin === new URL(origin).origin)
      internalLinks.add(url.pathname + url.hash);
  }
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
for (const link of internalLinks) {
  const url = new URL(link, origin);
  let html = documents.get(url.pathname);
  if (!html) {
    const response = await fetch(url);
    assert.equal(response.status, 200, `Internal link must resolve: ${link}`);
    html = await response.text();
  }
  if (url.hash)
    assert.ok(
      html.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
      `Missing anchor: ${link}`,
    );
}
assert.ok(
  documents.get("/").includes("https://wa.me/918331837887?text="),
  "Homepage must link to the supplied demo number",
);
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
  ["/services/web-platforms", "/services/website-development"],
  ["/services/ai-integration", "/services/ai-workflow-integration"],
  ["/work/megham-chocolate", "/work#ecommerce"],
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
  "/services/not-a-real-service",
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
  `PASS ${pages.length} pages, ${assets.size} images, ${internalLinks.size} internal links/anchors, light-only rendering, redirects, retired routes, and social image`,
);
