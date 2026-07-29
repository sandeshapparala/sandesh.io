import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Clock3,
  Languages,
  MessageCircle,
  Rows3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatThread } from "@/components/portfolio/chat-thread";
import { CtaBand } from "@/components/portfolio/cta-band";
import { RedactedEvidence } from "@/components/portfolio/redacted-evidence";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { SiteShell } from "@/components/portfolio/site-shell";
import { StatNumber } from "@/components/portfolio/stat-number";
import { StructuredData } from "@/components/portfolio/structured-data";
import { siteConfig } from "@/content/site";

const outcomes = [
  {
    icon: Clock3,
    title: "Replies in under 3 seconds",
    description:
      "Every enquiry gets a useful first response, 24/7, instead of waiting for office hours.",
  },
  {
    icon: Languages,
    title: "Qualifies in English or Telugu",
    description:
      "Budget, location, home type, and buying timeline are captured in the buyer’s language.",
  },
  {
    icon: CalendarCheck,
    title: "Books the site visit",
    description:
      "The right buyer can move into an available visit slot without waiting for a callback.",
  },
  {
    icon: Rows3,
    title: "Logs and scores every lead",
    description:
      "Your team sees the conversation, qualification, visit status, and next action.",
  },
] as const;

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

      <section className="overflow-hidden pb-24 pt-12 sm:pb-28 sm:pt-16 lg:pb-36 lg:pt-24">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          <div>
            <p className="eyebrow text-muted-foreground">
              WhatsApp sales systems · Residential real estate
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.75rem,6.5vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-balance">
              I build WhatsApp AI agents that reply in 3 seconds and book site
              visits while you sleep.
            </h1>
            <p className="mt-7 max-w-[58ch] text-lg leading-8 text-muted-foreground text-pretty">
              For residential developers.{" "}
              <strong className="font-medium text-foreground">
                500+ conversations, 30+ site visits, 5 villas sold
              </strong>
              —in one week.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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
              <Button asChild variant="outline" size="xl">
                <Link href="/contact">
                  Request a 15-min call
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Opens a pre-filled WhatsApp conversation.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[34rem] lg:mr-0">
            <div
              className="absolute -inset-6 -z-10 border border-border bg-paper-deep/55 sm:-inset-8"
              aria-hidden="true"
            />
            <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              <span>Response window</span>
              <span>Live product demonstration</span>
            </div>
            <ChatThread />
            <p className="mt-5 flex items-center justify-between font-mono text-xs tabular-nums text-muted-foreground">
              <span>Enquiry · 11:47 PM</span>
              <span>Answer · 11:47 PM</span>
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-paper-deep">
        <div className="mx-auto w-full max-w-4xl px-5 py-20 sm:px-8 sm:py-24">
          <h2 className="font-display text-3xl font-medium leading-tight tracking-[-0.025em] text-balance sm:text-4xl lg:text-5xl">
            A lead enquires at{" "}
            <span className="font-mono text-signal-strong tabular-nums">
              11:47 PM
            </span>
            . Your team replies at 10 AM. By then they&apos;ve spoken to three
            other builders. Most developers lose deals to response time, not
            price.
          </h2>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="What the system does"
            title="The first mile of every sales conversation."
            description="It handles speed and structure so your team enters with context—not a blank chat and a cold lead."
          />
          <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2">
            {outcomes.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className="group bg-card p-7 transition-colors duration-200 hover:bg-white sm:p-9"
              >
                <div className="flex items-center justify-between">
                  <Icon className="size-5 text-signal-strong" aria-hidden="true" />
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-12 text-xl font-semibold tracking-[-0.02em]">
                  {title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-ink-deep text-paper">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Built and working in Vijayawada"
            title="Yutha Constructions turned response speed into site visits."
            description="Meta ad enquiries arrived on WhatsApp at every hour. The agent answered, qualified the buyer, and moved the right conversation toward a visit."
            inverted
            action={
              <Link
                href="/work/yutha-constructions"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-paper transition-colors hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
              >
                Read the full case study
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            }
          />

          <div className="mt-16 grid gap-8 border-y border-white/12 py-10 sm:grid-cols-3">
            <StatNumber value="500+" label="conversations handled" inverted />
            <StatNumber value="30+" label="site visits supported" inverted />
            <StatNumber value="5" label="villas sold in one week" inverted />
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow text-signal">The handoff</p>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
                The agent protects the first response. Your team closes the
                human moments.
              </h3>
              <p className="mt-5 max-w-prose text-base leading-7 text-paper/60">
                Qualification, visit intent, and conversation context are
                recorded. Handover rules keep the salesperson in control when a
                buyer asks for a person or the conversation needs judgment.
              </p>
            </div>
            <RedactedEvidence />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
          <h2 className="font-display text-4xl font-medium leading-tight tracking-[-0.035em] text-balance sm:text-5xl">
            Not an agency. I don&apos;t run your ads or manage your social
            media.{" "}
            <strong className="font-semibold">
              I build the system that replies.
            </strong>
          </h2>
        </div>
      </section>

      <section className="border-y border-border bg-paper-deep">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-7 sm:px-8 md:flex-row md:items-center">
          <p className="eyebrow shrink-0 text-muted-foreground">Also building</p>
          <div className="flex flex-1 flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium">
            <Link
              href="/services/ai-automation"
              className="hover:text-signal-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              AI automation
            </Link>
            <span className="text-muted-foreground" aria-hidden="true">
              ·
            </span>
            <Link
              href="/services/ai-integration"
              className="hover:text-signal-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              LLM integration
            </Link>
            <span className="text-muted-foreground" aria-hidden="true">
              ·
            </span>
            <Link
              href="/services/web-platforms"
              className="hover:text-signal-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Web platforms
            </Link>
          </div>
          <Link
            href="/services"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View all services
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CtaBand />
    </SiteShell>
  );
}
