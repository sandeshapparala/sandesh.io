import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/portfolio/cta-band";
import { PageHero } from "@/components/portfolio/page-hero";
import { SiteShell } from "@/components/portfolio/site-shell";
import { StructuredData } from "@/components/portfolio/structured-data";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "About Sandesh — AI Systems for Residential Developers",
  description:
    "Meet Sandesh and the stack behind his WhatsApp AI sales agents and related systems for residential developers across India.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Sandesh — AI systems that do revenue work",
    description:
      "WhatsApp sales agents, Gemini API, WhatsApp Cloud API, Firebase, and Next.js.",
    url: "/about",
    images: ["/api/og/about"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/api/og/about"],
  },
};

const stack = [
  {
    name: "Gemini API",
    role: "Language understanding and response generation",
  },
  {
    name: "WhatsApp Cloud API",
    role: "The channel buyers and sales teams already use",
  },
  {
    name: "Firebase",
    role: "Conversation state, lead context, and operational records",
  },
  {
    name: "Next.js",
    role: "Fast public experiences and operating interfaces",
  },
] as const;

export default function AboutPage() {
  return (
    <SiteShell>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": `${siteConfig.url}/about`,
          mainEntity: {
            "@type": "Person",
            "@id": `${siteConfig.url}/about#sandesh`,
            name: siteConfig.fullName,
            url: `${siteConfig.url}/about`,
            worksFor: { "@id": `${siteConfig.url}/#organization` },
            knowsAbout: [
              "WhatsApp AI sales agents",
              "AI automation",
              "LLM integration",
              "Next.js",
            ],
          },
        }}
      />
      <PageHero
        eyebrow="About Sandesh"
        title="I build AI systems that do revenue work."
        description="The work starts with a concrete business moment: a lead waiting for a reply, a team repeating the same handoff, or a product feature that needs to behave reliably."
      />

      <section className="pb-24 sm:pb-32 lg:pb-40">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <figure className="relative min-h-[30rem] overflow-hidden bg-ink-deep p-8 text-paper sm:p-10">
            <div
              className="absolute inset-0 opacity-55"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(181,136,60,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(181,136,60,.15) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative flex h-full min-h-[25rem] flex-col justify-between">
              <p className="eyebrow text-signal">Builder · Engineer · Operator</p>
              <div>
                <div
                  className="font-sans text-[9rem] font-semibold leading-[0.72] tracking-[-0.08em] text-paper/10 sm:text-[12rem]"
                  aria-hidden="true"
                >
                  SA
                </div>
                <figcaption className="mt-8 border-t border-white/12 pt-6">
                  <strong className="block text-lg font-semibold">
                    Sandesh Apparala
                  </strong>
                  <span className="mt-1 block text-sm text-paper/55">
                    Sandesh Technologies
                  </span>
                </figcaption>
              </div>
            </div>
          </figure>

          <div className="lg:pt-8">
            <div className="max-w-[62ch] space-y-6 text-lg leading-8 text-muted-foreground">
              <p>
                I build WhatsApp AI sales agents and related systems for
                residential developers across India. The focus is practical:
                reply quickly, qualify the lead, and move the right conversation
                toward a site visit.
              </p>
              <p>
                I work with the Gemini API, WhatsApp Cloud API, Firebase, and
                Next.js. Each system is designed around clear handover rules,
                visible operating evidence, and the point where a person should
                take control.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
                <Link href="/work">
                  View the work
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <p className="mt-12 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
              Previous work includes selected websites and web platforms. That
              capability remains available when it supports the larger system.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space bg-paper-deep">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.58fr_1.42fr]">
            <div>
              <p className="eyebrow text-muted-foreground">Working stack</p>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
                Named plainly, used deliberately.
              </h2>
            </div>
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
              {stack.map((item) => (
                <article key={item.name} className="bg-card p-7">
                  <h3 className="font-mono text-base font-medium">{item.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.role}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </SiteShell>
  );
}
