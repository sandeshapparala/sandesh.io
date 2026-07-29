import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  description,
  backHref,
  backLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <section className="page-hero">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        {backHref && backLabel ? (
          <Link
            href={backHref}
            className="mb-10 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {backLabel}
          </Link>
        ) : null}
        <p className="eyebrow text-muted-foreground">{eyebrow}</p>
        <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.75rem,7vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-balance">
          {title}
        </h1>
        <p className="mt-7 max-w-[62ch] text-lg leading-8 text-muted-foreground text-pretty">
          {description}
        </p>
      </div>
    </section>
  );
}
