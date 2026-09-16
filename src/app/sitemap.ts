import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { site } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/work",
    "/about",
    "/contact",
    "/privacy",
    "/services/whatsapp-ai-agents",
    "/services/agent-management",
    ...caseStudies.map((project) => `/work/${project.slug}`),
  ].map((path) => ({ url: `${site.url}${path}` }));
}
