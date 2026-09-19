"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, ArrowUpRight } from "lucide-react";
export function AdminLogin({ configured }: { configured: boolean }) {
  const router = useRouter(),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = event.currentTarget,
      data = new FormData(form);
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.get("email"),
            password: data.get("password"),
            returnSecureToken: true,
          }),
        },
      );
      if (!response.ok)
        throw new Error("Unable to sign in. Check your email and password.");
      const { idToken } = await response.json();
      const session = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      if (!session.ok)
        throw new Error(
          (await session.json()).error || "This account is not allowed.",
        );
      form.reset();
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Sign-in failed.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="admin-login">
      <div className="admin-symbol">
        <LockKeyhole size={25} />
      </div>
      <p className="admin-eyebrow">SANDESH.IO · PRIVATE WORKSPACE</p>
      <h1>
        A home for every
        <br />
        conversation.
      </h1>
      <p>
        Sign in to review enquiries, take over a WhatsApp conversation, and
        manage your agent.
      </p>
      <form onSubmit={login}>
        <label>
          Email
          <input name="email" type="email" autoComplete="username" required />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </label>
        <button disabled={busy || !configured}>
          {busy ? "Signing in…" : "Open your inbox"}
          <ArrowUpRight size={18} />
        </button>
        <p className="admin-error" role="status">
          {error ||
            (!configured ? "Owner access has not been configured yet." : "")}
        </p>
      </form>
      <small>Access is restricted to verified, approved owner accounts.</small>
    </section>
  );
}
