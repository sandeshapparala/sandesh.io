import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sandesh — WhatsApp AI Sales Agents",
    short_name: "Sandesh",
    description:
      "WhatsApp AI sales agents for residential real estate developers.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F5F1",
    theme_color: "#F7F5F1",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
