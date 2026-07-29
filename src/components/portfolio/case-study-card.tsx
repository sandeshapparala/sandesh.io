import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { WorkItem } from "@/content/work";
import { cn } from "@/lib/utils";

const kindLabel = {
  "case-study": "Case study",
  demo: "Live demo",
  "project-note": "Project note",
} as const;

export function CaseStudyCard({
  item,
  featured = false,
}: {
  item: WorkItem;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col border border-border bg-card shadow-card transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-signal/50 hover:shadow-card-hover",
        featured ? "p-7 sm:p-10" : "p-7",
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow text-muted-foreground">{kindLabel[item.kind]}</p>
        <span className="font-mono text-xs tabular-nums text-muted-foreground">
          {item.slug === "yutha-constructions"
            ? "500+ conversations"
            : item.slug === "verenza-demo"
              ? "Try it live"
              : "Selected work"}
        </span>
      </div>
      <h2
        className={cn(
          "mt-8 font-display font-semibold tracking-[-0.03em] text-balance",
          featured ? "text-4xl sm:text-5xl" : "text-3xl",
        )}
      >
        {item.cardTitle}
      </h2>
      <p className="mt-5 max-w-prose text-base leading-7 text-muted-foreground">
        {item.description}
      </p>
      {item.facts.length ? (
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-border pt-6">
          {item.facts.slice(0, 3).map((fact) => (
            <div key={fact.label}>
              <strong className="block font-mono text-xl font-medium tabular-nums">
                {fact.value}
              </strong>
              <span className="text-xs text-muted-foreground">{fact.label}</span>
            </div>
          ))}
        </div>
      ) : null}
      <Link
        href={`/work/${item.slug}`}
        className="mt-auto inline-flex min-h-12 items-end justify-between gap-4 pt-8 text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-card"
      >
        {item.kind === "demo" ? "Open the demo page" : "Read the project"}
        <ArrowUpRight
          className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
