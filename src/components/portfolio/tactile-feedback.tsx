"use client";

import { useEffect } from "react";

export function TactileFeedback() {
  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        event.pointerType !== "touch" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const target = event.target;
      if (target instanceof Element && target.closest("[data-haptic]")) {
        navigator.vibrate?.(8);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown, {
      passive: true,
    });
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return null;
}
