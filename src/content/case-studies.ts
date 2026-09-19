export type CaseStudy = {
  kind: "client-project";
  evidence: "owner-reported";
  slug: string;
  name: string;
  shortName: string;
  sector: string;
  tone: string;
  title: string;
  summary: string;
  introduction: string;
  focus: string;
  period: string;
  results?: { value: string; label: string }[];
  resultsNote?: string;
};

// Owner-confirmed delivered projects. Publish measured outcomes only with evidence.
export const caseStudies: CaseStudy[] = [
  {
    kind: "client-project",
    evidence: "owner-reported",
    slug: "yutha-constructions",
    period: "March–May 2026",
    results: [
      { value: "500+", label: "Conversations handled" },
      { value: "5+", label: "Villa bookings reported" },
      { value: "2 sec", label: "Reported response time" },
    ],
    resultsNote:
      "Results reported by Sandesh on 18 September 2026. Measurement dates and response-time methodology are not specified. Villa bookings are a reported business outcome, not a claim that the agent alone caused them.",
    name: "Yutha Constructions",
    shortName: "Yutha",
    sector: "Real estate",
    tone: "sage",
    title: "A more useful first conversation with a potential buyer.",
    summary:
      "A WhatsApp AI agent for property enquiries and the next step in the sales conversation.",
    introduction:
      "I built a WhatsApp AI agent for Yutha Constructions. The project brings AI into conversations between prospective buyers and a real estate business, with a focus on answering enquiries and supporting the next step in the sales process.",
    focus: "Property enquiries and sales conversations",
  },
  {
    kind: "client-project",
    evidence: "owner-reported",
    slug: "sharada-constructions",
    period: "August 2026",
    name: "Sharada Constructions",
    shortName: "Sharada",
    sector: "Construction",
    tone: "lavender",
    title: "Helping construction enquiries find the right next step.",
    summary:
      "A WhatsApp AI agent built around construction services and customer requirements.",
    introduction:
      "I built a WhatsApp AI agent for Sharada Constructions. The project applies AI to a construction company’s enquiries, where understanding the customer’s requirement and representing the company’s services accurately are central to a useful conversation.",
    focus: "Service information and customer requirements",
  },
  {
    kind: "client-project",
    evidence: "owner-reported",
    slug: "tungabhadra-developers",
    period: "July 2026",
    results: [
      { value: "500+", label: "Conversations in one week" },
      { value: "2 sec", label: "Reported response time" },
    ],
    resultsNote:
      "Results reported by Sandesh on 18 September 2026. The specific week and response-time methodology are not specified. Sandesh also reports 100% accurate replies; an evaluation sample and accuracy definition have not been supplied. This is not an independently verified accuracy score or a guarantee of future replies.",
    name: "Tungabhadra Developers",
    shortName: "Tungabhadra",
    sector: "Real estate · Sringeri",
    tone: "peach",
    title: "Bringing project knowledge into the buyer’s conversation.",
    summary:
      "A WhatsApp AI agent for a property business in Sringeri and its interested buyers.",
    introduction:
      "I built a WhatsApp AI agent for Tungabhadra Developers, Sringeri. The project centres on property conversations, using the business’s project information and an agreed process for handling interested buyers.",
    focus: "Project information and property enquiries",
  },
];
