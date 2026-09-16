import { CaseCards, WebsiteCards } from "@/components/work/project-cards";
import { ContactCTA } from "@/components/home/sections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Client work",
  "WhatsApp AI agents built for real estate and construction businesses, alongside selected website projects by Sandesh Apparala.",
  "/work",
);

export default function WorkPage() {
  return (
    <main id="main">
      <div className="page-hero container">
        <span className="eyebrow">Selected work</span>
        <h1>
          Real businesses.
          <br />
          <span className="serif">Thoughtfully built solutions.</span>
        </h1>
        <p>
          WhatsApp AI agents for real estate and construction, with a little of
          the web work that brought me here.
        </p>
      </div>
      <section className="work-page-section container" id="ai-agents">
        <div className="section-heading">
          <h2 className="page-title-small">WhatsApp AI agents</h2>
          <p>
            Three delivered client projects. Each built around a different
            business and its conversations.
          </p>
        </div>
        <CaseCards />
      </section>
      <section className="work-page-section container" id="websites">
        <div className="section-heading">
          <h2 className="page-title-small">Selected websites</h2>
          <p>
            Work across chocolate, architecture, interiors, and real estate.
            Visit the sites to take a closer look.
          </p>
        </div>
        <WebsiteCards all />
      </section>
      <ContactCTA />
    </main>
  );
}
