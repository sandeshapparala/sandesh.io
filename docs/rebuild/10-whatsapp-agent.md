# Sandesh WhatsApp agent — implementation and launch

The portfolio remains at the repository root. The worker is a separate Next.js app under `apps/agent`; both use `packages/agent-core`. There is one npm lockfile. No TD Sringeri source, credentials, knowledge or deployment was modified.

## Product scope

- A private `/admin` workspace with WhatsApp conversations and website enquiries.
- Firebase authentication, verified email allowlist, eight-hour HTTP-only sessions, server-side authorization and same-origin mutation checks.
- Allowed owner emails: `hello@sandesh.io`, `sandeshapparala@gmail.com`.
- WhatsApp-style conversation list, message history, delivery states, ad referral context, service/business/timeline summary, quick replies and manual takeover.
- AI-first service knowledge, with website, ecommerce, integrations and ongoing management enquiries supported.
- No approved pricing in the knowledge. Commercial questions take a deterministic handoff path; generated output is also checked for monetary claims and false booking confirmations. This is defense in depth, not a mathematical guarantee about arbitrary model output; test the configured model before launch.
- Owner pause/resume, global off/internal/public mode, opt-out suppression, a 24-hour free-form reply window and a 60-AI-reply-per-contact daily limit.
- Uploaded audio/images/documents trigger human review. No transcription, media downloads, calendar booking, autonomous follow-ups or bulk campaigns in this version.
- The quick replies are local text snippets. They are **not approved Meta templates**. Replies outside the customer-service window are blocked. Add reviewed Meta templates in a separate scope if needed.

## Receive and reply

1. Dualhook calls `https://agent.sandesh.io/api/webhooks/whatsapp/<secret>` using a random secret of at least 32 characters. The callback also checks the exact phone-number ID and WABA ID. Keep its URL out of analytics, screenshots and public docs; rotate it if exposed.
2. A transaction stores the event, conversation and incoming message. Deterministic IDs make redelivery safe. Ad headline, source ID, click ID and available referral details are retained as untrusted attribution data.
3. After all events are persisted, the webhook registers Next.js `after()` processing and returns success immediately. Persistence failures return 503. Replies do not wait for cron. Configure and verify Dualhook's redelivery behavior before launch.
4. Webhooks process locally inside the agent deployment. Manual admin replies are persisted by the portfolio and dispatched to `/api/jobs/reply`, protected by a shared `AGENT_DISPATCH_SECRET`. This endpoint returns 202 after scheduling post-response work; acceptance is not delivery confirmation.
5. The worker takes a conversation lease, reads recent messages, generates an answer, and rechecks mode, pause, opt-out, revision and reply window before reserving a send.
6. A successful provider response is stored with its message ID. Sent/delivered/read callbacks update status without regression. A timeout or interrupted send moves to review rather than blindly resending.

A request already sent to the provider cannot be recalled by the pause button. Newer inbound messages supersede unsent older AI work. A superseded manual draft is shown as skipped; review and explicitly resend if appropriate. Resuming AI applies to new messages, not historical skipped jobs.

Conversation and history cursors use document snapshots, including ties in message timestamps. Search covers loaded conversations. Website enquiries currently show the latest 50 records. Queued/sending/review states are visible on outbound drafts.

## Two Vercel projects

| Setting | Portfolio | Agent |
|---|---|---|
| Root directory | repository root | `apps/agent` |
| Framework | Next.js | Next.js |
| Domain | `sandesh.io` | `agent.sandesh.io` |
| Build | `npm run build` | `npm run build` in app root |
| Runtime | Node 24 | Node 24 |
| Shared code | `packages/agent-core` | `packages/agent-core` |

Enable inclusion of source files outside the agent Root Directory. Install through the root npm workspace lockfile; do not create an app-specific lockfile. The root project must not run `build:agent` as its build command. Each project can deploy and roll back independently, although shared package changes require both to be checked.

Copy variable **names** from root `.env.example` and `apps/agent/.env.example`. Use separate server identities where possible; never copy the TD client's credentials. The website needs Firebase Auth/Firestore and the private agent dispatch connection. Only the agent app needs Dualhook and Gemini keys.

## External configuration still required

1. Enable Firebase Authentication and Email/Password for `sandesh-io`. Provision the two owner accounts and complete email verification. This implementation does not send invitation or verification emails automatically. The owner has since reported enabling Authentication; verified-account sign-in still needs an end-to-end check.
2. Supply this business's Dualhook API key, phone-number ID, WABA ID, compatible Graph API version, verify token and a new callback secret through environment settings.
3. Supply a Gemini API key and explicitly chosen available model in `GEMINI_MODEL`. The service uses the Gemini REST API pattern from the reference with keys in headers and bounded requests. No TD API keys were reused.
4. Generate a random `AGENT_DISPATCH_SECRET` of at least 32 characters and set the same value in both Vercel projects. Keep it separate from the Dualhook callback secret.
5. Set `AGENT_WORKER_URL=https://agent.sandesh.io/api/jobs/reply` in the portfolio project. No Cloud Tasks API, queue, invoker account, Cloud Functions deployment or recovery cron is required.
6. Give server identities only the necessary Firestore and Firebase Auth permissions. Existing deny-all client Firestore rules stay in force; browsers only use protected server routes. This implementation supports the existing server-only service JSON or Application Default Credentials. Vercel OIDC federation is not configured by this change.
7. Ensure the production worker and callback can be reached by their providers; platform deployment protection must not block provider delivery. Application-level callback and shared-secret checks remain mandatory.
8. Start with mode **off**, configure explicit test numbers in both projects, then use **internal** mode. Verify inbound, reply, retry, pause, opt-out, handoff and delivery callbacks with an authorized test number before enabling public mode or ads.

Set credentials privately in local/Vercel environment settings. No secrets belong in chat, code, or a public setup document.

## Operations

- Handoffs appear in the inbox; there is no separate push/email/WhatsApp notification to the owner yet.
- Monitor Vercel processing errors and `wa_jobs` records in `review` or long-lived `pending`. There is deliberately no scheduled webhook recovery, matching the TD reference (its cron routes only process reminders/follow-ups). Failed post-response processing stays stored but will not automatically resume without redelivery or operator action. Manual dispatch retries reuse the same request ID while the page remains open.
- Post-response processing has a bounded runtime (routes allow 300 seconds). A batch runs at most four jobs concurrently, waiting for conversation leases inside that invocation. Infrastructure interruption can still leave work unfinished; Firestore persistence is not a durable execution queue.
- The durable job ledger is in `wa_jobs`; conversations and their messages are in `wa_conversations`; global mode is `wa_settings/agent`. Existing website leads remain in `enquiries`.
- Set retention and monitoring policies before substantial ad traffic. The code does not delete conversation history automatically.
- Outbound acceptance and the database cannot form one transaction. If acknowledgement is uncertain, inspect the provider before any manual resend. Exactly-once delivery is not claimed.

## Verification

Commands from repository root (Node 24):

```text
npm run check
npm run check:agent
npm run test:agent
npm run build
npm run build:agent
node scripts/verify-site.mjs http://localhost:3013
node scripts/test-agent-routes.mjs http://localhost:3013 http://localhost:3012
```

Tests use a Firestore transaction contract double and mocked model/transport. They cover deduplication, leases, same-second messages, handoff during generation, global pause, opt-out, output policy, ad metadata and uncertain delivery. They do not prove real Firebase Auth, Dualhook, Gemini or cross-deployment integration. Complete signed-in inbox verification after Firebase Auth is enabled. Local builds are not production deployments.

Recorded local results on 19 September 2026: lint/type checks passed, both production builds passed, 20 agent tests and four existing contact tests passed. HTTP checks rejected unauthenticated/forged admin access, cross-origin changes, unauthenticated worker calls and invalid Dualhook callback secrets. The public-site verifier passed 14 pages, 16 images and 31 internal links/anchors. The admin sign-in page was inspected at desktop and 390px mobile width, including required-field validation. Signed-in inbox interactions remain unverified; the owner has subsequently reported enabling Firebase Authentication. No live messages were sent and no deployment was made.

After removing Cloud Tasks on 19 September 2026: root lint/type checks, agent type checks, both production builds and all 23 agent tests passed. Authentication-boundary HTTP checks and the public-site verifier (14 pages, 16 images, 31 internal links/anchors) also passed. New tests cover shared-secret dispatch, HTTPS enforcement, explicit acceptance, batch deduplication, busy conversation leases and isolated processing failures. No live WhatsApp sends or production deployments were performed.

Official references: [Vercel monorepos](https://vercel.com/docs/monorepos), [Next.js after](https://nextjs.org/docs/app/api-reference/functions/after), [Gemini REST API](https://ai.google.dev/api/generate-content).
