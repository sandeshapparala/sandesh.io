# Rebuild implementation — 16 September 2026

## Foundation

Replaced the old source tree with a fresh light-first Next.js 16 application. Runtime dependencies reduced from 53 to 6: Next.js, React, React DOM, Lucide, Radix Dialog, and Radix Tabs. Removed Sanity, old APIs/Studio, three-dimensional effects, multiple animation engines, dark-mode providers, and unused UI components.

The old draft and approved plans are preserved in local Git commit `cb5e2f8`. A reversible source/archive backup lives at `E:\Personal Brand\myportfolio-backup-20260916`. The original local environment file remains untouched, but this implementation does not require its Sanity credentials. No remote CMS data was deleted. Nothing has been pushed or deployed.

Recommended runtime: Node 24 LTS (`.node-version`). The machine’s system npm currently launches Node 23; the bundled Node 24 binary is available for direct checks. npm is the only package manager for this project.

## Implemented

- Light homepage: personal identity, supplied portrait, service positioning, client names, four-state illustrative workflow, three AI project summaries, management offer, personal introduction, website portfolio, FAQs, and enquiry CTA.
- Accessible mobile navigation with focus management and Escape dismissal; keyboard-operated workflow tabs; native FAQ disclosures and scrolling; reduced-motion styles.
- Work index, three client project pages, WhatsApp service page, management page, About, Contact, Privacy, 404, sitemap, robots, favicon, and generated social-sharing image.
- Content in TypeScript/page source; no CMS, database, or external API required to render the site.
- Contact brief form with native validation, email-draft preparation, clipboard action, and a selectable brief if automatic copying fails. It does not send email or create a calendar booking.

## Media and evidence

- Colour portrait and sketch supplied by Sandesh in this conversation. Colour portrait used in the interface. Sketch retained as an alternative, not displayed.
- Megham and ZAX thumbnails: actual public homepage captures on 16 September, compressed to WebP. No reconstructed website screenshots.
- Epix thumbnail: its publicly served home-cinema hero image. Category corrected to home cinema and interiors after reading its public homepage.
- Yutha thumbnail: its public Open Graph image, showing Tranquil Meadows.
- Design Interio timed out in both HTTP and browser checks. Preserved as a named project without a broken preview or active website link. Recheck availability before restoring the link. Epix replaces it among the homepage’s three featured websites.
- Client names are typeset text, not invented claims of official logo artwork.
- AI case pages publish concise owner-confirmed project introductions only. No unverified metrics or client quotations. The user’s recorded demonstration remains pending and there is no fake video control.

## Route retirement

Existing Yutha project URL is preserved. Old `/projects`, ZAX/Epix legacy project URLs, `/testimonial`, applicable service slugs, and `/work/megham-chocolate` redirect to the appropriate new collection/service. `/studio`, `/api/booking`, `/api/testimonials`, the unneeded Verenza demo, and unrepresented legacy project slugs are retired as 404s. Unknown case-study slugs return 404.

## Verification

Initial lint, TypeScript, and production build passed. `scripts/verify-site.mjs` checks the sitemap’s 10 public content pages, canonical URLs, one H1 per page, all rendered image requests, important redirects, retired routes, unknown slugs, and the generated social image. Dependency audit reports zero known vulnerabilities at implementation time.

Browser review covers desktop and phone layout, overflow, keyboard workflow selection, mobile menu focus/Escape, FAQs, and enquiry validation/copy fallback. No external enquiry was sent. Final verification notes are appended after the last refinement.

## Next content/integration step

1. Add the supplied recording when available, with an accurate client/test label, a poster, captions/transcript, and actual demonstrated scope.
2. Connect a confirmed booking link or a real enquiry provider if direct website submissions are wanted. The current honest email route works without a provider. Verify delivery before changing any success message.
3. Extend each project overview into an evidence-backed case study when approved conversations, operational screenshots, and measured results are supplied.
4. Review the preview, then deploy separately and verify the public domain.

Reference design: [Calendly](https://calendly.com/). Framework migration reference: [official Next.js 16 guide](https://nextjs.org/docs/app/guides/upgrading/version-16). The final components and CSS are original to this repository.

## Final verification

- Final lint: zero warnings/errors. TypeScript and production build passed using the bundled Node 24.19.0 runtime.
- Production server checked at `http://localhost:3011`: all 10 content pages, 6 rendered image requests, five representative redirect mappings, four retired/unknown paths, and the generated Open Graph image passed.
- Full dependency audit and production-only audit: zero reported vulnerabilities.
- Browser checks: desktop 1440px, tablet 768px, phones 390px/360px. No horizontal content overflow observed. Supplied portrait and all available project images render; screenshots use contain framing so text is not cropped.
- Workflow pointer/arrow-key selection, mobile menu focus and Escape, FAQ expansion, consultation navigation, required-field validation, and selectable enquiry-brief fallback verified. Clipboard auto-copy was unavailable in the test browser; the tested manual-copy fallback remains usable. No email was sent and external email-app handoff was not verified.
- Reduced-motion emulation confirmed native scrolling switches to `auto` and transitions shorten. Emulation was reset after testing.
- No browser warning/error logs observed in the reviewed production preview. Screenshots: `previews/desktop.png`, `previews/mobile.png`.
- Production domain remains untouched. The local preview is a production build, not a public deployment.
