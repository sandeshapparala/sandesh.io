import type { ServiceSlug } from "./site";

export type Service = {
  slug: ServiceSlug;
  eyebrow: string;
  title: string;
  cardTitle: string;
  description: string;
  whoFor: string;
  problem: {
    title: string;
    body: string[];
  };
  deliverables: {
    title: string;
    description: string;
  }[];
  steps: {
    title: string;
    description: string;
  }[];
  proof: {
    label: string;
    title: string;
    description: string;
    href: string;
    linkLabel: string;
  };
  metadata: {
    title: string;
    description: string;
  };
  featured?: boolean;
  compact?: boolean;
};

export const services: Service[] = [
  {
    slug: "whatsapp-ai-sales-agents",
    eyebrow: "Flagship service",
    title: "WhatsApp AI sales agent for real estate developers",
    cardTitle: "Turn every WhatsApp enquiry into a sales conversation.",
    description:
      "A response and qualification system on the WhatsApp number your buyers already use—built to answer in seconds, understand intent, and move the right lead toward a site visit.",
    whoFor:
      "Residential developers receiving enquiries from Meta ads, property portals, referrals, or site signage.",
    problem: {
      title: "The expensive part is the wait.",
      body: [
        "Property enquiries do not arrive on your team’s schedule. A buyer asks about availability after dinner, during a site visit, or while the sales desk is handling someone else.",
        "When the reply lands the next morning, the buyer has already spoken to other projects. The sale did not disappear because of price. The first conversation simply started elsewhere.",
      ],
    },
    deliverables: [
      {
        title: "Your existing business number",
        description:
          "The system works through WhatsApp Cloud API without asking buyers to learn a new channel.",
      },
      {
        title: "English and Telugu handling",
        description:
          "The agent follows the language of the buyer and keeps project facts consistent.",
      },
      {
        title: "Buyer qualification",
        description:
          "Budget, preferred location, villa type, purchase timeline, and intent are captured naturally.",
      },
      {
        title: "Site-visit booking",
        description:
          "Qualified buyers can move into available visit slots without waiting for a callback.",
      },
      {
        title: "Conversation dashboard",
        description:
          "Every enquiry, answer, lead score, visit status, and next action is visible to your team.",
      },
      {
        title: "Human handover rules",
        description:
          "Your sales team enters when a buyer requests a person, reaches a defined threshold, or needs an exception.",
      },
    ],
    steps: [
      {
        title: "Map the real sales conversation",
        description:
          "We capture your project facts, qualification questions, visit rules, and the moments that need a human.",
      },
      {
        title: "Connect and test the number",
        description:
          "The agent is tested against real enquiry patterns, edge cases, English, Telugu, and after-hours scenarios.",
      },
      {
        title: "Launch with a review loop",
        description:
          "Conversations are logged and reviewed so answers, qualification, and handovers improve with evidence.",
      },
    ],
    proof: {
      label: "Proof in production",
      title: "Yutha Constructions handled 500+ conversations.",
      description:
        "The agent responded in under 3 seconds, helped book 30+ site visits, and supported five villa sales in one week.",
      href: "/work/yutha-constructions",
      linkLabel: "Read the Yutha case study",
    },
    metadata: {
      title: "WhatsApp AI Sales Agent for Real Estate — Sandesh",
      description:
        "A WhatsApp AI sales agent for Indian real estate developers that replies instantly, qualifies buyers in English or Telugu, and books site visits.",
    },
    featured: true,
  },
  {
    slug: "ai-automation",
    eyebrow: "Operations and workflow",
    title: "AI automation for Indian businesses",
    cardTitle: "Move leads and operations without the copy-paste.",
    description:
      "Connect the repetitive work between enquiries, teams, CRM records, follow-ups, and reporting so information reaches the right person without waiting.",
    whoFor:
      "Growing teams that lose time to manual lead routing, status updates, recurring follow-ups, and report preparation.",
    problem: {
      title: "The workflow works—until volume arrives.",
      body: [
        "A spreadsheet is updated, a message is forwarded, a CRM field is missed, and someone has to ask for the latest status. Each step is small. Together they create delay and uncertainty.",
        "Automation should remove that coordination tax while keeping exceptions visible and people in control.",
      ],
    },
    deliverables: [
      {
        title: "Lead routing",
        description:
          "Assign enquiries by project, location, source, language, or buying intent.",
      },
      {
        title: "CRM and sheet synchronisation",
        description:
          "Keep customer and operational records aligned across the tools your team already uses.",
      },
      {
        title: "Follow-up sequences",
        description:
          "Run timely reminders with clear stop conditions when a person replies or the state changes.",
      },
      {
        title: "Operational alerts",
        description:
          "Surface failures, exceptions, and high-value events instead of hiding them inside an automation.",
      },
      {
        title: "Scheduled reporting",
        description:
          "Deliver the decision-ready summary to the people who need it, when they need it.",
      },
    ],
    steps: [
      {
        title: "Trace the delay",
        description:
          "We follow the information from trigger to outcome and identify where it is retyped, forgotten, or blocked.",
      },
      {
        title: "Build the controlled workflow",
        description:
          "APIs, business rules, and AI steps are connected with explicit fallbacks and ownership.",
      },
      {
        title: "Operate with evidence",
        description:
          "Logs, alerts, and review points make every automated action inspectable.",
      },
    ],
    proof: {
      label: "Related work",
      title: "Supporting systems need the same dependable handoffs.",
      description:
        "See the compact Megham Chocolate project note. It stays intentionally neutral until a fuller client-approved breakdown is available.",
      href: "/work/megham-chocolate",
      linkLabel: "View the Megham project note",
    },
    metadata: {
      title: "AI Automation for Indian Businesses — Sandesh",
      description:
        "AI automation for lead routing, CRM sync, follow-up sequences, operational alerts, and reporting for growing Indian businesses.",
    },
  },
  {
    slug: "ai-integration",
    eyebrow: "Product engineering",
    title: "AI and LLM integration services",
    cardTitle: "Put a reliable language-model feature inside your product.",
    description:
      "Add an AI capability to existing software with a clear input and output contract, private knowledge retrieval, evaluation, and production safeguards.",
    whoFor:
      "Product teams with working software and a specific AI feature on the roadmap—not a vague request to add AI everywhere.",
    problem: {
      title: "A model demo is not a product feature.",
      body: [
        "The first answer can look impressive while the hundredth exposes inconsistent facts, missing context, slow responses, or costs nobody measured.",
        "A production integration needs defined behaviour, representative evaluation, monitoring, and a useful failure path.",
      ],
    },
    deliverables: [
      {
        title: "Model and API integration",
        description:
          "A provider and architecture chosen for the job, latency, context, and operating constraints.",
      },
      {
        title: "Private knowledge retrieval",
        description:
          "Give the feature governed access to the documents and data needed to answer accurately.",
      },
      {
        title: "Prompt and response contracts",
        description:
          "Structured instructions and outputs that downstream product code can depend on.",
      },
      {
        title: "Evaluation set",
        description:
          "Representative cases that expose weak answers before customers do.",
      },
      {
        title: "Usage and failure monitoring",
        description:
          "Track response quality signals, latency, cost, refusals, and operational errors.",
      },
    ],
    steps: [
      {
        title: "Define the exact job",
        description:
          "We make the expected inputs, outputs, source material, constraints, and failure behaviour explicit.",
      },
      {
        title: "Build the smallest reliable path",
        description:
          "The integration is designed around a measurable user outcome rather than a broad model showcase.",
      },
      {
        title: "Evaluate before scale",
        description:
          "Test cases and production traces guide changes to retrieval, prompts, models, and UX.",
      },
    ],
    proof: {
      label: "Working demonstration",
      title: "Try a complete AI conversation, not a slide deck.",
      description:
        "The Verenza demo is a fictional villa project built to be questioned like a real buyer would.",
      href: "/work/verenza-demo",
      linkLabel: "Explore the Verenza demo",
    },
    metadata: {
      title: "AI & LLM Integration Services — Sandesh",
      description:
        "LLM integration services for existing products, including APIs, retrieval, structured outputs, evaluation, and production monitoring.",
    },
  },
  {
    slug: "web-platforms",
    eyebrow: "Supporting capability",
    title: "Next.js web platforms and commerce",
    cardTitle: "A fast, dependable web layer when the system needs one.",
    description:
      "Next.js websites, commerce experiences, and CMS-backed platforms built when the public interface is part of the larger product or automation.",
    whoFor:
      "Teams that need the software system and its customer-facing web experience to work as one.",
    problem: {
      title: "The interface still has to earn trust.",
      body: [
        "A capable backend cannot rescue a slow, unclear, or fragile customer experience.",
        "Web work is offered as a supporting engineering capability—not the homepage promise.",
      ],
    },
    deliverables: [
      {
        title: "Next.js websites",
        description:
          "Fast, accessible, responsive public experiences with production-ready metadata.",
      },
      {
        title: "Commerce and CMS integration",
        description:
          "Catalogue, content, and operational integrations shaped around the business workflow.",
      },
    ],
    steps: [
      {
        title: "Define the job",
        description:
          "Clarify the audience, conversion, content ownership, and integrations.",
      },
      {
        title: "Build the core path",
        description:
          "Design and implement the smallest complete experience around that job.",
      },
      {
        title: "Verify the real interface",
        description:
          "Test the rendered result across mobile, desktop, accessibility, and production conditions.",
      },
    ],
    proof: {
      label: "Selected work",
      title: "See the systems portfolio.",
      description:
        "Browse a client result, a working demo, and selected supporting systems work.",
      href: "/work",
      linkLabel: "View selected work",
    },
    metadata: {
      title: "Next.js Web Platforms & Commerce — Sandesh",
      description:
        "Next.js websites, commerce experiences, and CMS-backed web platforms built as part of a larger AI or automation system.",
    },
    compact: true,
  },
];

export const serviceBySlug = Object.fromEntries(
  services.map((service) => [service.slug, service]),
) as Record<ServiceSlug, Service>;
