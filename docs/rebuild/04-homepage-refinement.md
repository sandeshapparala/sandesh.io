# Homepage refinement — 18 September 2026

## Reference and implementation

Reinspected https://calendly.com/ in Chrome, including the process-card hover state and customer-story carousel. Its desktop process cards measured 384px active and 248px collapsed in a 1200px row, with a 500ms ease-in-out width transition and 180ms shadow transition.

The portfolio uses original components and illustrations, with the same expanding proportions, restrained reveals, connected cards, and a large central story flanked by smaller previews. Story panels transition over 650ms; navigation uses arrows, dots, and clickable side previews. No automatic rotation or forced scrolling. Process stages support pointer hover, keyboard focus, and touch activation. Reduced motion removes transition delays.

The hero uses a shorter desktop composition, with an additional compact-height adjustment. At 1366×768, the sample-data label starts around 578px and the workflow surface around 610px, both above the fold.

Selected AI projects now use editorial rows and custom animated brand artwork. These visuals represent the portfolio project and are not screenshots or delivery evidence. Existing project facts remain unchanged. Website thumbnails retain their original imagery with refined hover interactions.

## Testimonial content handoff

The owner requested a template until approved client content is supplied. The homepage therefore explicitly says “Design preview · Client testimonials to be added.” Placeholder cards use no fabricated quotes, results, people, or client attributions.

Edit `src/content/testimonials.ts` to add approved `headline`, `quote`, `name`, `role`, `company`, `image`, and `imageAlt` values with a unique `id`. Put approved photos in `public/`. The component switches to real testimonials as soon as the array has entries. Set `showTestimonialTemplate` to `false` before launch if testimonials are still pending; an empty section is then omitted.

## Verification

Validated the homepage in Chrome at desktop, tablet, and phone sizes, including 1366×768, 1024×768, 768×1024, 390×844, and 360×800. Checked process hover/focus/touch selection, story navigation, responsive overflow, and reduced-motion styles. Run the repository check, production build, and HTTP verification script for the final revision before publishing.

This is a local implementation, not a production deployment.

## Follow-up refinement

Removed the hero client-name strip and restored space around the introduction. The final desktop hero bottom padding is 72px: the workflow was moved back up 32px at the owner's request after the first spacious revision. This supersedes the earlier compact-hero measurements above.

Homepage maintenance now uses a three-part review/refresh/refine composition. The personal introduction uses an editorial portrait and direct-collaboration copy. The shared footer now uses a large typographic signature and simplified navigation. Existing service-page management content remains unchanged.

Testimonial previews now activate on mouse hover as well as click, with curved white connectors between the five template cards. A short hover lock avoids repeated activation while panels move under the pointer. Touch and keyboard users retain explicit navigation controls.

The retained sequence is hero, illustrative workflow, selected AI projects, delivery process, ongoing care, personal introduction, client perspectives, secondary website work, FAQ, contact CTA, footer. Needed next: official client logos (SVG or transparent PNG), the recorded agent demos, and approved testimonial words/attribution/photos. Keep client logos in the work section so the hero remains uncluttered.

## Motion and theme pass

Restored the original About headline and paragraphs verbatim in the refined portrait layout. Added Framer Motion 13.4.0 (pinned in the existing npm lockfile) for the staggered hero entrance, subtle background movement, and testimonial expansion. Hero content is visible in the server HTML; motion is added after hydration and reduced-motion users get stationary content.

Replaced the rotating testimonial geometry after reproducing crossing cards under hover. Panels now remain in fixed source order and expand in place. All panel edges remain separated during the transition; copy fades after space opens. On phones, one story is shown with explicit controls. Removed the obsolete rotating-panel CSS. This supersedes the hover-lock implementation above.

Light remains the default. The header theme control toggles a complete dark palette and saves the preference locally. A small head script applies saved preferences before paint; switching still works if storage is unavailable. Both themes cover the homepage, shared navigation/footer, client pages, services, About, and contact fields. Reduced-motion load was verified without hydration errors after fixing differing initial transforms.

Reference for the animation implementation: https://motion.dev/docs/react-animation and https://motion.dev/docs/react-use-reduced-motion .

## Scroll-led workflow refinement

Inspected Calendly's homepage in Chrome: the product showcase expands from a 1200px stage to 24px viewport gutters, pins near the top, and selects consecutive panels as the page scrolls. Hover highlights its product tabs rather than changing selection.

Rebuilt the portfolio workflow with a native sticky stage and Framer Motion scroll progress. It expands to 24px gutters, pins at 16px, and advances Answer / Qualify / Coordinate / Handoff across a 340svh track. Tabs and next-step controls synchronize native scroll position. Visitors can skip directly to client work. Below 1200px width, below 650px height, or with reduced motion, the stage uses normal page flow and manual tabs.

One sample buyer journey now carries 3 BHK requirements, budget, decision timeline, a Saturday 11am visit request, and a payment-options handoff. Visit availability remains awaiting team confirmation. The conversation, timestamps, and team record are illustrative, with persistent sample labels and no live-chat input.

Verified desktop scrolling through all four chapters, keyboard arrows, direct tabs, skip navigation, 360/390px phone layouts, dark theme, and reduced-motion controls. Production browser logs showed no errors or warnings after the hydration fix. npm check, production build, and site verification passed. Preview: http://localhost:3011. Not deployed.
