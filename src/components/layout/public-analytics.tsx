"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";

function isPrivatePath(pathname: string) {
  return /^\/(admin|api)(\/|$)/i.test(pathname);
}

function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  const url = new URL(event.url);
  // Keep filtering after a public-page visit, even if the script stays loaded.
  if (isPrivatePath(url.pathname)) return null;
  url.search = "";
  url.hash = "";
  return { ...event, url: url.toString() };
}

export function PublicAnalytics() {
  const pathname = usePathname();
  if (isPrivatePath(pathname)) return null;
  return <Analytics beforeSend={beforeSend} />;
}
