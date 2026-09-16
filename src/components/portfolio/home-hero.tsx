"use client";

import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
} from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Bot,
  CalendarCheck2,
  Check,
  CircleDot,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

type HeroStyle = CSSProperties & {
  "--pointer-x": string;
  "--pointer-y": string;
  "--tilt-x": string;
  "--tilt-y": string;
};

const heroStyle: HeroStyle = {
  "--pointer-x": "72%",
  "--pointer-y": "38%",
  "--tilt-x": "0deg",
  "--tilt-y": "0deg",
};

export function HomeHero() {
  const frameRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    },
    [],
  );

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const tiltY = ((x / bounds.width - 0.5) * 2.2).toFixed(2);
    const tiltX = ((0.5 - y / bounds.height) * 1.6).toFixed(2);

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      element.style.setProperty("--pointer-x", `${x}px`);
      element.style.setProperty("--pointer-y", `${y}px`);
      element.style.setProperty("--tilt-x", `${tiltX}deg`);
      element.style.setProperty("--tilt-y", `${tiltY}deg`);
    });
  }

  function resetPointer(event: ReactPointerEvent<HTMLElement>) {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    const element = event.currentTarget;
    frameRef.current = requestAnimationFrame(() => {
      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
    });
  }

  return (
    <section
      className="home-hero relative isolate overflow-hidden border-b border-border"
      style={heroStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      aria-labelledby="home-hero-title"
    >
      <div className="absolute inset-0 -z-20 bg-background" aria-hidden="true" />
      <GridPattern
        width={56}
        height={56}
        className="hero-grid-base -z-10 fill-transparent stroke-[var(--grid-line)]"
      />
      <GridPattern
        width={56}
        height={56}
        squares={[
          [2, 2],
          [5, 1],
          [8, 4],
          [12, 2],
          [16, 6],
          [20, 3],
          [23, 7],
        ]}
        className="hero-grid-glow -z-10 fill-[var(--grid-cell)] stroke-[var(--grid-active)]"
      />
      <div className="hero-ambient -z-10" aria-hidden="true" />
      <div className="hero-survey-line hero-survey-line--one" aria-hidden="true" />
      <div className="hero-survey-line hero-survey-line--two" aria-hidden="true" />

      <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] w-full max-w-[90rem] grid-cols-1 content-center gap-x-10 px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-14 lg:grid-cols-12 lg:py-12">
        <div className="relative z-10 flex flex-col justify-center lg:col-span-7 lg:min-h-[36rem] lg:pr-6 xl:col-span-6">
          <div className="hero-enter hero-enter--one flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="eyebrow text-blueprint">
              WhatsApp AI sales agent
            </span>
            <span
              className="hidden h-px w-8 bg-border sm:block"
              aria-hidden="true"
            />
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground">
              Residential developers / India
            </span>
          </div>

          <h1
            id="home-hero-title"
            className="hero-enter hero-enter--two mt-5 max-w-[12ch] font-display text-[clamp(2.75rem,6.6vw,6.25rem)] font-semibold leading-[0.92] tracking-[-0.062em] text-balance"
          >
            Your next property lead gets a reply in{" "}
            <span className="relative whitespace-nowrap text-blueprint">
              3 seconds.
              <svg
                className="absolute -bottom-1 left-0 h-2 w-full overflow-visible text-signal"
                viewBox="0 0 280 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 7.5C58 2.5 111 7.5 164 4.5C206 2.2 244 4.6 278 2.5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="hero-enter hero-enter--three mt-7 max-w-[42rem] text-base leading-7 text-muted-foreground text-pretty sm:text-lg sm:leading-8">
            I build WhatsApp AI agents that qualify buyers in English or Telugu
            and book site visits—even when the enquiry lands at{" "}
            <span className="font-mono text-foreground tabular-nums">
              11:47 PM
            </span>
            .
          </p>

          <div className="hero-enter hero-enter--four mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              variant="brand"
              size="xl"
              className="group min-h-13 rounded-none px-7"
            >
              <a
                href={siteConfig.demoUrl}
                target="_blank"
                rel="noreferrer"
                data-analytics="demo-click"
                data-haptic
              >
                Test the live agent
                <MessageCircle
                  className="transition-transform group-hover:rotate-[-8deg] group-hover:scale-110"
                  aria-hidden="true"
                />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="group min-h-13 rounded-none border-border/90 bg-background/42 px-7 backdrop-blur-sm"
            >
              <Link href="#proof">
                See the Yutha results
                <ArrowDownRight
                  className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </div>

          <p className="hero-enter hero-enter--five mt-4 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-verify shadow-[0_0_0_4px_color-mix(in_srgb,var(--verify)_14%,transparent)]" />
            No form · WhatsApp opens with “Hi” ready to send
          </p>
        </div>

        <div className="relative z-10 mt-12 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:flex lg:items-center xl:col-span-6 xl:col-start-7">
          <ResponseField />
        </div>

        <div className="hero-enter hero-enter--six relative z-10 mt-9 border-y border-border/80 bg-background/58 backdrop-blur-sm lg:col-span-12 lg:mt-2">
          <div className="grid gap-px bg-border/80 sm:grid-cols-[1.45fr_0.55fr_0.55fr_0.7fr]">
            <div className="flex min-h-16 items-center gap-3 bg-background/88 px-4 py-3 sm:px-5">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.13em] text-muted-foreground">
                Live proof / Yutha Constructions
              </span>
              <ArrowRight className="ml-auto size-4 text-signal" aria-hidden="true" />
            </div>
            <ProofMetric value="500+" label="conversations" />
            <ProofMetric value="30+" label="site visits" />
            <ProofMetric value="5" label="villas / one week" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ResponseField() {
  return (
    <div className="response-scene relative mx-auto aspect-[0.92] w-full max-w-[38rem] overflow-hidden border border-border/90 bg-card/62 shadow-[0_30px_100px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="absolute inset-0 response-scene-grid" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 flex h-11 items-center justify-between border-b border-border/80 bg-background/72 px-3 font-mono text-[0.61rem] uppercase tracking-[0.12em] text-muted-foreground sm:px-4">
        <span>Lead response field / Vijayawada</span>
        <span className="flex items-center gap-2 text-verify">
          <span className="live-dot size-1.5 rounded-full bg-verify" />
          System online
        </span>
      </div>

      <svg
        className="absolute inset-x-[8%] top-[13%] h-[72%] w-[84%] overflow-visible"
        viewBox="0 0 600 470"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M92 96 C180 96 176 216 291 216 C405 216 395 110 508 110 M291 216 C291 320 177 313 177 392 M291 216 C291 325 425 307 466 391"
          className="response-path-base"
        />
        <path
          d="M92 96 C180 96 176 216 291 216 C405 216 395 110 508 110 M291 216 C291 320 177 313 177 392 M291 216 C291 325 425 307 466 391"
          className="response-path-signal"
        />
      </svg>

      <div className="response-node response-node--enquiry">
        <span className="response-node__icon">
          <MessageCircle aria-hidden="true" />
        </span>
        <span>
          <small>11:47:08 / New enquiry</small>
          <strong>“Is the 3BHK available?”</strong>
        </span>
      </div>

      <div className="response-node response-node--agent">
        <span className="response-orbit" aria-hidden="true" />
        <span className="response-node__icon response-node__icon--agent">
          <Bot aria-hidden="true" />
        </span>
        <span>
          <small>11:47:11 / Answer sent</small>
          <strong>3.0 sec</strong>
        </span>
      </div>

      <div className="response-node response-node--record">
        <span className="response-node__icon">
          <CircleDot aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <small>Qualification / Live</small>
          <strong>3BHK · English · High intent</strong>
        </span>
      </div>

      <div className="response-node response-node--visit">
        <span className="response-node__icon">
          <CalendarCheck2 aria-hidden="true" />
        </span>
        <span>
          <small>Next action</small>
          <strong>Saturday site visit</strong>
        </span>
      </div>

      <div className="response-node response-node--handoff">
        <span className="response-node__icon">
          <MapPin aria-hidden="true" />
        </span>
        <span>
          <small>Sales handoff</small>
          <strong>Context logged</strong>
        </span>
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between border-t border-border/70 pt-3 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted-foreground sm:bottom-4 sm:left-4 sm:right-4">
        <span className="flex items-center gap-1.5">
          <Check className="size-3 text-verify" aria-hidden="true" />
          Existing WhatsApp number
        </span>
        <span>EN / TE</span>
      </div>
    </div>
  );
}

function ProofMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-h-16 items-center justify-between gap-3 bg-background/88 px-4 py-3 sm:block sm:px-5">
      <strong className="font-mono text-lg font-medium leading-none tracking-[-0.03em] text-foreground tabular-nums">
        {value}
      </strong>
      <span className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted-foreground sm:mt-1 sm:block">
        {label}
      </span>
    </div>
  );
}
