import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function CtaBand({
  eyebrow = "See it answer",
  title = "Test the sales conversation before you request a call.",
  description = "The demo is a fictional villa project. Ask it the questions your buyers ask and see how it handles the first response.",
  className,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <section className={cn("section-space", className)}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 bg-ink-deep px-6 py-12 text-paper sm:px-10 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:px-14">
          <div>
            <p className="eyebrow text-signal">{eyebrow}</p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-paper/62">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
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
            <Button asChild variant="outlineLight" size="xl">
              <Link href="/contact">
                Request a 15-min call
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
