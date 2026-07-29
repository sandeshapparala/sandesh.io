import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/portfolio/case-study-card";
import { CtaBand } from "@/components/portfolio/cta-band";
import { PageHero } from "@/components/portfolio/page-hero";
import { SiteShell } from "@/components/portfolio/site-shell";
import { StructuredData } from "@/components/portfolio/structured-data";
import { siteConfig } from "@/content/site";
import { workItems } from "@/content/work";

export const metadata: Metadata = {
  title: "Work — AI Systems and WhatsApp Agents",
  description:
    "Explore Yutha Constructions, the Verenza WhatsApp demo, and selected supporting systems work.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work — AI systems and WhatsApp agents by Sandesh",
    description:
      "A client result, a demo you can test, and selected supporting work.",
    url: "/work",
    images: ["/api/og/work"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/api/og/work"],
  },
};

export default function WorkPage() {
  return (
    <SiteShell>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${siteConfig.url}/work`,
          name: "Work by Sandesh",
          hasPart: workItems.map((item, index) => ({
            "@type": "CreativeWork",
            position: index + 1,
            name: item.title,
            url: `${siteConfig.url}/work/${item.slug}`,
          })),
        }}
      />
      <PageHero
        eyebrow="Work"
        title="Proof, a demo, and the systems behind both."
        description="One production result carries the front door. The live demo lets you test the behaviour. Supporting work shows the broader engineering range without weakening the specialist claim."
      />

      <section className="pb-24 sm:pb-32 lg:pb-40">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <CaseStudyCard item={workItems[0]} featured />
          </div>
          <CaseStudyCard item={workItems[1]} />
          <CaseStudyCard item={workItems[2]} />
        </div>
      </section>

      <CtaBand />
    </SiteShell>
  );
}
