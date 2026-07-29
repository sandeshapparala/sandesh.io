import type { Metadata } from "next";
import { CtaBand } from "@/components/portfolio/cta-band";
import { PageHero } from "@/components/portfolio/page-hero";
import { ServiceCard } from "@/components/portfolio/service-card";
import { SiteShell } from "@/components/portfolio/site-shell";
import { StructuredData } from "@/components/portfolio/structured-data";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "AI Services for Real Estate & Indian Businesses",
  description:
    "Explore WhatsApp AI sales agents, workflow automation, LLM integrations, and selected web platforms built by Sandesh.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "AI systems that do revenue work — Sandesh",
    description:
      "WhatsApp sales agents first, with automation, LLM integration, and selected web-platform engineering.",
    url: "/services",
    images: ["/api/og/services"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/api/og/services"],
  },
};

export default function ServicesPage() {
  return (
    <SiteShell>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${siteConfig.url}/services`,
          name: "AI services by Sandesh",
          description:
            "WhatsApp AI sales agents, workflow automation, LLM integration, and selected web platforms.",
          hasPart: services.map((service, index) => ({
            "@type": "Service",
            position: index + 1,
            name: service.title,
            url: `${siteConfig.url}/services/${service.slug}`,
            provider: { "@id": `${siteConfig.url}/#organization` },
          })),
        }}
      />
      <PageHero
        eyebrow="Services"
        title="AI systems that do revenue work."
        description="The front door is WhatsApp AI sales agents for residential developers. I also build workflow automation, focused LLM integrations, and selected web platforms when the larger system needs them."
      />

      <section className="pb-24 sm:pb-32 lg:pb-40">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <ServiceCard service={services[0]} />
          </div>
          <ServiceCard service={services[1]} />
          <ServiceCard service={services[2]} />
          <div className="lg:col-span-2">
            <ServiceCard service={services[3]} />
          </div>
        </div>
      </section>

      <CtaBand />
    </SiteShell>
  );
}
