# Calendly reference review and portfolio UI direction

Reference: [Calendly homepage](https://calendly.com/), inspected live on 16 September 2026. This is the current meeting-management homepage, including its newer AI assistant and notetaker sections. The review concerns its visual and interaction design; product/customer performance claims were not audited.

## Inspection completed

- Initial browser viewport, approximately tablet/laptop width, showing collapsed navigation.
- Desktop breakpoint at 1440 CSS pixels and mobile breakpoint at 390 CSS pixels.
- Hero, product showcase, process cards, feature panels, customer stories, integrations, and closing promotional section.
- Product navigation opened by pointer hover, with a visible two-column dropdown.
- Product tabs switched manually; copy and product illustration changed together.
- Process step selected manually; the active panel expanded and exposed additional detail.
- Feature accordion selected manually; supporting visual changed to match.
- Customer-story pagination selected manually; image, quotation, and headline changed together.
- Integration logo hovered; no obvious transform on the link itself was measured, so no dramatic card-hover effect is inferred.
- Mobile menu opened/closed; mobile content was scrolled and its stacked process-card layout inspected.
- The temporary viewport override was reset after inspection. No signup, booking, account changes, or form submission was performed.

## What makes the reference feel elegant

| Observed feature | Why it works | Adaptation for Sandesh |
| --- | --- | --- |
| Pale background and restrained dark navy typography | Content stays easy to read and the page feels spacious | Light-first site with navy text and a controlled blue accent |
| Large centered hero with a short explanation | Creates one clear opening message | AI Agent Engineer identity, the approved outcome headline, consultation and demo actions |
| Broad rounded containers and soft edges | Makes detailed product material approachable | Rounded demo stage, proof cards, and portrait panel |
| Strong typography contrast | Large sans headings establish clarity; serif feature headings add character | Manrope for primary copy/UI, restrained Source Serif 4 accents in the personal or management story |
| Sticky rounded navigation after scrolling | Keeps the main action available with little clutter | Compact identity, four useful links, and one consultation action |
| Product demonstrations inside tinted panels | Shows the product rather than describing every feature in prose | Recorded WhatsApp workflow and clearly labelled illustrative workflow states |
| Alternating text/visual feature sections | Creates variety while preserving a predictable structure | One agent workflow section and one management section; avoid repeating many similar panels |
| Customer imagery beside attributable proof | Connects claims to people and organisations | Client-approved logos, real project evidence, and genuine testimonials when supplied |
| Mobile reflow | Content remains readable without desktop columns | Single-column proof, stacked CTAs, normal scrolling, touch-friendly controls |

Rendered desktop typography sampled from the page: hero uses Calendly Sans at 72px/79.2px line height, weight 500, -2px tracking, with text colour `rgb(7, 26, 49)`. A feature heading uses Wulkan Text at 48px/52.8px, weight 500. A primary header action has 16px corner radius and 150ms colour transitions. These are observations, not values that must be copied.

The largest product stage became an expanded, near-viewport presentation during scrolling. Several sections progressed between observations as well as responding to manual selection. The exact timing/scroll implementation was not profiled; do not attribute it to a particular library or reproduce scroll locking based on appearance alone.

## Recommended visual direction

**A clean, personal engineering website with the clarity and softness of a modern software product page.** The distinctive element is a visible path from WhatsApp enquiry to a useful team action, supported by real client work and Sandesh's face.

Preserve the previously agreed positioning and content hierarchy. Adapt the surface design and pacing, not Calendly's product taxonomy, brand assets, signup flow, or sales claims.

### Proposed palette

These are original proposal tokens, not extracted Calendly tokens.

| Role | Value | Use |
| --- | --- | --- |
| Page | `#FAFBFE` | Main background |
| Surface | `#FFFFFF` | Cards, menus, fields |
| Soft panel | `#F1F5FB` | Section contrast and media surrounds |
| Primary ink | `#10243A` | Headings and primary CTA fill |
| Muted ink | `#526277` | Supporting copy |
| Accent | `#2263D6` | Links, selection, focus, small highlights |
| Border | `#DCE5EF` | Quiet surface boundaries; interactive boundaries need sufficient contrast |

Use a subtle blue-to-teal light gradient only behind the signature demo stage if it helps separate the media. Keep text on a plain, readable surface. Avoid turning every section into a gradient card.

### Typography and spacing

- **Main family:** Manrope, self-hosted through `next/font`, for the hero, body, navigation, and controls. Use weight and scale deliberately.
- **Editorial accent:** Source Serif 4 in the personal introduction or ongoing-management heading only. This is an initial proposal to test in the first design pass, not a requirement to use serif everywhere.
- **Hero:** approximately 64–72px on wide desktop, 38–44px on phone, with balanced lines and modest negative tracking.
- **Section headings:** approximately 40–48px desktop and 30–34px phone.
- **Body:** 18px where space allows; 16px for compact details; comfortable line height and a limited reading width.
- **Content width:** approximately 1200px, with wider media panels where useful.
- **Page gutters:** 20–24px on phone; 32–48px on desktop.
- **Section spacing:** a consistent 64px mobile / 96–112px desktop rhythm, adjusted only where the content relationship calls for it.
- **Corners:** 12px controls, 24px cards, 32px major panels. Nested media uses smaller corners than its container.
- **Depth:** light contact and ambient shadows on interactive surfaces; quiet borders on ordinary content.

Load only the font roles and weights actually used. No proprietary Calendly font files, illustrations, photos, icons, or source components are copied.

## Homepage translation

Use the copy in [Asset 5](../portfolio-positioning/05-homepage-copy.md). Treat the diagram below as content arrangement, not final dimensions.

```text
Sandesh Apparala      AI Agents  Case Studies  Work  About    Book a consultation

               [real portrait thumbnail + AI Agent Engineer]
          AI agents that turn enquiries into
                 qualified sales conversations.
                Short, specific supporting copy
             [Book a consultation] [Watch the demo]

      Yutha Constructions · Sharada Constructions · Tungabhadra Developers

       ┌─────────────────────────────────────────────────────────┐
       │               RECORDED AGENT DEMONSTRATION              │
       │  Real recording / truthful label / clear playback       │
       └─────────────────────────────────────────────────────────┘

      REAL CLIENT WORK        Yutha       Sharada       Sringeri

      Answer · Qualify · Coordinate · Handoff
      Focused explanation          Conversation + resulting action

      Build, launch, keep improving
      Clear implementation and monthly-management explanation

      [real portrait]         I'm Sandesh. I build the agent
                              and the software around it.

      Selected websites      Megham      ZAX      Design Interio
                             [View all five projects]

      Practical FAQs          Consultation invitation + contact route

      Compact footer with contact, social, and applicable legal links
```

The client names belong near the opening because this is a specialist service sold on relevant experience. A strong proof card can be promoted earlier if its evidence is better than the demo's available material.

### Hero and personal identity

Keep the opening calm. Use a real portrait thumbnail beside Sandesh's name/title, then a larger portrait later. The existing About draft uses an initials-based visual; it does not meet the goal of establishing Sandesh's face. Source a user-approved real portrait before final visual delivery.

The first screen should communicate the identity, flagship offer, and next action. Do not crowd it with a technology logo wall, multiple floating widgets, or unsupported metric counters.

### Signature workflow presentation

Use one well-executed presentation that explains **answer → qualify → coordinate → handoff**. A desktop preview may show a conversation beside the relevant lead/action record, with selectable steps. For mobile, stack the explanation and evidence or use a simple accessible tab layout.

Use the user-supplied recording as the evidence anchor. An illustrative UI can explain how the process works, but must be labelled as illustrative and must not impersonate live client data or present invented business results. Avoid duplicating the same demonstration in both the hero and every feature section.

The video starts on user action, has a lightweight poster and captions/transcript, and reserves its dimensions. Do not preload a large recording as a hero background. If it is not available yet, the case-study path remains functional and the demo section stays omitted rather than showing a fake play button.

### Client and website work

Show three AI case-study cards directly so visitors can see the breadth of client work without operating a carousel. Use real screenshots or approved imagery with concise scope text. Metrics appear only when evidence is approved.

The website section is smaller and lower on the page. Give it consistent screenshot framing, actual client names, and direct detail/live-site links. It supports engineering credibility without competing with the AI service introduction.

## Interaction specification

| Element | Proposed behaviour |
| --- | --- |
| Navigation | Compact sticky header; a subtle border/shadow appears as needed without content jump |
| Desktop links | Colour/underline feedback; no oversized mega-menu required for four links |
| Primary button | 150–200ms colour/shadow transition; visible keyboard focus and small press feedback |
| Case-study card | At most a small lift and border/shadow emphasis; whole-card semantics remain accessible |
| Workflow tabs | Selected state changes text/evidence together; keyboard and touch work; content remains readable without animation |
| Recorded demo | User-initiated playback; inline video or one accessible dialog, not multiple overlapping panels |
| FAQs | Native disclosure or a small accessible accordion; no animation package just for expansion |
| Section entrance | Optional short opacity/translation reveal; content visible by default and under reduced motion |
| Mobile menu | Simple tap-operated panel with focus management, Escape/close support, and clear CTA |
| Scrolling | Native scrolling; no pinned multi-screen product journey in the first version |

The reference includes auto-progressing sections and a customer carousel. For Sandesh, manual workflow selection and directly visible case studies make the smaller amount of proof easier to inspect. If timed animation is added later, it needs pause/reduced-motion behaviour and must not override a visitor's selection.

## What this replaces in the current draft

- The dark default and theme switcher.
- Blueprint grid backgrounds and dense technical styling across sections.
- Pointer-tilt hero, vibration hooks, and a floating demo dock unless a later usability test demonstrates a need.
- Repeated decorative chat loops and busy motion around every section.
- The very small shared corner radius and mixed inherited component styles.
- Large quantities of generic UI components and multiple animation/scroll engines.

These are design decisions for the rebuild, not cleanup already performed.

## First design milestone

Build the new header, hero, client strip, demo frame, and one complete case-study card at phone and desktop widths. Include real approved text and available media. Verify visual rhythm, portrait treatment, contrast, keyboard states, and reduced motion before extending the system to the remaining sections.

The first implementation should look complete as a design direction without relying on the old stylesheet. This makes the next review about the actual typography, spacing, imagery, and content rather than accumulated legacy effects.
