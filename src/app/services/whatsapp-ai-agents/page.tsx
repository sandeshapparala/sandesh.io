import { ServiceDetail } from "@/components/services/service-pages";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "WhatsApp AI agents for real estate",
  "Custom WhatsApp AI agents to answer property enquiries, qualify leads, coordinate site visits, and support your sales team.",
  "/services/whatsapp-ai-agents",
);
export default function AgentsPage() {
  return <ServiceDetail service={services[0]} />;
}
