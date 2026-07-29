import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { cn } from "@/lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col border border-border bg-card shadow-card transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-signal/50 hover:shadow-card-hover",
        service.featured ? "p-7 sm:p-10" : "p-7",
        service.compact && "lg:max-w-2xl",
      )}
    >
      <p className="eyebrow text-muted-foreground">{service.eyebrow}</p>
      <h2
        className={cn(
          "mt-5 font-display font-semibold tracking-[-0.03em] text-balance",
          service.featured ? "text-4xl sm:text-5xl" : "text-3xl",
        )}
      >
        {service.cardTitle}
      </h2>
      <p className="mt-5 max-w-prose text-base leading-7 text-muted-foreground">
        {service.description}
      </p>
      <div className="mt-8 border-t border-border pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
          Who it&apos;s for
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {service.whoFor}
        </p>
      </div>
      <Link
        href={`/services/${service.slug}`}
        className="mt-auto inline-flex min-h-12 items-center justify-between gap-4 pt-8 text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-card"
      >
        View service
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
