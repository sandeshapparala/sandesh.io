import "server-only";
import {
  applicationDefault,
  cert,
  getApps,
  initializeApp,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
export function credentials() {
  if (process.env.FIREBASE_SERVICE_JSON_KEY)
    return JSON.parse(process.env.FIREBASE_SERVICE_JSON_KEY) as {
      project_id: string;
      client_email: string;
      private_key: string;
    };
  if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY)
    return {
      project_id: process.env.FIREBASE_PROJECT_ID!,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };
  return undefined;
}
export function firebaseApp() {
  const existing = getApps().find((a) => a.name === "sandesh-agent");
  if (existing) return existing;
  const service = credentials(),
    projectId = process.env.FIREBASE_PROJECT_ID || service?.project_id;
  if (!projectId) throw new Error("Firebase project is not configured");
  const emulator = process.env.FIRESTORE_EMULATOR_HOST;
  if (emulator && (process.env.VERCEL || !projectId.startsWith("demo-")))
    throw new Error("Unsafe emulator configuration");
  return initializeApp(
    {
      projectId,
      ...(emulator
        ? {}
        : {
            credential: service
              ? cert({
                  projectId: service.project_id,
                  clientEmail: service.client_email,
                  privateKey: service.private_key,
                })
              : applicationDefault(),
          }),
    },
    "sandesh-agent",
  );
}
export const db = () => getFirestore(firebaseApp());
export const auth = () => getAuth(firebaseApp());
