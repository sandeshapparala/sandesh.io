# Firebase project — sandesh.io

Created 19 September 2026 through the logged-in Firebase CLI.

- Firebase/Google Cloud project ID: `sandesh-io`
- Firebase project display name: `Sandesh IO` (Google rejected the dot in `sandesh.io` as a project display name)
- Project number: `67435524379`
- Registered web app display name: `sandesh.io`
- Web app ID: `1:67435524379:web:364e2569573f6c4cd3e3be`
- Dedicated user-managed service account display name: `sandesh.io`
- Dedicated service account email: `sandesh-io@sandesh-io.iam.gserviceaccount.com`
- Firebase-created Admin SDK service account also exists: `firebase-adminsdk-fbsvc@sandesh-io.iam.gserviceaccount.com`. Use the dedicated account for future backend deployment after assigning its specific permissions.

The public web configuration is in [`.env.example`](../../.env.example). The existing ignored `.env.local` was left unchanged. No private key, access token, or deploy-time credential is in this repository. The dedicated service account has no project IAM role yet; creating it does not enable a backend. Do not add a broad Editor/Owner role by default.

Before the contact form can save enquiries, provision Firestore in an appropriate region, configure Firebase Authentication for the owner, add Firestore access rules/authorization, and connect the web app and a server-side submission route. The AI agent will be a separate Vercel project with its own deployment identity and environment variables; decide its minimum permissions as that service is built. Verify a real submission and private inbox in production before claiming lead collection works.

The [readiness report](06-production-readiness.md) now reflects Firebase as the chosen datastore; implementation and production security checks are still pending.
