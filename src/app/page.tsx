import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CalendarCheck2,
  Check,
  CircleX,
  Clock3,
  Languages,
  MessageCircle,
  Route,
  Send,
  UserRoundCheck,
} from "lucide-react";
import { HomeHero } from "@/components/portfolio/home-hero";
import { MobileDemoDock } from "@/components/portfolio/mobile-demo-dock";
import { SiteShell } from "@/components/portfolio/site-shell";
import { StructuredData } from "@/components/portfolio/structured-data";
import { SystemWalkthrough } from "@/components/portfolio/system-walkthrough";
import { TactileFeedback } from "@/components/portfolio/tactile-feedback";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

const proofMetrics = [
  { value: "500+", label: "conversations handled" },
  { value: "30+", label: "site visits supported" },
  { value: "5", label: "villas sold" },
  { value: "<3 sec", label: "first response" },
  { value: "1 week", label: "measured window" },
] as const;

const humanControl = [
  {
    icon: MessageCircle,
    index: "01",
    title: "Your number stays yours",
    text: "The system works on the WhatsApp number buyers already know.",
  },
  {
    icon: Languages,
    index: "02",
    title: "English or Telugu",
    text: "The buyer can continue naturally in the language they prefer.",
  },
  {
    icon: Route,
    index: "03",
    title: "Every lead is structured",
    text: "Conversation, qualification, visit status, and next action stay visible.",
  },
  {
    icon: UserRoundCheck,
    index: "04",
    title: "Humans take the human moments",
    text: "A salesperson steps in when the buyer asks or judgment is required.",
  },
] as const;

const demoPrompts = [
  {
    label: "Ask about availability",
    message: "Hi, is the 3BHK villa available?",
  },
  {
    label: "Try it in Telugu",
    message: "నమస్కారం, 3BHK విల్లా వివరాలు కావాలి",
  },
  {
    label: "Book a Saturday visit",
    message: "Hi, can I book a site visit this Saturday?",
  },
] as const;

function whatsappUrl(message: string) {
  return `https://wa.me/918331837887?text=${encodeURIComponent(message)}`;
}

export default function HomePage() {
  return (
    <SiteShell>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${siteConfig.url}/#organization`,
              name: siteConfig.company,
              url: siteConfig.url,
              email: siteConfig.email,
              founder: { "@id": `${siteConfig.url}/about#sandesh` },
              areaServed: "India",
            },
            {
              "@type": "WebSite",
              "@id": `${siteConfig.url}/#website`,
              url: siteConfig.url,
              name: siteConfig.name,
              publisher: { "@id": `${siteConfig.url}/#organization` },
            },
            {
              "@type": "Service",
              "@id": `${siteConfig.url}/services/whatsapp-ai-sales-agents#service`,
              name: "WhatsApp AI sales agents for real estate developers",
              provider: { "@id": `${siteConfig.url}/#organization` },
              areaServed: "India",
              audience: {
                "@type": "Audience",
                audienceType: "Residential real estate developers",
              },
            },
          ],
        }}
      />
      <TactileFeedback />
      <MobileDemoDock />
      <HomeHero />

      <section className="home-section overflow-hidden border-b border-border bg-paper-deep">
        <div className="mx-auto w-full max-w-[90rem] px-5 py-20 sm:px-8 sm:py-24 lg:py-32">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="eyebrow text-blueprint">The loss clock</p>
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                The problem is not another CRM. It is the empty time between
                interest and the first useful answer.
              </p>
            </div>
            <h2 className="max-w-4xl font-display text-[clamp(2.65rem,5.2vw,5.75rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-balance">
              <span className="font-mono text-signal-strong tabular-nums">
                11:47 PM
              </span>{" "}
              shouldn&apos;t become 10:00 AM.
            </h2>
          </div>

          <div className="loss-clock mt-14 border border-border bg-background">
            <div className="grid border-b border-border font-mono text-[0.62rem] uppercase tracking-[0.11em] text-muted-foreground sm:grid-cols-[10rem_1fr]">
              <span className="px-4 py-3 sm:px-5">Response comparison</span>
              <span className="hidden border-l border-border px-5 py-3 sm:block">
                11:47 PM → 10:00 AM / buyer decision window
              </span>
            </div>
            <ClockLane
              type="manual"
              label="Manual follow-up"
              start="11:47 PM"
              end="10:00 AM"
              result="3 builders already contacted"
            />
            <ClockLane
              type="agent"
              label="AI response system"
              start="11:47:08"
              end="11:47:11"
              result="Qualification already started"
            />
          </div>
        </div>
      </section>

      <section id="system" className="home-section scroll-mt-24">
        <div className="mx-auto w-full max-w-[90rem] px-5 py-20 sm:px-8 sm:py-24 lg:py-32">
          <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="eyebrow text-blueprint">Inside the response system</p>
              <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.7rem,5vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-balance">
                See what happens in those 3 seconds.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted-foreground lg:justify-self-end">
              It is not a chatbot floating beside your sales process. It is the
              first mile of the process: reply, qualify, book, and hand over
              with context.
            </p>
          </div>
          <SystemWalkthrough />
        </div>
      </section>

      <section
        id="proof"
        className="proof-room relative isolate scroll-mt-20 overflow-hidden bg-ink-deep text-paper"
      >
        <div className="proof-room-grid absolute inset-0 -z-10" aria-hidden="true" />
        <div className="mx-auto w-full max-w-[90rem] px-5 py-20 sm:px-8 sm:py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="eyebrow text-signal">Proof / Vijayawada</p>
              <p className="mt-4 max-w-sm text-sm leading-6 text-paper/58">
                Yutha Constructions · WhatsApp lead response system · measured
                over one week
              </p>
            </div>
            <div>
              <h2 className="max-w-5xl font-display text-[clamp(2.75rem,5.3vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-balance">
                Built for a real developer. Measured in real conversations.
              </h2>
              <Button
                asChild
                variant="outlineLight"
                size="xl"
                className="group mt-8 min-h-13 rounded-none"
              >
                <Link href="/work/yutha-constructions">
                  Open the Yutha case study
                  <ArrowRight
                    className="transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-5">
            {proofMetrics.map((metric, index) => (
              <div
                key={metric.label}
                className="proof-metric min-h-40 bg-ink-deep/94 p-5 sm:p-6"
              >
                <span className="font-mono text-[0.62rem] text-paper/42 tabular-nums">
                  0{index + 1}
                </span>
                <strong className="mt-8 block font-display text-4xl font-semibold tracking-[-0.05em] text-signal sm:text-5xl">
                  {metric.value}
                </strong>
                <span className="mt-2 block text-xs uppercase tracking-[0.07em] text-paper/58">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-14 border-y border-white/12 py-7">
            <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
              <ProofStep icon={Send} label="Meta enquiry" />
              <ArrowRight className="hidden size-4 text-signal md:block" aria-hidden="true" />
              <ProofStep icon={MessageCircle} label="Existing WhatsApp" />
              <ArrowRight className="hidden size-4 text-signal md:block" aria-hidden="true" />
              <ProofStep icon={Bot} label="AI qualifies" />
              <ArrowRight className="hidden size-4 text-signal md:block" aria-hidden="true" />
              <ProofStep icon={CalendarCheck2} label="Site visit" />
            </div>
          </div>
        </div>
      </section>

      <section className="home-section border-b border-border">
        <div className="mx-auto grid w-full max-w-[90rem] gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.88fr_1.12fr] lg:py-32">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-blueprint">Human control, designed in</p>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.7rem,4.8vw,5.25rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-balance">
              Fast first responses. Human sales where it matters.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
              Automation protects the response window. Your team keeps control
              of the relationship, the judgment calls, and the close.
            </p>
          </div>

          <div className="border-t border-border">
            {humanControl.map(({ icon: Icon, index, title, text }) => (
              <article
                key={title}
                className="human-control-row group grid gap-4 border-b border-border py-7 sm:grid-cols-[3.5rem_1fr_auto] sm:items-center sm:py-8"
              >
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {index}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                    {text}
                  </p>
                </div>
                <span className="grid size-12 place-items-center border border-border bg-card text-muted-foreground transition-all group-hover:border-blueprint/45 group-hover:bg-blueprint/10 group-hover:text-blueprint">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="home-section scroll-mt-24 overflow-hidden">
        <div className="mx-auto w-full max-w-[90rem] px-5 py-20 sm:px-8 sm:py-24 lg:py-32">
          <div className="disqualifier relative overflow-hidden border border-border bg-card px-5 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            <div className="disqualifier-grid absolute inset-0" aria-hidden="true" />
            <p className="eyebrow relative text-signal-strong">Clear scope</p>
            <h2 className="relative mt-5 max-w-6xl font-display text-[clamp(2.75rem,5.65vw,6.4rem)] font-semibold leading-[0.91] tracking-[-0.062em] text-balance">
              Not an agency. I don&apos;t run your ads or manage your social
              media.{" "}
              <span className="text-blueprint">
                I build the system that replies.
              </span>
            </h2>

            <div className="relative mt-12 grid gap-px border border-border bg-border font-mono text-[0.68rem] uppercase tracking-[0.1em] sm:grid-cols-3">
              <ScopeItem accepted={false} label="Ads management" />
              <ScopeItem accepted={false} label="Social media" />
              <ScopeItem accepted label="First-response system" />
            </div>
          </div>
        </div>

        <div className="border-y border-border bg-paper-deep">
          <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-5 px-5 py-7 sm:px-8 lg:flex-row lg:items-center">
            <p className="eyebrow shrink-0 text-muted-foreground">
              Also building
            </p>
            <div className="flex flex-1 flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold">
              <Link className="hover:text-blueprint" href="/services/ai-automation">
                AI automation
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link className="hover:text-blueprint" href="/services/ai-integration">
                LLM integration
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link className="hover:text-blueprint" href="/services/web-platforms">
                Web platforms
              </Link>
            </div>
            <Link
              href="/services"
              className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
            >
              View all services
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="conversion-challenge relative isolate overflow-hidden border-b border-border">
        <div className="conversion-grid absolute inset-0 -z-10" aria-hidden="true" />
        <div className="mx-auto w-full max-w-[90rem] px-5 py-20 sm:px-8 sm:py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="eyebrow text-blueprint">The conversation is the demo</p>
              <h2 className="mt-5 max-w-5xl font-display text-[clamp(2.8rem,5.5vw,6.2rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-balance">
                Don&apos;t book a call yet. Test the conversation first.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-muted-foreground lg:justify-self-end">
              Pick a real buyer question. The live agent opens in WhatsApp with
              the message ready—no form and no blank chat.
            </p>
          </div>

          <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3">
            {demoPrompts.map((prompt, index) => (
              <a
                key={prompt.label}
                href={whatsappUrl(prompt.message)}
                target="_blank"
                rel="noreferrer"
                data-analytics="demo-click"
                data-haptic
                className="demo-prompt group flex min-h-32 flex-col justify-between bg-card p-5 transition-colors hover:bg-blueprint/[0.07] sm:p-6"
              >
                <span className="flex items-center justify-between font-mono text-[0.63rem] uppercase tracking-[0.1em] text-muted-foreground">
                  Prompt / 0{index + 1}
                  <MessageCircle
                    className="size-4 text-verify transition-transform group-hover:rotate-[-8deg] group-hover:scale-110"
                    aria-hidden="true"
                  />
                </span>
                <strong className="mt-8 flex items-end justify-between gap-4 text-lg tracking-[-0.025em]">
                  {prompt.label}
                  <ArrowRight
                    className="size-4 shrink-0 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </strong>
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              variant="brand"
              size="xl"
              className="min-h-13 rounded-none px-7"
            >
              <a
                href={siteConfig.demoUrl}
                target="_blank"
                rel="noreferrer"
                data-analytics="demo-click"
                data-haptic
              >
                Open the live WhatsApp demo
                <MessageCircle aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="min-h-13 rounded-none px-7"
            >
              <a href={siteConfig.callRequestUrl}>
                Request a 15-minute fit call
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function ClockLane({
  type,
  label,
  start,
  end,
  result,
}: {
  type: "manual" | "agent";
  label: string;
  start: string;
  end: string;
  result: string;
}) {
  return (
    <div className="clock-lane grid border-b border-border last:border-b-0 sm:grid-cols-[10rem_1fr]">
      <div className="flex items-center gap-3 border-b border-border px-4 py-4 sm:border-b-0 sm:border-r sm:px-5">
        <Clock3
          className={type === "agent" ? "size-4 text-verify" : "size-4 text-signal-strong"}
          aria-hidden="true"
        />
        <span className="text-xs font-semibold">{label}</span>
      </div>
      <div className="clock-track relative grid min-h-32 grid-cols-[auto_1fr_auto] items-center gap-3 overflow-hidden px-4 py-5 sm:px-6">
        <TimeNode label="Enquiry" time={start} active />
        <div
          className={
            type === "agent"
              ? "clock-line clock-line--agent"
              : "clock-line clock-line--manual"
          }
        >
          <span />
        </div>
        <TimeNode
          label={type === "agent" ? "Agent reply" : "Team reply"}
          time={end}
          active={type === "agent"}
        />
        <span
          className={
            type === "agent"
              ? "col-span-3 justify-self-end font-mono text-[0.63rem] uppercase tracking-[0.08em] text-verify"
              : "col-span-3 justify-self-end font-mono text-[0.63rem] uppercase tracking-[0.08em] text-signal-strong"
          }
        >
          {result}
        </span>
      </div>
    </div>
  );
}

function TimeNode({
  label,
  time,
  active = false,
}: {
  label: string;
  time: string;
  active?: boolean;
}) {
  return (
    <div className="relative z-10 min-w-[4.7rem] bg-background">
      <span className="block font-mono text-[0.58rem] uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </span>
      <strong
        className={
          active
            ? "mt-1 block font-mono text-sm font-medium text-blueprint tabular-nums"
            : "mt-1 block font-mono text-sm font-medium text-foreground tabular-nums"
        }
      >
        {time}
      </strong>
    </div>
  );
}

function ProofStep({
  icon: Icon,
  label,
}: {
  icon: typeof Send;
  label: string;
}) {
  return (
    <div className="flex min-h-14 items-center gap-3 border border-white/12 bg-white/[0.035] px-4">
      <Icon className="size-4 text-signal" aria-hidden="true" />
      <span className="font-mono text-[0.64rem] uppercase tracking-[0.09em] text-paper/72">
        {label}
      </span>
    </div>
  );
}

function ScopeItem({
  accepted,
  label,
}: {
  accepted: boolean;
  label: string;
}) {
  return (
    <div className="flex min-h-16 items-center justify-between bg-background px-4 sm:px-5">
      <span>{label}</span>
      {accepted ? (
        <Check className="size-4 text-verify" aria-label="Included" />
      ) : (
        <CircleX className="size-4 text-muted-foreground" aria-label="Not included" />
      )}
    </div>
  );
}
