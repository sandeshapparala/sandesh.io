import Image from "next/image";
import { ButtonLink, TextLink } from "@/components/ui/links";
import { Workflow } from "@/components/home/workflow";
import { CaseCards, WebsiteCards } from "@/components/work/project-cards";
import {
  Management,
  AboutIntro,
  FAQ,
  ContactCTA,
} from "@/components/home/sections";
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
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
      <section className="hero container">
        <div className="hero-identity">
          <Image
            src="/portrait/sandesh-apparala.png"
            alt=""
            width={40}
            height={40}
            preload
          />
          <span>
            Sandesh Apparala <span className="identity-separator">/</span> AI
            Agent Engineer
          </span>
        </div>
        <h1>
          AI agents that turn enquiries into <span>sales conversations.</span>
        </h1>
        <p className="hero-description">
          I build and manage WhatsApp AI agents for real estate businesses.
          Answer questions, qualify leads, and help your team take the next
          step.
        </p>
        <div className="hero-actions">
          <ButtonLink href="/contact">Book a consultation</ButtonLink>
          <ButtonLink href="/work" secondary>
            Explore client work
          </ButtonLink>
        </div>
        <p className="hero-note">
          Built for your business. Managed for the long run.
        </p>
      </section>
      <section
        className="client-strip container"
        aria-label="Client experience"
      >
        <p>Real agents. Real businesses.</p>
        <div>
          <span>
            Yutha <small>CONSTRUCTIONS</small>
          </span>
          <span>
            Sharada <small>CONSTRUCTIONS</small>
          </span>
          <span>
            Tungabhadra <small>DEVELOPERS · SRINGERI</small>
          </span>
        </div>
      </section>
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
        <CaseCards />
      </section>
      <div className="soft-section">
        <Management />
      </div>
      <AboutIntro />
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
