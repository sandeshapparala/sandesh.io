# Agent Vercel deployment — 19 September 2026

## Project and deployment

- Team: SANDESH io (`sandesh-io`).
- Project: `sandesh-agent`, ID `prj_VprOme2J841YbqNmcE4f56q1p3mF`.
- Root: `apps/agent`; include source files outside the root for `packages/agent-core`.
- Node: 24.x. Next.js framework; `npm run build`.
- Production alias: https://sandesh-agent.vercel.app
- Local monorepo links: ignored `.vercel/repo.json`.
- Deployment source: current local working tree via CLI, including uncommitted agent implementation. No Git push or automatic Git deployment connection was made for this new project.
- Portfolio deployment is separate and was not redeployed in this task. Its admin lives at `/admin`, not on the agent service.

## Environment configuration

These variables were added to **Production** in the agent project:

| Variable | Source |
| --- | --- |
| `FIREBASE_PROJECT_ID` | Existing local `sandesh-io` configuration |
| `FIREBASE_SERVICE_JSON_KEY` | Existing local service-account JSON, stored as sensitive |
| `WHATSAPP_TRANSPORT` | `dualhook` |
| `DUALHOOK_WEBHOOK_SECRET` | New random secret, stored as sensitive |
| `WHATSAPP_VERIFY_TOKEN` | New random token, stored as sensitive |
| `AGENT_DISPATCH_SECRET` | New random shared secret, stored as sensitive |
| `NODE_OPTIONS` | `--experimental-require-module` (no trailing newline) |

Firebase Admin 14 loads an ESM dependency through CommonJS. Vercel disables that Node feature by default; the runtime option follows [Vercel's official guidance](https://vercel.com/docs/functions/runtimes/node-js/advanced-node-configuration#experimental-node.js-require-of-es-module). The agent declares its TypeScript build dependencies directly so Vercel's workspace install includes them.

The following complete the provider configuration in the [agent environment settings](https://vercel.com/sandesh-io/sandesh-agent/settings/environment-variables). The owner-supplied WABA ID, phone-number ID and `v25.0` API version have now been added to Production and local agent settings; the API keys, model and test numbers remain to be supplied:

| Variable | Supply |
| --- | --- |
| `DUALHOOK_API_KEY` | This business's Dualhook API key |
| `WHATSAPP_PHONE_NUMBER_ID` | WhatsApp phone-number ID, not the visible phone number |
| `WHATSAPP_WABA_ID` | WhatsApp Business Account ID |
| `WHATSAPP_GRAPH_API_VERSION` | Version supported by the Dualhook account, formatted `vXX.X` |
| `GEMINI_API_KEY` | Gemini API key |
| `GEMINI_MODEL` | Available model ID for that key |
| `AGENT_TEST_NUMBERS` | For internal testing: comma-separated international phone numbers using digits only, including country code |

The first six are required to operate the agent. `AGENT_TEST_NUMBERS` is required for internal-mode testing, but optional in public mode. Do not use another client's credentials.

Direct Meta variables `WHATSAPP_APP_SECRET` and `WHATSAPP_ACCESS_TOKEN` are not required for the selected Dualhook callback. No public Firebase SDK variables, admin email allowlist, Cloud Tasks variables or cron secret are required on the agent deployment.

The portfolio's Production settings now contain the matching `AGENT_DISPATCH_SECRET`, `AGENT_WORKER_URL=https://sandesh-agent.vercel.app/api/jobs/reply`, and the Node runtime option. They take effect on its next deployment. The portfolio's other existing variables were preserved.

## Webhook connection

The callback has this format:

```text
https://sandesh-agent.vercel.app/api/webhooks/whatsapp/<DUALHOOK_WEBHOOK_SECRET>
```

The complete callback and verify token are in the private, git-ignored `.vercel/agent-connection.txt`. Generated secrets and copied credentials are also saved in ignored `apps/agent/.env.local`; the shared dispatch secret is saved in the root `.env.local`.

After adding the missing Production variables, redeploy the agent. Connect the callback in Dualhook, then test with internal mode before public mode. The deployment alone does not prove live AI replies or provider delivery.

## Custom domain propagation

`agent.sandesh.io` was added to this Vercel project. Vercel now reports ownership verified and CNAME configuration correct. This workstation's DNS resolver still returned `ENOTFOUND` at the final check, so the custom hostname was not verified end to end. Use the tested `vercel.app` callback until propagation completes. The DNS records Vercel requested during setup were:

| Type | Host | Value |
| --- | --- | --- |
| CNAME | `agent` | `820e2a7abf602861.vercel-dns-016.com` |
| TXT | `_vercel` | `vc-domain-verify=agent.sandesh.io,9eb1da231f09d8745973` |

These are Vercel's returned records at setup time, recorded for reference; its final configuration check passed. Once DNS resolves locally, the same secret callback path can use `https://agent.sandesh.io`.

## Deploy again

From the repository root:

```text
vercel deploy --prod --yes --scope sandesh-io --cwd apps/agent
```

This uses the monorepo project link and deploys the agent only. Preview deployments remain protected; application-level webhook and worker authentication remain enforced on the public production alias.

## Verified result

Production deployment `dpl_51ZSaEhy2CTYQX4NT18ESderRjWp` is READY. Live checks against `sandesh-agent.vercel.app` passed: service homepage 200, unauthorized worker 401, authenticated malformed job 400, incorrect callback secret 404, correct Dualhook verification handshake 200, and missing account configuration 503 (fails closed). A read-only Firestore check confirmed access and default agent mode off. No error logs were returned for this final deployment after these checks; earlier attempts exposed and helped fix build-dependency and runtime-module issues.

No real WhatsApp messages, model calls or signed-in admin interactions were tested. No external monitoring or log drain was added. The agent is deployed but cannot answer customers until the missing settings are supplied, the webhook is connected, and internal-mode testing is completed.
