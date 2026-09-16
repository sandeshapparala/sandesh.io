import Link from "next/link";
import { Menu, MessageCircle } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

const homepageNavigation = [
  { label: "System", href: "/#system" },
  { label: "Proof", href: "/#proof" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/82 backdrop-blur-xl">
      <div className="relative mx-auto flex h-[4.5rem] w-full max-w-[90rem] items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xl font-bold tracking-[-0.055em] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            aria-label="Sandesh home"
          >
            sandesh<span className="text-signal">.io</span>
          </Link>
          <span className="hidden h-5 w-px bg-border sm:block" aria-hidden="true" />
          <span className="hidden items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.11em] text-muted-foreground sm:flex">
            <span className="live-dot size-1.5 rounded-full bg-verify" />
            Response system / online
          </span>
        </div>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {homepageNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[0.67rem] font-medium uppercase tracking-[0.09em] text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
            </Link>
          ))}
          </nav>

          <ThemeToggle />

          <Button
            asChild
            variant="brand"
            size="lg"
            className="hidden min-h-11 rounded-none px-5 sm:inline-flex"
          >
            <Link
              href={siteConfig.demoUrl}
              target="_blank"
              rel="noreferrer"
              data-analytics="demo-click"
              data-haptic
            >
              Test live agent
              <MessageCircle aria-hidden="true" />
            </Link>
          </Button>

          <details className="group lg:hidden">
            <summary className="flex size-11 cursor-pointer list-none items-center justify-center border border-border bg-background text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
              <Menu className="size-5" aria-hidden="true" />
              <span className="sr-only">Open navigation</span>
            </summary>
            <div className="absolute inset-x-5 top-[calc(100%+0.75rem)] border border-border bg-background/98 p-5 shadow-card-hover backdrop-blur-xl sm:inset-x-8">
              <div className="mb-3 flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-verify">
                <span className="live-dot size-1.5 rounded-full bg-verify" />
                Response system / online
              </div>
              <nav className="flex flex-col" aria-label="Mobile">
                {homepageNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="border-b border-border py-4 font-display text-2xl font-semibold tracking-[-0.035em] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Button
                asChild
                variant="brand"
                size="xl"
                className="mt-5 w-full rounded-none"
              >
                <Link
                  href={siteConfig.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-analytics="demo-click"
                  data-haptic
                >
                  Test the live agent
                  <MessageCircle aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
