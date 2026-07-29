import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { primaryNavigation, siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="bg-ink-deep text-paper">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 border-b border-white/12 pb-16 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow text-signal">Ready when the next lead is</p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
              See the sales agent reply for yourself.
            </h2>
          </div>
          <Button asChild variant="brand" size="xl">
            <Link
              href={siteConfig.demoUrl}
              target="_blank"
              rel="noreferrer"
              data-analytics="demo-click"
            >
              Try the demo agent
              <MessageCircle aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-12 pt-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <Link
              href="/"
              className="text-2xl font-semibold tracking-[-0.04em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            >
              sandesh<span className="text-signal">.io</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-paper/62">
              I build AI systems that do revenue work—starting with WhatsApp
              sales agents for residential developers.
            </p>
          </div>

          <div>
            <p className="eyebrow text-paper/65">Navigate</p>
            <nav className="mt-5 flex flex-col gap-3" aria-label="Footer">
              {primaryNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-paper/72 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="eyebrow text-paper/65">Connect</p>
            <div className="mt-5 flex flex-col gap-3">
              <Link
                href={`mailto:${siteConfig.email}`}
                className="inline-flex w-fit items-center gap-2 text-sm text-paper/72 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
              >
                <Mail className="size-4" aria-hidden="true" />
                {siteConfig.email}
              </Link>
              <Link
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 text-sm text-paper/72 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
              >
                LinkedIn
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href={siteConfig.social.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 text-sm text-paper/72 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
              >
                GitHub
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/12 pt-6 text-xs text-paper/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sandesh Technologies.</p>
          <p>Working with residential developers across India.</p>
        </div>
      </div>
    </footer>
  );
}
