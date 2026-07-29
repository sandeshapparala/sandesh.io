import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatThread } from "@/components/portfolio/chat-thread";
import { RedactedEvidence } from "@/components/portfolio/redacted-evidence";
import { SiteShell } from "@/components/portfolio/site-shell";
import { StatNumber } from "@/components/portfolio/stat-number";
import { StructuredData } from "@/components/portfolio/structured-data";
import {
  siteConfig,
  type WorkSlug,
  workSlugs,
} from "@/content/site";
import { workBySlug } from "@/content/work";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return workSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = workBySlug[slug as WorkSlug];

  if (!item) {
    return {};
  }

  return {
    title: item.metadata.title.replace(" — Sandesh", ""),
    description: item.metadata.description,
    alternates: { canonical: `/work/${item.slug}` },
    openGraph: {
      title: item.metadata.title,
      description: item.metadata.description,
      url: `/work/${item.slug}`,
      images: [`/api/og/work-${item.slug}`],
    },
    twitter: {
      card: "summary_large_image",
      images: [`/api/og/work-${item.slug}`],
    },
  };
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const item = workBySlug[slug as WorkSlug];

  if (!item) {
    notFound();
  }

  const isExternalCta = item.cta.href.startsWith("http");

  return (
    <SiteShell>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type":
            item.kind === "case-study"
              ? "Article"
              : item.kind === "demo"
                ? "WebPage"
                : "WebPage",
          "@id": `${siteConfig.url}/work/${item.slug}`,
          headline: item.title,
          description: item.metadata.description,
          url: `${siteConfig.url}/work/${item.slug}`,
          author: { "@id": `${siteConfig.url}/about#sandesh` },
          publisher: { "@id": `${siteConfig.url}/#organization` },
        }}
      />

      <section className="page-hero">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <Link
            href="/work"
            className="mb-10 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            ← All work
          </Link>
          <p className="eyebrow text-muted-foreground">{item.eyebrow}</p>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.75rem,7vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-balance">
            {item.title}
          </h1>
          <p className="mt-7 max-w-[62ch] text-lg leading-8 text-muted-foreground text-pretty">
            {item.description}
          </p>
        </div>
      </section>

      {item.facts.length ? (
        <section className="border-y border-border bg-paper-deep">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-8 px-5 py-10 sm:px-8 md:grid-cols-3 lg:grid-cols-5">
            {item.facts.map((fact) => (
              <StatNumber key={fact.label} {...fact} />
            ))}
          </div>
        </section>
      ) : null}

      {item.kind === "demo" ? (
        <section className="section-space">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <p className="eyebrow text-muted-foreground">Try this first</p>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
                Talk to it like a buyer.
              </h2>
              <p className="mt-5 max-w-prose text-base leading-7 text-muted-foreground">
                Open WhatsApp, send “Hi,” and continue naturally. Verenza is
                fictional and is not a real property listing. The preview is
                illustrative; the live agent is the product to test.
              </p>
              <Button asChild variant="brand" size="xl" className="mt-8">
                <Link
                  href={siteConfig.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-analytics="demo-click"
                >
                  Message the demo
                  <MessageCircle aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <ChatThread className="mx-auto lg:mr-0" />
          </div>
        </section>
      ) : null}

      <section className="section-space">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid gap-px border border-border bg-border">
            {item.sections.map((section) => (
              <article
                key={section.label}
                className="grid gap-8 bg-card p-7 sm:p-10 lg:grid-cols-[0.52fr_1.48fr] lg:p-14"
              >
                <p className="eyebrow text-muted-foreground">{section.label}</p>
                <div>
                  <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
                    {section.title}
                  </h2>
                  <div className="mt-6 max-w-[62ch] space-y-5 text-base leading-7 text-muted-foreground">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {item.kind === "case-study" ? (
        <section className="section-space bg-ink-deep text-paper">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <p className="eyebrow text-signal">Public evidence boundary</p>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
                The result is public. Buyer conversations are not.
              </h2>
              <p className="mt-5 max-w-prose text-base leading-7 text-paper/60">
                Only approved aggregate results are shown here. Names, phone
                numbers, transcripts, and commercial details remain private.
              </p>
            </div>
            <RedactedEvidence />
          </div>
        </section>
      ) : null}

      <section className="section-space bg-paper-deep">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.6fr_1.4fr]">
          <p className="eyebrow text-muted-foreground">Capabilities in view</p>
          <ul className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {item.capabilities.map((capability) => (
              <li
                key={capability}
                className="flex min-h-16 items-center bg-card px-5 text-sm font-medium"
              >
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.58fr_1.42fr] lg:items-end">
          <p className="eyebrow text-muted-foreground">Next step</p>
          <div>
            <h2 className="font-display text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
              {item.cta.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              {item.cta.description}
            </p>
            <Button asChild variant="brand" size="xl" className="mt-8">
              <Link
                href={item.cta.href}
                {...(isExternalCta
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                data-analytics={
                  item.cta.href === siteConfig.demoUrl
                    ? "demo-click"
                    : undefined
                }
              >
                {item.cta.label}
                {isExternalCta ? (
                  <MessageCircle aria-hidden="true" />
                ) : (
                  <ArrowRight aria-hidden="true" />
                )}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
