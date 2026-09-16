# Code management and migration plan

## Decision

Build a fresh application in this repository. Recreate components, styles, templates, and interaction code around the approved content and new design. Reuse factual content and verified assets deliberately, rather than copying either old interface wholesale.

The current branch is `codex/portfolio-new-build`. There is already uncommitted implementation work and an untracked content pack. Continue from this working state after preserving it; do not reset to another branch or discard those files.

Content will live in typed codebase files and be updated through Codex, as the user requested. Sanity is removed from the target runtime after any useful content and asset references have been preserved. No remote Sanity data deletion is part of the rebuild.

## Audit results

| Item | Observed state |
| --- | --- |
| Source code | 113 TS/TSX/JS-family files under `src` |
| Components | 76 component files |
| Static reachability | 52 component files and 55 source files total are not reached from the current App Router entrypoints and top-level configuration imports |
| Manifest | 53 runtime dependencies and 11 development dependencies |
| Framework in lockfile | Next.js 15.5.22, React/React DOM 19.1.0 |
| Styling in lockfile | Tailwind CSS 4.1.8 |
| TypeScript in lockfile | 5.8.3 |
| Global stylesheet | 1,076 lines |
| Homepage | 535 lines, plus separate interactive components |
| Existing source changes | Eight tracked files modified and four new portfolio component files untracked at audit time |
| Image duplication | `public/og.png`, `src/og.png`, and `src/app/og.png` have identical SHA-256 hashes; each is 655,906 bytes |

The reachability scan parsed static imports/exports and literal dynamic imports with TypeScript. It included route conventions and root configuration, including the Sanity config. It is an inventory aid, not proof that every unused manifest entry can be uninstalled immediately. Framework runtime dependencies, tools, CSS imports, and indirect dependencies need separate consideration. In particular, `react-dom` remains required even without a direct application import.

Unused source files are not necessarily shipped in a browser bundle. The problem here is accumulated maintenance, installation, and type-checking surface; a byte-level bundle saving has not been measured.

## Overlapping systems

1. **Older portfolio:** top-level components such as `Header.tsx`, `footer.tsx`, `BookingSection.tsx`, `Sections/`, and decorative components.
2. **Sanity portfolio:** active `/projects` and `/projects/[slug]` routes, project hooks, Portable Text rendering, schema files, and `/studio`.
3. **Newer AI-agent draft:** `components/portfolio/`, typed `content/`, current `/work` and `/services` routes, new homepage effects, and dark/light styling.
4. **Generic component collection:** charts, tables, calendars, globe renderers, drawers, sidebars, text effects, scrolling effects, and providers, many without route consumers.

The target has one page system, one content source, one style system, and a small set of explicitly needed interactive components.

## Source disposition

| Existing area | Target treatment |
| --- | --- |
| `docs/portfolio-positioning/` | Preserve as editorial input and decision history |
| `src/content/` | Replace its shape with clear content types; transfer only approved, source-backed copy |
| `src/components/portfolio/` | Rebuild for the new visual direction; preserve old work in the checkpoint, not as imported components |
| Top-level legacy components and `src/components/Sections/` | Retire from the new source tree |
| `src/components/magicui/` | Retire, including the currently used grid background; no effect collection carried forward |
| `src/components/ui/` | Recreate only the primitives the new UI actually uses |
| `src/components/providers/` | Retire old animation and smooth-scroll providers |
| Theme provider and toggle | Remove for a deliberate light-only initial site |
| `src/hooks/useProjects.ts`, `src/lib/queries.ts`, Portable Text renderer | Replace with typed local content lookups |
| `src/sanity/`, root Sanity configs, `/studio` | Remove from application after content/reference preservation |
| `src/app/globals.css`, `tailwind.config.js` | Replace with one CSS-first token system and small purposeful styles |
| `src/app/layout.tsx`, page templates, metadata and OG rendering | Rebuild consistently with the new site identity |
| `public/` | Rebuild an asset inventory; retain approved brand/client assets; retire starter icons and duplicate OG assets |
| `.idea/` | Stop tracking editor-specific project metadata in the rebuilt repository; do not erase personal settings unnecessarily |
| `.env.local` | Preserve locally, never include values in archives committed to Git or public documentation |
| `.next/`, `dist/`, `.sanity/`, `tsconfig.tsbuildinfo`, `node_modules/` | Generated artifacts; recreate as needed once source and dependency decisions are complete |

Tailwind is already v4, while a v3-style `tailwind.config.js` remains. There is no `@config` reference in the reviewed stylesheet. Tailwind's [upgrade guide](https://tailwindcss.com/docs/upgrade-guide#using-a-javascript-config-file) says JS configuration is not automatically detected in v4. Use one explicit CSS configuration in the new site.

An unused globe component references a missing `@/data/globe.json` and has `@ts-nocheck` plus lint suppression. The passing TypeScript baseline should not be mistaken for validation of that component. Remove it with the unused 3D feature rather than repairing it for this brief.

## Dependency decisions

Keep the framework and language choices, but select compatible supported versions at scaffolding time and pin the resulting lockfile. The audited versions above describe the current project, not a recommendation to freeze the new project indefinitely on them.

| Group | Packages | Decision |
| --- | --- | --- |
| Core | `next`, `react`, `react-dom` | Keep in fresh manifest; verify compatible supported versions together |
| Build/types | `typescript`, `@types/node`, `@types/react`, `@types/react-dom`, `tailwindcss`, `@tailwindcss/postcss` | Keep necessary build tooling; align versions |
| Lint | `eslint`, `eslint-config-next`, `@eslint/eslintrc` | Use modern flat ESLint configuration and direct ESLint CLI; retain compatibility helper only if actually required |
| Small styling helpers | `clsx`, `tailwind-merge`, `class-variance-authority` | Keep if the fresh primitives use them |
| Icons | `lucide-react` | One icon family; import only used icons |
| Other icon libraries | `@tabler/icons-react`, `@radix-ui/react-icons` | Remove |
| Radix primitives | Existing `@radix-ui/react-*` dependencies | Fresh selection only: dialog for mobile menu/video if needed, tabs for workflow preview, slot only if button composition uses it; remove the unused avatar/checkbox/select/separator/toggle/etc. packages |
| Analytics | `@vercel/analytics` | Retain only with verified deployment/account configuration and useful lead-funnel events |
| Validation | `zod` | Currently has no direct import; keep in the target only for the new server-validated enquiry endpoint |
| Motion | `motion`, `framer-motion` | CSS first; if the workflow preview needs an animation library, use only `motion` with small client boundaries |
| GSAP | `gsap`, `@gsap/react` | Remove; the planned design does not need complex pinned timelines |
| Smooth scrolling | `lenis`, `@studio-freight/lenis` | Remove both; use native page scrolling |
| 3D | `three`, `three-globe`, `@react-three/fiber`, `@react-three/drei`, `cobe`, `@types/three` | Remove |
| CMS | `sanity`, `next-sanity`, `@sanity/image-url`, `@sanity/vision` | Remove after local content migration |
| Drag and drop | `@dnd-kit/core`, `@dnd-kit/modifiers`, `@dnd-kit/sortable`, `@dnd-kit/utilities` | Remove; no direct imports found |
| Tables/charts | `@tanstack/react-table`, `recharts` | Remove; no actual dashboard product is being built here |
| Calendar | `react-day-picker`, `date-fns` | Remove; a consultation enquiry is not an in-site scheduling product |
| Miscellaneous UI | `@uidotdev/usehooks`, `react-use-measure`, `vaul`, `sonner`, `styled-components`, `next-themes` | Remove under the proposed design and form architecture |
| UI CLI | `shadcn` | Not a deployed runtime requirement; use the CLI only when generating a needed primitive |
| Animation CSS | `tw-animate-css` | Keep only if fresh generated primitives use it; otherwise remove |
| Existing overrides | `postcss`, `sharp`, `tar` | Review why each exists against the new dependency tree; keep needed compatibility/security constraints, retire only when no longer needed |

`@portabletext/react` is imported directly by the old renderer but is not a direct dependency in `package.json`. Removing the renderer and CMS resolves that accidental reliance on a transitive installation.

A small production dependency set should follow from these decisions; do not promise a fixed package-count or bundle reduction before the new manifest and build are measured. Generate the new lockfile from the selected manifest rather than carrying the old dependency tree blindly. Use npm consistently with the existing lockfile convention.

## Routes and integrations: migrate deliberately

| Existing surface | Plan |
| --- | --- |
| `/`, `/about`, `/contact`, `/services`, `/services/[slug]`, `/work`, `/work/[slug]` | Rebuild at these useful route families with approved content |
| `/projects` | Permanent redirect to `/work` after replacement collection is ready |
| `/projects/[slug]` | Inventory actual published slugs and map each to its corresponding work page; do not redirect every project blindly to the homepage |
| `/testimonial` | Already redirects to `/work`; preserve the useful redirect |
| `/studio` | Retire from the new public app; preserve remote CMS data and any external authoring access separately |
| `/api/booking` | Existing handler writes a Sanity booking document, not a confirmed calendar appointment; replace with a properly named enquiry endpoint |
| `/api/testimonials` | Legacy public submission endpoint; retire with its abandoned form unless explicitly needed later |
| `/api/og/[kind]` | Rebuild consistent share previews, or replace with supported metadata image routes and update references |
| Sitemap/robots/manifest | Regenerate from actual new routes and content dates; remove CMS/API leftovers |
| Privacy/terms references | Inventory existing public destinations and preserve applicable content/links during launch |

The old booking form component is unreachable, but its API route is independently reachable. Likewise, hiding `/studio` in navigation or `robots.txt` does not remove the application route. Handle route retirement explicitly.

### New enquiry path

Use the fields already specified in Asset 5. Validate server-side, constrain payloads, apply appropriate spam/rate controls, and send/store the enquiry through one configured server-side destination. Choose that provider when its account and delivery path are available; do not add several speculative SDKs now.

A browser success state must follow confirmed delivery/persistence, not merely a button click. Do not claim a meeting is booked unless an actual calendar booking succeeds. Until a submission destination is configured, an honest email contact action is the fallback. A future scheduling link can be added without bundling a calendar UI.

Measure consultation clicks, successful enquiries, demo plays, and case-study engagement without sending raw enquiry contents into analytics.

## Target structure

```text
src/
  app/
    layout.tsx
    globals.css
    page.tsx
    about/page.tsx
    contact/page.tsx
    services/page.tsx
    services/[slug]/page.tsx
    work/page.tsx
    work/[slug]/page.tsx
    api/enquiries/route.ts
    sitemap.ts
    robots.ts
    not-found.tsx
  components/
    layout/       # header, mobile navigation, footer, container
    ui/           # only used buttons, fields, dialogs, tabs
    home/         # each homepage section has a focused job
    work/         # case study summaries, evidence and project media
    media/        # recorded demo and image presentation
  content/
    site.ts
    home.ts
    services.ts
    case-studies.ts
    websites.ts
    navigation.ts
  lib/
    content.ts    # types and helpers
    seo.ts
    validation.ts
    utils.ts
  server/
    enquiries.ts # provider adapter, server-only
public/
  brand/
  portrait/
  clients/
  projects/
  demo/           # lightweight poster; large recording hosted suitably
docs/
  portfolio-positioning/
  rebuild/
```

Use Server Components for content and layout. Client components are limited to the mobile menu, workflow tabs, video controls/dialog, enquiry form, and optional analytics. No site-wide motion/scroll/theme provider is needed.

Typed content should distinguish `client-project`, `demo`, and `website`; a proof field should distinguish reported, measured, and approved evidence. Render only approved facts in public templates. Keep private client exports and internal evidence outside the public repository/assets.

## Implementation sequence

1. **Preserve the working state.** Create a scoped local checkpoint of tracked changes, relevant untracked components, and content documents. Exclude credentials, caches, generated outputs, and client-private records. Confirm it can recover the current work before source replacement.
2. **Inventory content and URLs.** Preserve useful public project descriptions, actual slugs, testimonials, approved media, and Sanity asset references. Do not pull private booking/contact records into frontend content.
3. **Create the fresh foundation.** Replace the dependency manifest/configuration and application structure, retaining repository/deployment identity. No `src/legacy`, old component import bridge, or old global CSS layer inside the new build.
4. **Build the design system and homepage.** New tokens, primitives, layout, hero, portrait treatment, demo position, proof, management offer, selected websites, and contact CTA.
5. **Build supporting routes and enquiry handling.** Transfer approved copy into typed content, implement case-study/service templates, and connect the confirmed enquiry destination.
6. **Complete retirement.** Remove replaced source files, unused dependencies, obsolete configs, stale asset references, and generated outputs scoped to this workspace. Review the final import graph and route table.
7. **Verify and preview.** Typecheck, lint without new warnings, production build, mobile/desktop interactions, keyboard/focus, reduced motion, enquiry success/failure, redirects, metadata, and broken links. Review dependency audit findings and production bundle composition.
8. **Launch separately.** Preview review precedes production deployment. Verify the deployed site, form destination, redirects, and metadata after cutover. Keep the prior deployment/checkpoint available for rollback.

Each milestone should be a coherent commit: checkpoint, foundation, homepage, supporting pages, integration/redirects, and release verification. Avoid committing a long-lived half-old/half-new app or deleting live routes before their replacements/mappings exist.

## Checks performed for this plan

- TypeScript: `node node_modules/typescript/bin/tsc --noEmit --incremental false` — passed.
- Lint: `npm run lint` — passed with warnings in legacy files and a deprecation notice for `next lint`.
- Static import graph and dependency classification — completed, with limitations above.
- Asset hashes — confirmed the three identical OG images.
- Production build, bundle measurement, live Sanity reads/writes, enquiry submission, and deployment — not performed.

For the new scripts, use `eslint .`, an explicit `typecheck` script, and `next build`. Add tests for consequential logic such as enquiry validation/delivery results and redirect/content mappings; do not create implementation-mirroring tests for simple decorative components.
