import { WorkCollection } from "@/components/work/work-collection";
import { ContactCTA } from "@/components/home/sections";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { ArrowUpRight } from "lucide-react";
import "@/components/work/work.css";
export const metadata = pageMetadata(
  "Client work",
  "Explore WhatsApp AI agents, business websites, and ecommerce projects built by Sandesh Apparala.",
  "/work",
);
export default function WorkPage() {
  return (
    <main id="main">
      <header className="work-intro container">
        <span className="eyebrow">Selected work · 2024–2026</span>
        <h1>
          Real businesses.
          <br />
          <span className="serif">Work you can explore.</span>
        </h1>
        <div>
          <p>
            From the first enquiry to the digital experience around it. AI
            agents, websites, and stores built with a clear purpose.
          </p>
          <a href={site.demoUrl} className="text-link">
            Try the WhatsApp agent demo <ArrowUpRight size={17} />
          </a>
        </div>
      </header>
      <WorkCollection />
      <ContactCTA />
    </main>
  );
}
