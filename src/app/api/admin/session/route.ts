import { cookies } from "next/headers";
import { auth } from "@sandesh/agent-core/firebase";
import { allowed, COOKIE } from "@sandesh/agent-core/admin-auth";
import { boundedBody } from "@sandesh/agent-core/webhook";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return new Response(null, { status: 403 });
  try {
    const { idToken } = JSON.parse(
      (await boundedBody(request, 16000)).toString(),
    );
    if (typeof idToken !== "string") return new Response(null, { status: 400 });
    const user = await auth().verifyIdToken(idToken, true);
    if (
      !allowed(user.email, user.email_verified) ||
      Date.now() / 1000 - user.auth_time > 300
    )
      return Response.json(
        { error: "This account is not allowed. Use a verified owner account." },
        { status: 403 },
      );
    const expiresIn = 8 * 60 * 60 * 1000,
      session = await auth().createSessionCookie(idToken, { expiresIn });
    (await cookies()).set(COOKIE, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: expiresIn / 1000,
    });
    return Response.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Sign-in could not be completed." },
      { status: 401 },
    );
  }
}
export async function DELETE(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return new Response(null, { status: 403 });
  (await cookies()).delete(COOKIE);
  return Response.json({ ok: true });
}
