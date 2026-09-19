# Contact enquiry backend

The contact form now posts to `/api/enquiries` and saves to Firestore's `enquiries` collection. Success is returned only after the database transaction commits. Firebase must be configured and reachable; failures return an honest error and preserve the visitor's form. No emails or WhatsApp messages are sent.

## Server configuration

- `FIREBASE_SERVICE_JSON_KEY`: complete service-account JSON. In `.env.local`, use one line surrounded by single quotes; in Vercel, paste the JSON value without shell quotes. The key stays server-only.
- `ENQUIRY_RATE_LIMIT_SECRET`: random secret, at least 32 characters. Keep identical across production instances.
- Alternatively use `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`. The supplied JSON takes precedence for credential fields.
- Use separate staging credentials/data for Vercel previews. Public Firebase web configuration alone does not authorize server writes.

Create the default Firestore database. Grant the backend service account Cloud Datastore User access for this dedicated project. The repository's Firestore rules deny all browser access; deploy them to this dedicated database before launch. Do not overwrite rules on a shared project without reviewing existing clients. The Admin SDK uses IAM, not browser security rules: [Firebase server setup](https://firebase.google.com/docs/admin/setup).

Enable Firestore TTL on `enquiryRateLimits.expiresAt` to remove expired abuse counters. Expiry is not immediate; the application only uses the current hourly bucket, regardless of TTL cleanup timing. Raw IP addresses are never saved. The route uses a protected hash of Vercel's platform address and of the supplied email, plus a global cap. Limits: 3 new submissions per email/hour, 10 per network address/hour on Vercel, 100 globally/hour. These are initial low-volume defaults. Honeypot, same-origin checking and bounded JSON input are also applied; these are baseline controls, not a CAPTCHA replacement. Add a challenge if spam warrants it.

## Stored records

Each record contains normalized contact/project fields, source `website`, status `new`, creation/update timestamps and `notification: { channel: "whatsapp", status: "not_configured" }`. A UUID submission reference is the document ID. A payload hash makes retries idempotent; the same reference with different content is rejected. Lead creation and abuse counters are committed atomically using a [Firestore transaction](https://firebase.google.com/docs/firestore/manage-data/transactions).

The browser retains the reference for retries while that page remains open, prevents repeated clicks, and keeps entered data on failure. Reloading starts a new form session. It does not store personal information in browser local storage. Copy-brief remains available as an email fallback.

No public read/list API exists. For now, the project owner can review records in the Firebase console; the private admin inbox is a separate next step. Agree the enquiry retention policy before launch. WhatsApp notifications will later consume newly saved enquiries after sender/recipient configuration; historical records must not be bulk-notified automatically.

## Verification

Run `node --test scripts/test-enquiries.mjs`, `npm run check`, `npm run build`, and the site verifier. Unit tests exercise validation, duplicate retries, conflicting reuse, rate limiting and storage failure with a transaction contract double; they do not substitute for a live Firestore test.

A live test passed on 19 September 2026 after the owner enabled Firestore: the browser submitted a clearly labelled synthetic enquiry, the Admin SDK read it back, and retrying the same reference returned the same record without duplication. Reference: `49137bc2-0a83-4c4c-bcc1-646f8efd212f`. The record remains in the database as `Codex QA Test` / `CONTACT BACKEND VERIFICATION — test only`. Notification state is `not_configured`; nothing was sent. Anonymous REST access to that record returned 403. This proves the local production build can save to real Firestore, not that a Vercel deployment is configured. The local Google Cloud CLI login still requires reauthentication if used for further infrastructure changes.

Local checks completed: four validation/storage contract tests; six HTTP checks (cross-origin, format, malformed JSON, oversized input, invalid fields and read-method rejection); browser save-failure recovery with preserved fields; full site verification. The dependency override moves vulnerable transitive UUID versions to the compatible CommonJS 11.x release; the Google client uses its v4 API. Dependency audit reports zero known vulnerabilities after the update.

The website and admin stay in this application. The WhatsApp agent can later be a separate Vercel application; no monorepo migration is required just to enable this contact form.
