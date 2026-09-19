# Production readiness review

Reviewed 19 September 2026. Local production build: http://localhost:3011. This review does not constitute a deployment or a live sandesh.io check.

## Decision

The public portfolio passes the local rendering and interaction checks below. The main unfinished product feature is reliable enquiry collection: the current contact form creates an email draft; it does not store enquiries. Build the contact inbox before launching the site as a lead-collection system. Approved testimonials and recordings can be added separately; empty testimonial templates are now hidden.

## Changes made during this review

- Enforced light-only rendering, including when the visitor's operating system prefers dark mode. Removed the theme switcher, saved-preference initialization, and unused dark-theme styles.
- Hid the unfilled testimonial template. No invented customer quote is shown.
- Changed the homepage's “Book a consultation” action to “Discuss your project,” matching its actual contact-page destination.
- Expanded contact copy and service choices to cover business websites and ecommerce as well as AI work. Made the existing website/workflow field optional.
- Rejected whitespace-only required fields. Editing a brief now clears the previous copy status and prepared text.
- Extended the site verifier to check internal link destinations and fragments, light-only markup, the supplied demo number, and missing service routes.

## Verification results

`npm run check` and `npm run build` pass under Node 24.19.0. `node scripts/verify-site.mjs http://localhost:3011` passes: 14 public pages, 8 image URLs, 31 internal links/anchors, redirects, retired/missing routes, and the generated social image. The production dependency audit reports zero known vulnerabilities at review time; this is not a security penetration test.

Each route below was rendered in Chrome at desktop 1366×900 and mobile 360×800. All had one H1, light theme, no horizontal document overflow, no broken loaded images, no missing image alt attributes, and no duplicate element IDs. No console warnings or errors were captured during these route checks. These checks are not a full screen-reader or WCAG audit.

| Page | Desktop | Mobile |
| --- | --- | --- |
| `/` | Pass | Pass |
| `/services` | Pass | Pass |
| `/services/whatsapp-ai-agents` | Pass | Pass |
| `/services/ai-workflow-integration` | Pass | Pass |
| `/services/website-development` | Pass | Pass |
| `/services/ecommerce-development` | Pass | Pass |
| `/services/agent-management` | Pass | Pass |
| `/work` | Pass | Pass |
| `/work/yutha-constructions` | Pass | Pass |
| `/work/sharada-constructions` | Pass | Pass |
| `/work/tungabhadra-developers` | Pass | Pass |
| `/about` | Pass | Pass |
| `/contact` | Pass | Pass |
| `/privacy` | Pass | Pass |

Interaction checks: mobile navigation opens, Escape closes it and restores focus; work filters return the correct 3 AI, 5 website and 2 ecommerce entries; workflow tabs support keyboard navigation and mobile click selection; desktop workflow pins during native scrolling; process cards expand by click/hover; FAQ disclosures open; reduced-motion mode removes the pinned scroll behavior; OS dark preference leaves the site light. Contact validation blocks empty and whitespace-only required values, allows recovery after editing, and copies a valid brief. No email was sent. The email-app launch and clipboard-denied fallback were reviewed in code, not tested across external email clients or permission-denied browsers.

Evidence: [render results](audit/render-results.json), [desktop contact sheet](audit/desktop-overview.png), [mobile contact sheet](audit/mobile-overview.png), [external destinations](audit/external-links.json). Screenshots are viewport samples, not a full-page visual regression suite.

The six linked client websites opened their matching branded homepages: Megham Chocolate, ZAX Design Studio, Epix Infra, Yutha Constructions, Design Interio and TD Sringeri. Their purchasing/contact functionality is outside this audit. RYT remains marked in progress without a live portfolio action. The WhatsApp demo link uses +91 83318 37887; no message was sent and the agent's live replies were not verified.

## Contact collection: the next build

### Visitor and owner experience

Keep the current design, but replace “Open email draft” with a genuine “Send enquiry” action once the backend exists. Ask for name, email, business/project name, service and a short brief; phone, website, budget and timeline can be optional. Show success only after the enquiry is saved, with a reference number. Preserve entered text on failure and allow retry.

Create a private `/admin/enquiries` inbox on this site, accessible only to Sandesh. Include list/detail views, search, service filters, received date, private notes, a next-follow-up date, CSV export, and statuses: New, Contacted, Qualified, Proposal sent, Won, Lost and Spam. Keep the first version focused; CRM integrations can follow.

### Recommended implementation

1. Add `POST /api/enquiries` with server-side trim, type, length and email validation, allowed service values, a honeypot, and rate limiting.
2. Add Cloudflare Turnstile, with server-side token verification. Client-only checks are insufficient; see [Turnstile validation documentation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).
3. Store enquiries in the dedicated `sandesh-io` Firebase project's Firestore database before returning success. Use a unique submission key to make browser retries safe. Store only necessary contact/project fields, timestamps, status, notes and notification state. Firestore has not been provisioned yet.
4. Protect the inbox with Firebase Authentication plus owner-only authorization on every read/update/export. Configure restrictive Firestore Security Rules for client access. If the server uses the Admin SDK, apply least-privilege IAM and server-side access checks because server SDKs bypass Security Rules. See [Firebase security documentation](https://firebase.google.com/docs/firestore/security/overview).
5. Notify the owner through Resend after persistence. Keep a retryable notification state/outbox so a mail outage cannot lose an enquiry. Use an idempotency key for mail retries; see [Resend's idempotency support](https://resend.com/changelog/idempotency-keys).
6. Update the privacy page to describe actual storage, providers, access and the agreed retention/deletion policy. Keep personal information out of application logs. Configure backup/recovery and monitor submission errors.

The Firebase project and web app have been created, but there is still no configured Firestore database, enquiry API, owner authentication, email-delivery integration or private inbox. Turnstile and Resend remain proposed providers. Local JSON files and browser storage are unsuitable substitutes for a durable production inbox.

### Setup needed

- Confirm the owner sign-in address and notification destination; the site currently displays `hello@sandesh.io`.
- Provision Firestore and enable owner authentication in the new Firebase project. Configure a verified sending domain and Turnstile site. Put server credentials in deployment environment settings, never public variables or chat messages.
- Define who can access enquiries and the retention period. Start with one owner.
- Choose and configure a production rate-limit store and notification retry mechanism.

### Acceptance checks before enabling submission

- A valid submission is stored once, appears in the authenticated inbox and produces an owner notification.
- Invalid/spam requests are rejected server-side; duplicate retries do not create duplicate leads.
- Database failure shows an honest error and preserves the form. Email failure leaves the saved lead available and retryable.
- Anonymous visitors cannot read/export/update enquiries; authentication alone does not grant arbitrary users owner access.
- Privacy text matches deployed behavior. A controlled production submission is verified after deployment.

## Assets to supply

| Priority | Asset | What to provide |
| --- | --- | --- |
| Needed to publish testimonials | Approved client feedback | Exact quote, client name, role, company, permission to publish; portrait optional. No draft or invented quote will be substituted. |
| Needed for recorded showcases | Yutha, TD Sringeri and Sharada recordings | Prefer 1080p MP4; a concise walkthrough of real replies, qualification, visit request and human handoff where supported. Remove customer phone numbers and private conversations. A 60–90 second version per agent is a useful starting point. |
| Recommended | Client logos | SVG preferred or transparent high-resolution PNG: Yutha, TD Sringeri, Sharada, Design Interio, ZAX, Epix, Megham and RYT. Confirm the correct brand spelling and permitted use. |
| Optional visual upgrade | Property/product imagery | Approved property photos/renders for real-estate case studies; Megham product/packaging shots; an approved RYT storefront preview when ready. Existing screenshots and your supplied portrait are usable. |
| Needed for stronger quantified proof | Supporting records | Date range and definition for conversation totals and response times; booking records with careful attribution; the reviewed sample and scoring method behind TD's reported 100% accuracy. Current results remain explicitly owner-reported, not independently verified. |

## Launch checklist remaining

1. Implement and verify the contact collection system above if collecting enquiries inside the site is a launch requirement.
2. Add approved testimonials and recorded demos when supplied. Until then, keep testimonials hidden and label illustrative conversations clearly.
3. Confirm the published contact address, demo phone destination, project facts and ongoing-care scope.
4. Deploy separately, then verify the real domain, HTTPS, redirects, sitemap, image delivery and a controlled contact submission. Local success does not prove production deployment.
5. Remove obsolete Sanity environment configuration from the hosting settings after confirming it is unused by that deployment. No local secret files were deleted during this review.

No deployment, remote push, real enquiry submission, email or WhatsApp message was performed in this review.
