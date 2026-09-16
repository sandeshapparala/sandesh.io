import Image from "next/image";
import {
  ArrowRight,
  Check,
  Plus,
  RefreshCw,
  MessageSquareText,
  FileCheck2,
} from "lucide-react";
import { ButtonLink, TextLink } from "@/components/ui/links";
import { faqs } from "@/content/home";

export function Management() {
  return (
    <section className="section container management-section">
      <div className="management-visual">
        <div className="management-orbit" aria-hidden="true">
          <span className="orbit-label orbit-top">
            <MessageSquareText size={18} /> Review conversations
          </span>
          <span className="orbit-label orbit-right">
            <FileCheck2 size={18} /> Update knowledge
          </span>
          <span className="orbit-label orbit-bottom">
            <RefreshCw size={18} /> Keep improving
          </span>
          <div className="orbit-centre">
            <span className="brand-s">s.</span>
            <span>
              Your agent.
              <br />
              Built to keep improving.
            </span>
          </div>
        </div>
        <span className="visual-footnote">
          Ongoing care, with a defined monthly scope.
        </span>
      </div>
      <div className="section-copy">
        <span className="eyebrow">Built for the long run</span>
        <h2 className="serif">
          Launch is just
          <br />
          the beginning.
        </h2>
        <p>
          Your business changes. Your agent should keep up. I stay involved with
          scoped monthly management, so project information stays useful and the
          conversations keep getting better.
        </p>
        <ul className="check-list">
          <li>
            <Check size={18} /> Regular conversation reviews
          </li>
          <li>
            <Check size={18} /> Approved knowledge and workflow updates
          </li>
          <li>
            <Check size={18} /> Clear reporting and an improvement allowance
          </li>
        </ul>
        <TextLink href="/services/agent-management">
          Explore ongoing management
        </TextLink>
      </div>
    </section>
  );
}

export function AboutIntro() {
  return (
    <section className="section container about-section">
      <div className="section-copy">
        <span className="eyebrow">The person behind the build</span>
        <h2 className="serif">
          Hi, I’m Sandesh.
          <br />I make AI useful.
        </h2>
        <p>
          I’m an independent AI agent engineer. I build WhatsApp agents and the
          websites, integrations, and workflows around them.
        </p>
        <p>
          You work directly with me—from understanding the first enquiry to
          improving the conversations after launch.
        </p>
        <TextLink href="/about">A little more about me</TextLink>
      </div>
      <div className="portrait-panel">
        <Image
          src="/portrait/sandesh-apparala.png"
          alt="Sandesh Apparala, AI agent engineer"
          width={910}
          height={910}
          sizes="(max-width: 760px) 100vw, 45vw"
        />
        <div className="portrait-caption">
          <strong>Sandesh Apparala</strong>
          <span>AI Agent Engineer</span>
          <ArrowRight size={21} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section className="section container faq-section">
      <div>
        <span className="eyebrow">A few useful answers</span>
        <h2 className="serif">Before we build.</h2>
        <p>Have something else in mind?</p>
        <TextLink href="/contact">Let’s talk about it</TextLink>
      </div>
      <div className="faq-list">
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>
              {faq.question}
              <Plus size={20} aria-hidden="true" />
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ContactCTA() {
  return (
    <section className="contact-cta container">
      <span className="eyebrow">Better conversations start with one</span>
      <h2>
        Let’s put your next
        <br />
        <span className="serif">good idea to work.</span>
      </h2>
      <p>
        Tell me what your team handles manually.
        <br />
        Let’s find where an AI agent can make a difference.
      </p>
      <ButtonLink href="/contact">Let’s discuss your workflow</ButtonLink>
      <span className="cta-footnote">
        Real estate first. Open to good ideas in every industry.
      </span>
    </section>
  );
}

