<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Portfolio conventions

- This is Sandesh Apparala’s AI agent portfolio. Real estate first, other industries welcome.
- Approved positioning and editorial evidence requirements are in `docs/portfolio-positioning/`.
- Edit typed content in `src/content/` and page copy in `src/app/`. Do not add a CMS.
- Keep the light design, native scrolling, accessible controls, and reduced-motion support.
- Workflow conversations are illustrative sample data. Never present them as client evidence.
- Client project summaries are owner-reported delivery claims. Do not invent results, testimonials, latency, or capabilities for a particular client.
- The contact form prepares an email draft. Do not claim submission or booking success without a real delivery/booking integration.
- Use Node 24 LTS, npm, and the single package lock. Keep dependencies scoped to actual imports.
- Run `npm run check`, `npm run build`, and `node scripts/verify-site.mjs http://localhost:PORT`. Verify affected desktop/mobile interactions.
- A successful local build is not a production deployment. Launch requires a separate deployment step.
