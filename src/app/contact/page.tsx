import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarClock,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/portfolio/page-hero";
import { SiteShell } from "@/components/portfolio/site-shell";
import { StructuredData } from "@/components/portfolio/structured-data";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Sandesh — WhatsApp AI Sales Agents",
  description:
    "Try the WhatsApp demo, email hello@sandesh.io, or request a 15-minute project call with Sandesh.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Sandesh",
    description:
      "Try the WhatsApp AI sales-agent demo or start a project conversation.",
    url: "/contact",
    images: ["/api/og/contact"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/api/og/contact"],
  },
};

const contactOptions = [
  {
    icon: MessageCircle,
    eyebrow: "Fastest first step",
    title: "Try the demo agent",
    description:
      "Open the fictional Verenza project, send “Hi,” and test the response on WhatsApp.",
    href: siteConfig.demoUrl,
    label: "Open WhatsApp",
    external: true,
    analytics: "demo-click",
  },
  {
    icon: Mail,
    eyebrow: "Project enquiry",
    title: "Email Sandesh",
    description:
      "Share the business, the workflow, and the result you need. No contact form or ticket queue.",
    href: `mailto:${siteConfig.email}?subject=Project%20enquiry`,
    label: siteConfig.email,
    external: false,
    analytics: undefined,
  },
  {
    icon: CalendarClock,
    eyebrow: "15-minute call",
    title: "Request a call",
    description:
      "Send a short email with the project context and a few times that work for you.",
    href: siteConfig.callRequestUrl,
    label: "Request a 15-min call",
    external: false,
    analytics: "request-call",
  },
] as const;

export default function ContactPage() {
  return (
    <SiteShell>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": `${siteConfig.url}/contact`,
          name: "Contact Sandesh",
          about: { "@id": `${siteConfig.url}/#organization` },
          email: siteConfig.email,
        }}
      />
      <PageHero
        eyebrow="Contact"
        title="Start with the working conversation."
        description="The fastest way to understand the product is to try it. For a project conversation, email me or request fifteen minutes. There is no contact form or ticket queue."
      />

      <section className="pb-24 sm:pb-32 lg:pb-40" id="contact-options">
        <div className="mx-auto grid w-full max-w-7xl gap-px border border-border bg-border px-0 sm:grid-cols-2 lg:grid-cols-3">
          {contactOptions.map(
            ({
              icon: Icon,
              eyebrow,
              title,
              description,
              href,
              label,
              external,
              analytics,
            }) => (
              <article
                key={title}
                className="flex min-h-[25rem] flex-col bg-card p-7 sm:p-9"
              >
                <div className="flex items-center justify-between">
                  <Icon className="size-5 text-signal-strong" aria-hidden="true" />
                  <p className="eyebrow text-muted-foreground">{eyebrow}</p>
                </div>
                <h2 className="mt-14 font-display text-3xl font-semibold tracking-[-0.03em] text-balance">
                  {title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
                <Button
                  asChild
                  variant={title === "Try the demo agent" ? "brand" : "outline"}
                  size="xl"
                  className="mt-auto w-full"
                >
                  <Link
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    data-analytics={analytics}
                  >
                    {label}
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </Button>
              </article>
            ),
          )}
        </div>
      </section>
    </SiteShell>
  );
}
