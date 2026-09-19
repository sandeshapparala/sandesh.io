import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export function enquiryDatabase() {
  const service = process.env.FIREBASE_SERVICE_JSON_KEY
    ? (JSON.parse(process.env.FIREBASE_SERVICE_JSON_KEY) as {
        project_id?: string;
        client_email?: string;
        private_key?: string;
      })
    : undefined;
  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    service?.project_id ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const emulator = process.env.FIRESTORE_EMULATOR_HOST;
  if (emulator && (process.env.VERCEL || !projectId?.startsWith("demo-")))
    throw new Error("Unsafe emulator configuration");
  const clientEmail =
    service?.client_email || process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = (
    service?.private_key || process.env.FIREBASE_PRIVATE_KEY
  )?.replace(/\\n/g, "\n");
  if (!projectId || (!emulator && (!clientEmail || !privateKey)))
    throw new Error("Firebase is not configured");
  const app =
    getApps().find((app) => app.name === "portfolio-enquiries") ??
    initializeApp(
      {
        projectId,
        ...(emulator
          ? {}
          : { credential: cert({ projectId, clientEmail, privateKey }) }),
      },
      "portfolio-enquiries",
    );
  return getFirestore(app);
}
