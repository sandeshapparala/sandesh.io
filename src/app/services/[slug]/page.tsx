import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatThread } from "@/components/portfolio/chat-thread";
import { CtaBand } from "@/components/portfolio/cta-band";
import { PageHero } from "@/components/portfolio/page-hero";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { SiteShell } from "@/components/portfolio/site-shell";
import { StructuredData } from "@/components/portfolio/structured-data";
import { serviceBySlug, services } from "@/content/services";
import {
  serviceSlugs,
  siteConfig,
  type ServiceSlug,
} from "@/content/site";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug[slug as ServiceSlug];

  if (!service) {
    return {};
  }

  return {
    title: service.metadata.title.replace(" — Sandesh", ""),
    description: service.metadata.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metadata.title,
      description: service.metadata.description,
      url: `/services/${service.slug}`,
      images: [`/api/og/service-${service.slug}`],
    },
    twitter: {
      card: "summary_large_image",
      images: [`/api/og/service-${service.slug}`],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = serviceBySlug[slug as ServiceSlug];

  if (!service) {
    notFound();
  }

  const otherServices = services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  return (
    <SiteShell>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${siteConfig.url}/services/${service.slug}#service`,
          name: service.title,
          description: service.metadata.description,
          url: `${siteConfig.url}/services/${service.slug}`,
          provider: { "@id": `${siteConfig.url}/#organization` },
          areaServed: "India",
          audience: {
            "@type": "Audience",
            audienceType:
              service.slug === "whatsapp-ai-sales-agents"
                ? "Residential real estate developers"
                : "Indian businesses and product teams",
          },
        }}
      />
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        description={service.description}
        backHref="/services"
        backLabel="All services"
      />

      {service.slug === "whatsapp-ai-sales-agents" ? (
        <section className="pb-24 sm:pb-32">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div className="border-l-2 border-signal pl-6">
              <p className="eyebrow text-muted-foreground">
                Your number stays familiar
              </p>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
                Buyers keep using WhatsApp. Your team keeps the handoff.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                The agent works through WhatsApp Cloud API on the business
                workflow you define. It protects response time without turning
                the sales process into a black box.
              </p>
            </div>
            <ChatThread
              className="mx-auto lg:mr-0"
              compact
              title="Project sales"
              enquiry="We are looking for a villa near Vijayawada. Is a Sunday visit possible?"
              reply="Yes. I can help with an available Sunday slot. Are you looking for a 3BHK or 4BHK?"
            />
          </div>
        </section>
      ) : null}

      <section className="section-space bg-paper-deep">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="The problem"
            title={service.problem.title}
            description={service.problem.body.join(" ")}
          />
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="What you get"
            title="Concrete parts your team can operate."
            description="The deliverables are defined around the workflow and its owner—not a generic bundle of AI features."
          />
          <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((deliverable) => (
              <article key={deliverable.title} className="bg-card p-7 sm:p-8">
                <Check className="size-5 text-signal-strong" aria-hidden="true" />
                <h3 className="mt-8 text-lg font-semibold tracking-[-0.015em]">
                  {deliverable.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {deliverable.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-ink-deep text-paper">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="How it works"
            title="Three steps, because the order matters."
            description="The workflow is understood before it is automated, tested before it is trusted, and reviewed after it is live."
            inverted
          />
          <ol className="mt-16 grid gap-px border border-white/12 bg-white/12 lg:grid-cols-3">
            {service.steps.map((step, index) => (
              <li key={step.title} className="bg-ink-deep p-7 sm:p-9">
                <span className="font-mono text-sm text-signal tabular-nums">
                  0{index + 1}
                </span>
                <h3 className="mt-12 text-xl font-semibold tracking-[-0.02em] text-paper">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-paper/58">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <p className="eyebrow text-muted-foreground">{service.proof.label}</p>
          <div>
            <h2 className="font-display text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
              {service.proof.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              {service.proof.description}
            </p>
            <Button asChild variant="ink" size="xl" className="mt-8">
              <Link href={service.proof.href}>
                {service.proof.linkLabel}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-paper-deep">
        <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8">
          <p className="eyebrow text-muted-foreground">Explore the range</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {otherServices.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="inline-flex min-h-11 items-center gap-2 border-b border-border text-sm font-semibold transition-colors hover:border-signal hover:text-signal-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.title}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Try before the call"
        title="A working conversation says more than a service page."
        description="Open the Verenza demo, send “Hi,” and test the first response on WhatsApp."
      />
    </SiteShell>
  );
}
