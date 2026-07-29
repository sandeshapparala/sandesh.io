import type { WorkSlug } from "./site";

export type WorkItem = {
  slug: WorkSlug;
  eyebrow: string;
  title: string;
  cardTitle: string;
  description: string;
  kind: "case-study" | "demo" | "project-note";
  facts: { value: string; label: string }[];
  sections: {
    label: string;
    title: string;
    body: string[];
  }[];
  capabilities: string[];
  cta: {
    title: string;
    description: string;
    href: string;
    label: string;
  };
  metadata: {
    title: string;
    description: string;
  };
};

export const workItems: WorkItem[] = [
  {
    slug: "yutha-constructions",
    eyebrow: "Yutha Constructions · Vijayawada",
    title:
      "How Yutha Constructions sold 5 villas in one week with a WhatsApp AI agent",
    cardTitle: "From after-hours enquiries to booked site visits.",
    description:
      "A residential developer was running Meta ads into WhatsApp. Leads arrived around the clock; the sales team often entered the conversation the next morning. The response system changed that first mile.",
    kind: "case-study",
    facts: [
      { value: "500+", label: "conversations" },
      { value: "30+", label: "site visits" },
      { value: "5", label: "villas sold" },
      { value: "<3 sec", label: "response time" },
      { value: "1 week", label: "sales window" },
    ],
    sections: [
      {
        label: "01 · Situation",
        title: "The ads were working. The response window was not.",
        body: [
          "Yutha Constructions was generating buyer enquiries through Meta ads connected to a WhatsApp number. Those enquiries did not respect office hours.",
          "When a lead arrived late, the team could only continue the next morning. By then, that buyer could already be speaking with several competing projects.",
        ],
      },
      {
        label: "02 · What was built",
        title: "A sales agent on the number buyers already used.",
        body: [
          "The agent answered project questions, qualified budget and buying intent, guided suitable buyers toward a site visit, and handed the conversation to the sales team when a person was needed.",
          "Every conversation and qualification signal was logged in Firebase so the team could see the lead, the context, and the next action instead of starting from a blank chat.",
        ],
      },
      {
        label: "03 · Operating model",
        title: "Automation handled speed. People kept control.",
        body: [
          "The system did not replace the sales team. It protected the first response, collected the context a salesperson needs, and made the handoff explicit.",
          "That division matters: the agent is available every minute; the team concentrates on visits, negotiation, exceptions, and the relationships that close a property sale.",
        ],
      },
    ],
    capabilities: [
      "WhatsApp Cloud API",
      "English and Telugu handling",
      "Lead qualification",
      "Site-visit booking",
      "Firebase conversation logging",
      "Human handover rules",
    ],
    cta: {
      title: "Try the same first response on the demo number.",
      description:
        "Message the fictional Verenza villa project and test the conversation like a real buyer.",
      href: "https://wa.me/918331837887?text=Hi",
      label: "Try the demo agent",
    },
    metadata: {
      title:
        "How Yutha Constructions Sold 5 Villas in One Week with a WhatsApp AI Agent",
      description:
        "Yutha Constructions used a WhatsApp AI sales agent to handle 500+ conversations, support 30+ site visits, and reduce response time to under 3 seconds.",
    },
  },
  {
    slug: "verenza-demo",
    eyebrow: "Live demo · Fictional villa project",
    title: "Verenza is the sales agent you are allowed to test.",
    cardTitle: "Open WhatsApp and test the conversation yourself.",
    description:
      "Verenza is a fictional residential project with a working WhatsApp sales conversation. Send “Hi,” continue naturally, and judge the live experience for yourself.",
    kind: "demo",
    facts: [],
    sections: [
      {
        label: "01 · What this is",
        title: "A safe place to test the behaviour, not a scripted video.",
        body: [
          "The project is fictional so you can explore the conversation without exposing a client’s live inventory, buyer data, or sales process.",
          "The interaction demonstrates the response pattern: answer the question, understand the buyer, collect useful context, and move toward a visit when there is a fit.",
        ],
      },
      {
        label: "02 · What to try",
        title: "Talk to it like a real buyer.",
        body: [
          "Open WhatsApp, send “Hi,” and continue the conversation naturally. The project is fictional, so it can be tested without exposing a client’s live inventory or buyer data.",
          "The page does not promise a scripted set of answers. The live conversation is the experience to evaluate.",
        ],
      },
      {
        label: "03 · What it proves",
        title: "The product is the conversation.",
        body: [
          "A presentation can describe response speed and qualification. The demo lets you experience both on the channel your leads already use.",
        ],
      },
    ],
    capabilities: [
      "Working WhatsApp demo",
      "Fictional project",
      "Pre-filled “Hi”",
      "No client buyer data",
    ],
    cta: {
      title: "Open WhatsApp and try it now.",
      description:
        "The message is pre-filled with “Hi.” Continue with any property question.",
      href: "https://wa.me/918331837887?text=Hi",
      label: "Message the Verenza demo",
    },
    metadata: {
      title: "Verenza WhatsApp AI Sales Agent Demo — Sandesh",
      description:
        "Try a working WhatsApp AI sales-agent conversation for a fictional villa project, including qualification and site-visit intent.",
    },
  },
  {
    slug: "megham-chocolate",
    eyebrow: "Megham Chocolate · Project note",
    title: "Megham Chocolate.",
    cardTitle: "Selected systems work for a consumer brand.",
    description:
      "A concise note from Sandesh’s supporting systems portfolio. Client workflow details, internal operating data, and commercial outcomes remain private.",
    kind: "project-note",
    facts: [],
    sections: [
      {
        label: "01 · Context",
        title: "A supporting systems engagement.",
        body: [
          "Megham Chocolate is included as selected work beyond the residential-sales focus of this portfolio. It is presented as a concise project note.",
        ],
      },
      {
        label: "02 · Scope boundary",
        title: "Client operations stay private.",
        body: [
          "This public note does not disclose the client’s workflow, connected systems, operating metrics, or commercial outcomes.",
        ],
      },
      {
        label: "03 · Related capability",
        title: "The portfolio category is AI automation.",
        body: [
          "The AI automation service page explains Sandesh’s broader approach to routing information, connecting systems, and handling workflow exceptions separately from this client note.",
        ],
      },
    ],
    capabilities: [
      "Selected systems work",
      "Client privacy respected",
      "No public outcome data",
      "Related AI automation capability",
    ],
    cta: {
      title: "Need a business workflow connected?",
      description:
        "See how AI automation can route information, keep systems aligned, and surface exceptions.",
      href: "/services/ai-automation",
      label: "Explore AI automation",
    },
    metadata: {
      title: "Megham Chocolate Project Note — Sandesh",
      description:
        "A concise note for selected systems work with Megham Chocolate.",
    },
  },
];

export const workBySlug = Object.fromEntries(
  workItems.map((item) => [item.slug, item]),
) as Record<WorkSlug, WorkItem>;
