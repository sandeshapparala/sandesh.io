import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  inverted = false,
  action,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  inverted?: boolean;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.55fr)] lg:items-end",
        className,
      )}
    >
      <div>
        <p
          className={cn(
            "eyebrow",
            inverted ? "text-signal" : "text-muted-foreground",
          )}
        >
          {eyebrow}
        </p>
        <h2
          className={cn(
            "mt-5 max-w-4xl font-display text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl",
            inverted ? "text-paper" : "text-foreground",
          )}
        >
          {title}
        </h2>
      </div>
      <div className="lg:pb-1">
        {description ? (
          <p
            className={cn(
              "max-w-prose text-base leading-7 text-pretty",
              inverted ? "text-paper/62" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        ) : null}
        {action ? <div className="mt-6">{action}</div> : null}
      </div>
    </div>
  );
}
