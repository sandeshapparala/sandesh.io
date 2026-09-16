import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      {
        source: "/projects/zax-design-studio",
        destination: "/work#websites",
        permanent: true,
      },
      {
        source: "/projects/epix-infra",
        destination: "/work#websites",
        permanent: true,
      },
      { source: "/testimonial", destination: "/work", permanent: true },
      {
        source: "/services",
        destination: "/services/whatsapp-ai-agents",
        permanent: true,
      },
      {
        source: "/services/ai-agents",
        destination: "/services/whatsapp-ai-agents",
        permanent: true,
      },
      {
        source: "/services/whatsapp-ai-sales-agents",
        destination: "/services/whatsapp-ai-agents",
        permanent: true,
      },
      {
        source: "/services/ai-automation",
        destination: "/services/whatsapp-ai-agents",
        permanent: true,
      },
      {
        source: "/services/ai-integration",
        destination: "/services/whatsapp-ai-agents",
        permanent: true,
      },
      {
        source: "/services/web-platforms",
        destination: "/work#websites",
        permanent: true,
      },
      {
        source: "/work/megham-chocolate",
        destination: "/work#websites",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
