import Image from "next/image";
import {
  ArrowUpRight,
  MessageSquareText,
  FileCheck2,
  RefreshCw,
} from "lucide-react";
import { TextLink } from "@/components/ui/links";

const careSteps = [
  {
    label: "Listen to the conversations.",
    detail:
      "Review how the agent answers, where customers get stuck, and when your team needs to step in.",
    icon: MessageSquareText,
    caption: "Conversation reviews",
  },
  {
    label: "Keep the knowledge current.",
    detail:
      "Bring approved changes in your business information into the answers your customers receive.",
    icon: FileCheck2,
    caption: "Knowledge updates",
  },
  {
    label: "Make the next version better.",
    detail:
      "Use a defined monthly allowance for fixes and refinements, with a clear report of what changed.",
    icon: RefreshCw,
    caption: "Scoped improvements",
  },
];

export function AgentCare() {
  return (
    <section className="agent-care container" aria-labelledby="care-title">
      <div className="care-heading">
        <span className="eyebrow">Built for the long run</span>
        <h2 id="care-title">
          Your business moves forward.
          <br />
          <span className="serif">Your agent should, too.</span>
        </h2>
        <p>
          Launch is a starting point. I stay involved to keep the conversations
          useful and the information up to date.
        </p>
      </div>
      <div className="care-surface">
        <div className="care-topline">
          <span>
            <span className="care-dot" /> A rhythm of ongoing care
          </span>
          <span>Review. Refresh. Refine.</span>
        </div>
        <div className="care-rail">
          {careSteps.map((step, index) => (
            <article className="care-step" key={step.caption}>
              <div className="care-step-marker">
                <span>0{index + 1}</span>
                <step.icon size={23} strokeWidth={1.5} />
              </div>
              <h3>{step.label}</h3>
              <p>{step.detail}</p>
              <span className="care-caption">{step.caption}</span>
            </article>
          ))}
        </div>
        <div className="care-bottom">
          <p>
            A clear monthly scope.
            <br />
            <strong>Personal attention after launch.</strong>
          </p>
          <TextLink href="/services/agent-management">
            Explore ongoing management
          </TextLink>
        </div>
      </div>
    </section>
  );
}

export function PersonalNote() {
  return (
    <section
      className="personal-note container"
      aria-labelledby="personal-title"
    >
      <div className="personal-topline">
        <span className="eyebrow">The person behind the build</span>
        <span>Independent engineer · Direct collaboration</span>
      </div>
      <div className="personal-composition">
        <div className="personal-portrait">
          <Image
            src="/portrait/sandesh-apparala.png"
            alt="Sandesh Apparala"
            width={910}
            height={910}
            sizes="(max-width: 560px) 160px, 260px"
          />
          <span className="personal-name">
            Sandesh Apparala<small>AI Agent Engineer</small>
          </span>
        </div>
        <div className="personal-letter">
          <h2 id="personal-title">
            Hi, I’m Sandesh.
            <br />
            <span className="serif">I make AI useful.</span>
          </h2>
          <p>
            I’m an independent AI agent engineer. I build WhatsApp agents and
            the websites, integrations, and workflows around them.
          </p>
          <p>
            You work directly with me—from understanding the first enquiry to
            improving the conversations after launch.
          </p>
          <a className="personal-link" href="/about">
            <span>A little more about me</span>
            <ArrowUpRight size={21} />
          </a>
        </div>
      </div>
    </section>
  );
}
