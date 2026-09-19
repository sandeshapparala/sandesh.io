import { Hero } from "@/components/home/hero";
import { TextLink } from "@/components/ui/links";
import { Workflow } from "@/components/home/workflow";
import { WebsiteCards } from "@/components/work/project-cards";
import { Process } from "@/components/home/process";
import { Testimonials } from "@/components/home/testimonials";
import { SelectedProjects } from "@/components/home/selected-projects";
import { AgentCare, PersonalNote } from "@/components/home/personal-sections";
import "./home.css";
import { FAQ, ContactCTA } from "@/components/home/sections";
import { site } from "@/content/site";

export default function Home() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: "AI Agent Engineer",
    image: `${site.url}/portrait/sandesh-apparala.png`,
    sameAs: [site.linkedin, site.github],
  };
  return (
    <main id="main" className="homepage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Workflow />
      <section className="section container" id="client-work">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Selected AI projects</span>
            <h2>
              Built for businesses.
              <br />
              Made for real conversations.
            </h2>
          </div>
          <div>
            <p>
              WhatsApp agents I’ve built for teams in real estate and
              construction.
            </p>
            <TextLink href="/work">Explore client work</TextLink>
          </div>
        </div>
        <SelectedProjects />
      </section>
      <Process />
      <AgentCare />
      <PersonalNote />
      <Testimonials />
      <section className="section container website-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Beyond the conversation</span>
            <h2>
              Good websites.
              <br />
              The same thoughtful approach.
            </h2>
          </div>
          <div>
            <p>
              A selection of websites I’ve built for brands, studios, and
              growing businesses.
            </p>
            <TextLink href="/work#websites">View all website projects</TextLink>
          </div>
        </div>
        <WebsiteCards />
      </section>
      <FAQ />
      <ContactCTA />
    </main>
  );
}
