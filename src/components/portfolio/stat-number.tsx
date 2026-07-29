import { cn } from "@/lib/utils";

export function StatNumber({
  value,
  label,
  inverted = false,
  className,
}: {
  value: string;
  label: string;
  inverted?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-2", className)}>
      <strong
        className={cn(
          "font-mono text-4xl font-medium tracking-[-0.05em] tabular-nums sm:text-5xl",
          inverted ? "text-signal" : "text-foreground",
        )}
      >
        {value}
      </strong>
      <span
        className={cn(
          "text-sm leading-5",
          inverted ? "text-paper/70" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </div>
  );
}
