import type { Metadata } from "next";
import { cookies } from "next/headers";
import { COOKIE, verifySession } from "@sandesh/agent-core/admin-auth";
import { Inbox } from "@/components/admin/inbox";
import { AdminLogin } from "@/components/admin/login";
import "./admin.css";
export const metadata: Metadata = {
  title: "Private inbox",
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin" },
};
export default async function AdminPage() {
  const signedIn = await verifySession((await cookies()).get(COOKIE)?.value);
  return (
    <main id="main" className="admin-workspace">
      {signedIn ? (
        <Inbox />
      ) : (
        <AdminLogin
          configured={
            !!process.env.ADMIN_EMAILS &&
            !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY
          }
        />
      )}
    </main>
  );
}
