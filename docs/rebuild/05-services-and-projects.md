# Services, portfolio dates, and demo link — 19 September 2026

## Implemented
- Services overview at /services and four offer pages: WhatsApp AI agents, AI workflow integration, website development, ecommerce development. Existing agent-management page retained.
- Navigation and footer now lead to Services. Removed the old /services redirect; legacy integration/web redirects now resolve to the appropriate new offers.
- Work page filters: All work, AI agents, Websites, Ecommerce. Website work uses actual project imagery where available; RYT Club remains an unlinked, explicitly in-progress entry.
- Project periods supplied by Sandesh: Yutha March–May 2026; TD Sringeri July 2026; Sharada August 2026; Design Interio May–July 2026; Megham June–August 2026; ZAX 2025; Epix 2024. Month-only dates interpreted as 2026.
- Homepage demo CTA and agent/work detail links use https://wa.me/918331837887 with a prepared demo enquiry. No message was sent and agent behavior was not tested.
- Owner-reported Yutha figures: 500+ conversations, 5+ villa bookings, 2 sec response time. TD: 500+ conversations in one week, 2 sec response time. These appear with owner attribution, not as independently audited measurements.
- TD's supplied 100% accuracy claim is included in the case-study context with an explicit note that the evaluation sample and definition have not been supplied. No guarantee is made. Booking figures are not framed as proof of agent-only causation.

## Source checks
Visited https://tdsringeri.com and https://designinterio.co in Chrome and captured their real homepage previews for portfolio cards. Both resolved to their www hostnames. TD spelling normalized to the working domain from the earlier user list.
Sharada remains an AI-agent project. The user did not include it in the original website portfolio list; the current sharadaconstructions.com footer credits CHIPSY IT SERVICES PVT. LTD, so that live website is not presented as Sandesh's website work.
Integration pages describe offered scope and label existing agent projects as related experience; they do not invent a standalone integration case study.

## Validation
npm run check and npm run build passed. scripts/verify-site.mjs against localhost:3011 passed 14 pages, 8 images, canonicals, redirects, retired routes, and social image. Chrome checks covered desktop/mobile service layouts, ecommerce FAQ, category filters, light/dark themes, report wording, demo href, and horizontal overflow. Production console had no errors or warnings.

## Still pending
Original client testimonials, recorded demo assets, detailed measurement windows/methodology if stronger metrics are desired, optional real enquiry/booking integration, and a separate deployment step. No production deployment or remote push performed.
