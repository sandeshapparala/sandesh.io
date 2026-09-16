# Portfolio rebuild plan

Prepared 16 September 2026 after a source/dependency audit and live desktop/mobile inspection of [Calendly](https://calendly.com/).

1. [Code management and migration plan](./01-code-management-plan.md)
2. [Calendly reference analysis and proposed UI direction](./02-calendly-ui-direction.md)
3. [Approved content direction and five written assets](../portfolio-positioning/README.md)

**User decision:** content stays in the codebase and is updated through Codex. Sanity is not part of the target application.

**Recommendation:** rebuild the application source and visual system in the existing repository, using a deliberately small dependency list. Preserve Git history, the five content assets, useful client material, URL mappings, and deployment identity. Preserve the current uncommitted work before implementation; do not mix old components into the new application.

**Work completed in this planning pass:** source and configuration inspection, TypeScript import graph analysis, dependency classification, local image duplication check, baseline TypeScript/lint checks, and interactive Calendly review. Only planning documents were added. No application cleanup, package installation/removal, CMS migration, deployment, or production changes were performed.

**Baseline:** TypeScript passes; lint passes with warnings and a deprecated `next lint` notice. A production build and live application integration tests were not run for this planning pass.

Read the code plan for the removal/migration sequence and the UI direction for what to adapt from Calendly. The next implementation milestone is a clean foundation plus the new homepage at mobile and desktop widths.
