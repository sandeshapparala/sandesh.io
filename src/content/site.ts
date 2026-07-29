export const siteConfig = {
  name: "Sandesh",
  fullName: "Sandesh Apparala",
  company: "Sandesh Technologies",
  url: "https://sandesh.io",
  email: "hello@sandesh.io",
  demoUrl: "https://wa.me/918331837887?text=Hi",
  callRequestUrl:
    "mailto:hello@sandesh.io?subject=15-minute%20call%20about%20a%20WhatsApp%20AI%20sales%20agent",
  description:
    "WhatsApp AI sales agents for residential developers that reply in under 3 seconds, qualify buyers, and book site visits.",
  social: {
    linkedin: "https://linkedin.com/in/SandeshApparala",
    github: "https://github.com/sandeshapparala",
    x: "https://twitter.com/SandeshApparala",
  },
} as const;

export const primaryNavigation = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const serviceSlugs = [
  "whatsapp-ai-sales-agents",
  "ai-automation",
  "ai-integration",
  "web-platforms",
] as const;

export const workSlugs = [
  "yutha-constructions",
  "verenza-demo",
  "megham-chocolate",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];
export type WorkSlug = (typeof workSlugs)[number];
