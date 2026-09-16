"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { Analytics } from "@vercel/analytics/next";

export function PortfolioAnalytics({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    function trackMarkedClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) {
        return;
      }

      const target = event.target.closest<HTMLElement>("[data-analytics]");
      const eventName = target?.dataset.analytics;

      if (eventName) {
        track(eventName, { path: window.location.pathname });
      }
    }

    document.addEventListener("click", trackMarkedClick);
    return () => document.removeEventListener("click", trackMarkedClick);
  }, [enabled]);

  return enabled ? <Analytics /> : null;
}
