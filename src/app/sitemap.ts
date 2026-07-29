import type { MetadataRoute } from "next";
import {
  serviceSlugs,
  siteConfig,
  workSlugs,
} from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/work", "/about", "/contact"];
  const routes = [
    ...staticRoutes,
    ...serviceSlugs.map((slug) => `/services/${slug}`),
    ...workSlugs.map((slug) => `/work/${slug}`),
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date("2026-07-30"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/work/yutha-constructions" ||
            route === "/services/whatsapp-ai-sales-agents"
          ? 0.9
          : 0.7,
  }));
}
