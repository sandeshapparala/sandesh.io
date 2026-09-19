import { createHash, createHmac } from "node:crypto";
import { Timestamp, type Firestore } from "firebase-admin/firestore";
import type { Enquiry } from "./enquiry-validation";

export class EnquiryConflict extends Error {}
export class EnquiryRateLimit extends Error {}

// Called only from the server route. Both the lead and abuse counters commit together.
export async function saveEnquiry(
  db: Firestore,
  enquiry: Enquiry,
  secret: string,
  ip?: string,
) {
  const { submissionId, ...fields } = enquiry;
  const payloadHash = createHash("sha256")
    .update(JSON.stringify(fields))
    .digest("hex");
  const lead = db.collection("enquiries").doc(submissionId);
  const now = Date.now();
  const window = Math.floor(now / 3_600_000);
  const bucket = (value: string) =>
    createHmac("sha256", secret).update(value).digest("hex");
  const limits = [
    { key: `email-${bucket(fields.email)}-${window}`, max: 3 },
    { key: `global-${window}`, max: 100 },
    ...(ip ? [{ key: `ip-${bucket(ip)}-${window}`, max: 10 }] : []),
  ];
  return db.runTransaction(async (tx) => {
    const existing = await tx.get(lead);
    if (existing.exists) {
      if (existing.get("payloadHash") !== payloadHash)
        throw new EnquiryConflict();
      return { reference: submissionId, duplicate: true };
    }
    const refs = limits.map(({ key }) =>
      db.collection("enquiryRateLimits").doc(key),
    );
    const counts = await tx.getAll(...refs);
    if (counts.some((snap, i) => (snap.get("count") ?? 0) >= limits[i].max))
      throw new EnquiryRateLimit();
    tx.create(lead, {
      ...fields,
      payloadHash,
      source: "website",
      status: "new",
      createdAt: Timestamp.fromMillis(now),
      updatedAt: Timestamp.fromMillis(now),
      notification: { channel: "whatsapp", status: "not_configured" },
    });
    refs.forEach((ref, i) =>
      tx.set(ref, {
        count: (counts[i].get("count") ?? 0) + 1,
        expiresAt: Timestamp.fromMillis((window + 2) * 3_600_000),
      }),
    );
    return { reference: submissionId, duplicate: false };
  });
}
