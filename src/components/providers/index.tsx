"use client";

import SmoothScrollProvider from "./smooth-scroll-provider";
import MotionProvider from "./motion-provider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionProvider>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </MotionProvider>
  );
}
