import { notFound } from "next/navigation";
import { services } from "@/content/services";
import { ServiceDetail } from "@/components/services/service-pages";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() {
  return services
    .filter((service) => service.slug !== "whatsapp-ai-agents")
    .map((service) => ({ service: service.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return service
    ? pageMetadata(service.title, service.summary, `/services/${service.slug}`)
    : {};
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
