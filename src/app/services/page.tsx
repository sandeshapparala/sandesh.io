import { ServiceOverview } from "@/components/services/service-pages";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "AI agents, integrations, websites & ecommerce",
  "AI agent development, workflow integration, business websites, and ecommerce development by Sandesh Apparala.",
  "/services",
);
export default function ServicesPage() {
  return <ServiceOverview />;
}
