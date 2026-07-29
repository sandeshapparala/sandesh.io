import Link from "next/link";
import { Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { primaryNavigation, siteConfig } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="relative mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="text-xl font-semibold tracking-[-0.04em] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          aria-label="Sandesh home"
        >
          sandesh<span className="text-signal">.io</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild variant="brand" size="lg">
            <Link
              href={siteConfig.demoUrl}
              target="_blank"
              rel="noreferrer"
              data-analytics="demo-click"
            >
              Try the demo
              <MessageCircle aria-hidden="true" />
            </Link>
          </Button>
        </nav>

        <details className="group md:hidden">
          <summary className="flex size-11 cursor-pointer list-none items-center justify-center border border-border bg-background text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
            <Menu className="size-5" aria-hidden="true" />
            <span className="sr-only">Open navigation</span>
          </summary>
          <div className="absolute inset-x-5 top-[calc(100%+0.75rem)] border border-border bg-background p-5 shadow-card-hover sm:inset-x-8">
            <nav className="flex flex-col" aria-label="Mobile">
              {primaryNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-border py-4 text-2xl font-medium tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button asChild variant="brand" size="xl" className="mt-5 w-full">
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
        </details>
      </div>
    </header>
  );
}
