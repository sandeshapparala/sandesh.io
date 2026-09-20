# WhatsApp response latency

The latest inspected completed inbound job took 16.104 seconds from its recorded creation to completion: 8.739 seconds before send reservation and 7.365 seconds after reservation. Other recent examples took 13.284, 14.317, 16.851 and 23.015 seconds. These are backend timestamps, not handset delivery measurements. All these jobs completed in one attempt.

The deployed agent used Vercel `iad1` (US East); Firestore is in `asia-south1` (Mumbai). The agent now specifies `bom1` to put execution near its database. Independent eligibility reads run together, and send reservation/finalization batch transaction reads without removing the takeover, opt-out, idempotency or global-mode checks.

The configured model is `gemini-3-flash-preview`. It previously used default thinking with temperature 0.2. Four sequential synthetic real-estate service enquiries measured 5.107 / 5.278 seconds with the previous configuration and 2.156 / 2.213 seconds with minimal thinking and temperature 1. This is a small local model-only sample, not a production latency guarantee. All four returned valid JSON. No WhatsApp messages were sent for this benchmark.

Sources: [Gemini thinking controls](https://ai.google.dev/gemini-api/docs/gemini-3), [Vercel region configuration](https://vercel.com/docs/project-configuration/vercel-json), [Vercel regions](https://vercel.com/docs/regions).

Completed jobs now retain `timings` for claim, eligibility, history, generation, reservation, provider acceptance and worker elapsed time. Inspect new replies to distinguish remaining Gemini delays from Dualhook delivery and database time. Timings contain no message content or credentials. Existing job timestamps are unchanged; no historical jobs are replayed.

Explicit demo requests and acceptance of the previous demo offer bypass generation and return the approved WhatsApp number, +91 83318 37887, with https://wa.me/918331837887. More complex demo questions still use the model. Pricing requests retain their owner handoff. Relevant AI-agent explanations can end with “Would you like to try the demo?” without repeating the offer on every message.
