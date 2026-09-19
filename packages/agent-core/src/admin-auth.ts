import "server-only";
import { auth } from "./firebase";
export const COOKIE = "sandesh_admin";
export function allowed(
  email: string | undefined,
  verified: boolean | undefined,
) {
  const emails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return verified === true && !!email && emails.includes(email.toLowerCase());
}
export async function verifySession(cookie: string | undefined) {
  if (!cookie) return false;
  try {
    const user = await auth().verifySessionCookie(cookie, true);
    return allowed(user.email, user.email_verified);
  } catch {
    return false;
  }
}
