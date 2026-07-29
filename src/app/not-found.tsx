import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/portfolio/site-shell";
import { siteConfig } from "@/content/site";

export default function NotFoundPage() {
  return (
    <SiteShell>
      <section className="flex min-h-[68vh] items-center">
        <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8">
          <p className="font-mono text-sm text-signal-strong tabular-nums">404</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold tracking-[-0.04em] text-balance sm:text-7xl">
            This conversation has no next message.
          </h1>
          <p className="mt-6 max-w-prose text-lg leading-8 text-muted-foreground">
            The page may have moved. Return home or open the working WhatsApp
            demo.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="ink" size="xl">
              <Link href="/">
                <ArrowLeft aria-hidden="true" />
                Back home
              </Link>
            </Button>
            <Button asChild variant="brand" size="xl">
              <Link
                href={siteConfig.demoUrl}
                target="_blank"
                rel="noreferrer"
              >
                Try the demo
                <MessageCircle aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
