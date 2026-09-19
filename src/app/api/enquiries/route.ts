import { enquiryDatabase } from "@/lib/firebase-admin";
import { parseEnquiry } from "@/lib/enquiry-validation";
import {
  EnquiryConflict,
  EnquiryRateLimit,
  saveEnquiry,
} from "@/lib/save-enquiry";

export const runtime = "nodejs";
export const maxDuration = 30;
const json = (body: unknown, status: number, extra = {}) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extra },
  });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin)
    return json({ error: "Please submit from this website." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return json({ error: "Unsupported request format." }, 415);
  // Bound the actual stream as well as Content-Length, which callers can omit.
  const reader = request.body?.getReader();
  if (!reader) return json({ error: "Missing form data." }, 400);
  let text = "";
  let bytes = 0;
  const decoder = new TextDecoder();
  let enquiry;
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > 8192) {
        await reader.cancel();
        return json({ error: "Your brief is too long." }, 413);
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
    text += decoder.decode();
    enquiry = parseEnquiry(JSON.parse(text));
  } catch {
    return json(
      {
        error:
          "Please check your name, business, email and project details, then try again.",
      },
      400,
    );
  }
  try {
    const secret = process.env.ENQUIRY_RATE_LIMIT_SECRET;
    if (!secret || secret.length < 32)
      throw new Error("Rate limit secret not configured");
    // Only trust Vercel's platform-supplied address; never arbitrary forwarded headers.
    const ip = process.env.VERCEL
      ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim()
      : undefined;
    const result = await saveEnquiry(enquiryDatabase(), enquiry, secret, ip);
    return json({ reference: result.reference }, result.duplicate ? 200 : 201);
  } catch (error) {
    if (error instanceof EnquiryConflict)
      return json(
        {
          error:
            "This submission reference was already used. Edit the form before sending a new enquiry.",
        },
        409,
      );
    if (error instanceof EnquiryRateLimit)
      return json(
        {
          error:
            "Too many enquiries right now. Please try again later or email hello@sandesh.io.",
        },
        429,
        { "Retry-After": "3600" },
      );
    // Avoid logging enquiry content, credential errors or personal details.
    console.error("Enquiry storage unavailable");
    return json(
      {
        error:
          "We couldn’t confirm your enquiry was saved. Your details are still here—please retry or email hello@sandesh.io.",
      },
      503,
    );
  }
}
