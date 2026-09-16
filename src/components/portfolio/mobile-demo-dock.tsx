"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function MobileDemoDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setVisible(window.scrollY > Math.min(window.innerHeight * 0.72, 620));
      });
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div
      className={cn(
        "mobile-demo-dock fixed inset-x-3 bottom-3 z-40 border border-border/90 bg-background/92 p-2 shadow-[0_16px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-[transform,opacity] duration-300 md:hidden",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-[calc(100%+2rem)] opacity-0",
      )}
    >
      <a
        href={siteConfig.demoUrl}
        target="_blank"
        rel="noreferrer"
        data-analytics="demo-click"
        data-haptic
        className="flex min-h-12 items-center justify-between bg-signal px-4 text-sm font-semibold text-signal-foreground active:scale-[0.985]"
      >
        Test the live WhatsApp agent
        <MessageCircle className="size-4" aria-hidden="true" />
      </a>
    </div>
  );
}
