export type Service = {
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  accent: string;
  intro: string;
  summary: string;
  fit: string;
  kind: "agent" | "integration" | "website" | "ecommerce";
  features: { title: string; text: string }[];
  questions: { question: string; answer: string }[];
};
export const services: Service[] = [
  {
    slug: "whatsapp-ai-agents",
    title: "AI Agent Development",
    eyebrow: "Better conversations, from the first hello",
    headline: "Your next enquiry.",
    accent: "Already moving forward.",
    kind: "agent",
    summary:
      "Agents that answer, qualify, and help your team take the next step.",
    intro:
      "WhatsApp AI agents built around your business information, your customers, and the way your team works. Real estate first. Other useful applications welcome.",
    fit: "For teams answering the same questions, following up on enquiries, and coordinating the next conversation by hand.",
    features: [
      {
        title: "Answers with context",
        text: "An agent grounded in the project details, services, and policies you approve.",
      },
      {
        title: "Natural lead qualification",
        text: "Collect requirements, budget, and buying timeline through a useful conversation.",
      },
      {
        title: "A clear next step",
        text: "Site-visit requests and team handoffs that follow your availability and confirmation rules.",
      },
      {
        title: "Room to improve",
        text: "Review conversations and refine the agent through a separately scoped management plan.",
      },
    ],
    questions: [
      {
        question: "Can the agent work beyond real estate?",
        answer:
          "Yes. We start with your workflow and decide whether an agent is the right fit. Scope depends on the information, systems, and human oversight available.",
      },
      {
        question: "Will it replace my sales team?",
        answer:
          "The agent handles the agreed parts of the conversation and passes context to your team when a person is needed. Handoff rules are defined before launch.",
      },
      {
        question: "What is included in the quote?",
        answer:
          "Implementation, ongoing management, and third-party usage are listed separately. Integrations and supported conversation paths are agreed during scoping.",
      },
    ],
  },
  {
    slug: "ai-workflow-integration",
    title: "AI Workflow Integration",
    eyebrow: "Less copying. More continuity.",
    headline: "Connect the work.",
    accent: "Keep things moving.",
    kind: "integration",
    summary:
      "Bring AI into the tools and processes your business already uses.",
    intro:
      "Turn disconnected tasks into a clear workflow. I map where information starts, what AI should help with, and where a person needs to stay in control.",
    fit: "For businesses moving information between conversations, forms, spreadsheets, and internal tools—and losing time along the way.",
    features: [
      {
        title: "Map the handoffs",
        text: "Find the repeated steps and decide which connections will make a practical difference.",
      },
      {
        title: "Connect your systems",
        text: "Scope connections to available APIs, forms, or business tools after checking access and feasibility.",
      },
      {
        title: "Keep approvals in place",
        text: "Define validation, exception handling, and the decisions that need a human review.",
      },
      {
        title: "Make it maintainable",
        text: "Document the flow and agree how changes, failures, and ongoing support will be handled.",
      },
    ],
    questions: [
      {
        question: "Can you connect my existing software?",
        answer:
          "I review API availability, permissions, data requirements, and costs first. A connection is included only after its feasibility is confirmed.",
      },
      {
        question: "Do all steps need AI?",
        answer:
          "No. Predictable rules often work better for simple tasks. AI is used where interpreting information or handling language adds value.",
      },
      {
        question: "Is there a separate integration case study?",
        answer:
          "The portfolio currently shows delivered AI-agent projects as related experience. Standalone integration case studies will be added when their scope and supporting material are ready.",
      },
    ],
  },
  {
    slug: "website-development",
    title: "Website Development",
    eyebrow: "A better first impression",
    headline: "A website that feels",
    accent: "like your business.",
    kind: "website",
    summary:
      "Clear, considered business websites that turn interest into enquiries.",
    intro:
      "From real estate and architecture to interiors and independent brands. I build websites that make your offer easy to understand and your next step easy to find.",
    fit: "For businesses whose website no longer reflects the quality of their work—or makes customers work too hard to understand it.",
    features: [
      {
        title: "Structure before decoration",
        text: "Organise your services, story, and proof around what visitors need to know.",
      },
      {
        title: "Design with character",
        text: "A responsive visual system with considered typography, spacing, and purposeful motion.",
      },
      {
        title: "A clear path to enquire",
        text: "Contact points and enquiry journeys shaped around the way your business responds.",
      },
      {
        title: "A considered handover",
        text: "Agree content updates, technical ownership, and any ongoing support before launch.",
      },
    ],
    questions: [
      {
        question: "Can you replace an existing website?",
        answer:
          "Yes. We review the useful content, existing URLs, and business priorities before planning the replacement and launch.",
      },
      {
        question: "Can you help organise the copy?",
        answer:
          "Yes. Content structure and page copy can be included in the scope, with business facts and final wording approved by you.",
      },
      {
        question: "Will the website work on phones?",
        answer:
          "Responsive layouts and accessible navigation are part of the build. The agreed pages and interactions are checked across desktop and mobile sizes.",
      },
    ],
  },
  {
    slug: "ecommerce-development",
    title: "Ecommerce Development",
    eyebrow: "From discovering to choosing",
    headline: "Make your products",
    accent: "a pleasure to explore.",
    kind: "ecommerce",
    summary:
      "Shopping experiences built around your products and the people buying them.",
    intro:
      "A considered storefront brings your brand, catalogue, and purchase journey together. We define the selling requirements before choosing the platform and integrations.",
    fit: "For product brands that need a thoughtful shopping experience and a store their team can operate with confidence.",
    features: [
      {
        title: "Product-led design",
        text: "Collections and product pages that help shoppers understand and compare your offer.",
      },
      {
        title: "A connected purchase journey",
        text: "Scope cart, checkout, payments, and delivery requirements around the chosen platform.",
      },
      {
        title: "Business rules, considered",
        text: "Clarify variants, stock, shipping, taxes, and promotional requirements before development.",
      },
      {
        title: "Prepare for launch",
        text: "Test the agreed buying journeys and plan catalogue updates and ongoing support.",
      },
    ],
    questions: [
      {
        question: "Which ecommerce platform do you use?",
        answer:
          "The choice follows your catalogue, operations, budget, and integration requirements. The platform and ongoing costs are agreed before implementation.",
      },
      {
        question: "Can you migrate an existing store?",
        answer:
          "Migration can be scoped after reviewing the current data, URLs, platform, and order-history requirements.",
      },
      {
        question: "Is RYT Club live?",
        answer:
          "RYT Club is an ongoing project. It is shown as work in progress, rather than as a completed launch.",
      },
    ],
  },
];
