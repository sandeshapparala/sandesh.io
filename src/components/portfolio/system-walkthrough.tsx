"use client";

import { useState } from "react";
import {
  ArrowRight,
  Bot,
  CalendarCheck2,
  Check,
  Languages,
  MessageCircleReply,
  UserRoundCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  {
    id: "reply",
    index: "01",
    title: "Reply",
    short: "Answers in under three seconds.",
    description:
      "A useful, project-aware answer reaches the buyer before the conversation goes cold.",
    icon: MessageCircleReply,
    transcript: [
      ["Buyer / 11:47:08", "Is the 3BHK villa still available?"],
      ["Agent / 11:47:11", "Yes. Would you like the price range and floor plan?"],
    ],
    record: ["Response: 3.0 sec", "Project: Yutha", "Status: Engaged"],
  },
  {
    id: "qualify",
    index: "02",
    title: "Qualify",
    short: "Finds budget, location, and intent.",
    description:
      "The same conversation captures the fields your salesperson needs, in English or Telugu.",
    icon: Languages,
    transcript: [
      ["Agent", "What budget range and move-in timeline work for you?"],
      ["Buyer", "Around ₹85L. Looking to move this year."],
    ],
    record: ["Budget: ₹80–90L", "Language: English", "Intent: High"],
  },
  {
    id: "book",
    index: "03",
    title: "Book",
    short: "Moves the right buyer to a visit.",
    description:
      "Qualified buyers see suitable site-visit options without waiting for a callback.",
    icon: CalendarCheck2,
    transcript: [
      ["Agent", "Saturday has 11 AM and 4 PM available. Which is better?"],
      ["Buyer", "4 PM works for me."],
    ],
    record: ["Visit: Saturday", "Slot: 4:00 PM", "Status: Confirmed"],
  },
  {
    id: "handoff",
    index: "04",
    title: "Handoff",
    short: "Gives sales the full context.",
    description:
      "Your person receives a scored summary and steps in when judgment or a human conversation matters.",
    icon: UserRoundCheck,
    transcript: [
      ["System", "High-intent lead ready for human follow-up."],
      ["Sales", "Context received. I’ll take it from here."],
    ],
    record: ["Lead score: 92/100", "Owner: Sales team", "Next: Personal call"],
  },
] as const;

export function SystemWalkthrough() {
  const [activeId, setActiveId] = useState<(typeof stages)[number]["id"]>(
    "reply",
  );
  const activeStage =
    stages.find((stage) => stage.id === activeId) ?? stages[0];
  const ActiveIcon = activeStage.icon;

  function selectStage(id: (typeof stages)[number]["id"]) {
    setActiveId(id);
    if (
      window.matchMedia("(pointer: coarse)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      navigator.vibrate?.(8);
    }
  }

  return (
    <div className="mt-14 grid border border-border bg-border lg:grid-cols-[0.88fr_1.12fr]">
      <div className="grid gap-px bg-border" role="tablist" aria-label="System stages">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const active = stage.id === activeId;
          return (
            <button
              key={stage.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="system-stage-panel"
              className={cn(
                "system-stage group relative min-h-28 bg-background px-5 py-5 text-left transition-colors sm:px-7",
                active && "system-stage--active bg-card",
              )}
              onClick={() => selectStage(stage.id)}
            >
              <span
                className={cn(
                  "absolute inset-y-0 left-0 w-0.5 bg-transparent transition-colors",
                  active && "bg-signal",
                )}
                aria-hidden="true"
              />
              <span className="flex items-start gap-4">
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center border border-border text-muted-foreground transition-colors",
                    active &&
                      "border-blueprint/45 bg-blueprint/10 text-blueprint",
                  )}
                >
                  <Icon className="size-4.5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-4">
                    <strong className="text-lg font-semibold tracking-[-0.025em]">
                      {stage.title}
                    </strong>
                    <span className="font-mono text-[0.64rem] tabular-nums text-muted-foreground">
                      {stage.index}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                    {stage.short}
                  </span>
                </span>
                <ArrowRight
                  className={cn(
                    "mt-3 size-4 shrink-0 text-muted-foreground transition-transform",
                    active && "translate-x-1 text-signal",
                  )}
                  aria-hidden="true"
                />
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="system-stage-panel"
        role="tabpanel"
        className="system-panel relative isolate min-h-[34rem] overflow-hidden bg-card p-5 sm:p-8 lg:p-10"
      >
        <div className="absolute inset-0 -z-10 system-panel-grid" aria-hidden="true" />
        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="eyebrow text-muted-foreground">
            Live system view / {activeStage.title}
          </span>
          <span className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-verify">
            <span className="live-dot size-1.5 rounded-full bg-verify" />
            Processing
          </span>
        </div>

        <div
          key={activeStage.id}
          className="system-panel-enter mt-8 grid gap-4 sm:grid-cols-[1.08fr_0.92fr]"
        >
          <div className="border border-border bg-background/88 p-4 shadow-card sm:p-5">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <span className="grid size-9 place-items-center rounded-full bg-verify/12 text-verify">
                <Bot className="size-4" aria-hidden="true" />
              </span>
              <span>
                <strong className="block text-sm">Yutha sales assistant</strong>
                <small className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-verify">
                  online now
                </small>
              </span>
            </div>
            <div className="space-y-3 pt-5">
              {activeStage.transcript.map(([label, message], index) => (
                <div
                  key={`${activeStage.id}-${label}`}
                  className={cn(
                    "max-w-[92%] border border-border bg-card px-3 py-3",
                    index % 2 === 1 && "ml-auto border-verify/25 bg-verify/[0.07]",
                  )}
                >
                  <span className="block font-mono text-[0.58rem] uppercase tracking-[0.08em] text-muted-foreground">
                    {label}
                  </span>
                  <p className="mt-1.5 text-sm leading-5">{message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-blueprint/25 bg-blueprint/[0.06] p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center border border-blueprint/30 bg-background/75 text-blueprint">
                <ActiveIcon className="size-4" aria-hidden="true" />
              </span>
              <div>
                <span className="block font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted-foreground">
                  Structured lead record
                </span>
                <strong className="mt-1 block text-sm">Updated in real time</strong>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              {activeStage.record.map((item, index) => (
                <div
                  key={item}
                  className="system-record-row flex min-h-11 items-center gap-2 border-b border-blueprint/15 font-mono text-xs"
                  style={{ animationDelay: `${index * 90 + 80}ms` }}
                >
                  <Check className="size-3.5 text-verify" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 border-l-2 border-signal bg-signal/[0.08] px-4 py-3">
          <span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.09em] text-signal-strong">
            Why it matters
          </span>
          <p className="max-w-xl text-xs leading-5 text-muted-foreground sm:text-sm">
            {activeStage.description}
          </p>
        </div>
      </div>
    </div>
  );
}
