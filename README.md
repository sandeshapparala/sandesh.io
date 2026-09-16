# Sandesh Apparala — AI agent portfolio

A light-first portfolio for custom WhatsApp AI agents, real client work, and ongoing agent management. Built with Next.js App Router, React, TypeScript, and Tailwind CSS. Content lives in this repository; there is no CMS.

## Run locally

Use Node 24 LTS and npm.

```sh
npm ci
npm run dev
```

The default address is http://localhost:3000. For an occupied port, run `node node_modules/next/dist/bin/next dev -p 3010`.

## Verify

```sh
npm run check
npm run build
node scripts/verify-site.mjs http://localhost:3010
```

The last command requires a running local dev or production server at that address. It checks routes, canonical URLs, images, redirects, retired endpoints, and the social image. Review desktop/mobile rendering and interactions after visual changes.

## Edit content

- `src/content/site.ts`: identity, contact, navigation, and site metadata.
- `src/content/home.ts`: FAQs and the clearly labelled illustrative workflow.
- `src/content/case-studies.ts`: the three delivered AI projects.
- `src/content/websites.ts`: website portfolio, links, and local imagery.
- `src/app/`: page-specific copy and route metadata.
- `src/components/`: layout, homepage, project, and contact components.
- `public/portrait/` and `public/projects/`: approved media.
- `docs/portfolio-positioning/`: positioning, offers, copy, and evidence requirements.
- `docs/rebuild/`: audit, visual direction, implementation notes, and launch gaps.

The contact form prepares an email draft or a copyable brief. It does **not** submit to a server or book a calendar slot. No environment variables are required by this build. Do not add a success message that claims delivery before a real provider has confirmed it.

The recorded agent demonstration is pending. Sample workflow conversations are illustrations, not client evidence. Publish measured results only with a clear source and approval.

## Deployment

`npm run build` produces the production build; `npm start` serves it. Keep production deployment separate from local verification. Use a preview deployment before switching the public site, then verify the domain, redirects, images, and the real enquiry destination.
