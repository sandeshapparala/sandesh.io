import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { TextLink } from "@/components/ui/links";
import { ContactCTA } from "@/components/home/sections";

export const metadata = pageMetadata(
  "About Sandesh",
  "Meet Sandesh Apparala, an independent AI agent engineer building WhatsApp automation, websites, and useful business workflows.",
  "/about",
);

export default function AboutPage() {
  return (
    <main id="main">
      <section className="container section about-section about-page">
        <div className="section-copy">
          <span className="eyebrow">Hello, I’m Sandesh Apparala</span>
          <h1>
            I build the agent.
            <br />
            <span className="serif">And the thinking around it.</span>
          </h1>
          <p>
            I’m an independent AI agent engineer focused on making AI useful in
            everyday business conversations.
          </p>
          <p>
            My work includes WhatsApp agents for Yutha Constructions, Sharada
            Constructions, and Tungabhadra Developers in Sringeri, alongside
            websites for businesses in real estate, interiors, and chocolate.
          </p>
          <TextLink href="/work">Explore my work</TextLink>
        </div>
        <div className="portrait-panel">
          <Image
            src="/portrait/sandesh-apparala.png"
            alt="Sandesh Apparala"
            width={910}
            height={910}
            preload
            sizes="(max-width: 560px) 100vw, 45vw"
          />
        </div>
      </section>
      <section className="container article-layout">
        <div>
          <span className="eyebrow">How I work</span>
          <h2>
            Direct collaboration.
            <br />
            Thoughtful engineering.
          </h2>
        </div>
        <div>
          <p>
            You work directly with the person building your system. I start by
            understanding your information, your conversations, and what your
            team needs to happen next.
          </p>
          <p>
            I’m interested in the whole workflow: the customer’s question, the
            agent’s answer, the information collected, and the moment a person
            takes over. That’s where an AI agent becomes useful.
          </p>
          <p>
            Real estate and construction are my primary focus. I’m also open to
            other businesses with a clear problem to solve and a practical use
            for AI.
          </p>
        </div>
      </section>
      <ContactCTA />
    </main>
  );
}
