export const faqs = [
  {
    question: "Do you only work with real estate businesses?",
    answer:
      "Real estate and construction are my primary focus. I also build custom AI workflows for other businesses when there is a clear use case and the information needed to support it.",
  },
  {
    question: "Can the agent connect to our existing tools?",
    answer:
      "I review your systems during scoping and define the integrations your workflow needs. Feasibility and access requirements are confirmed before implementation.",
  },
  {
    question: "What happens after the agent goes live?",
    answer:
      "You can choose a scoped monthly management plan covering conversation reviews, approved knowledge updates, issue investigation, and an agreed improvement allowance.",
  },
  {
    question: "Can a person take over the conversation?",
    answer:
      "Human handoff is part of the workflow we define together. We agree which conversations need a person, how the team receives them, and what information should accompany the handoff.",
  },
  {
    question: "What does a project cost?",
    answer:
      "I quote after understanding your workflow, integrations, expected volume, and support needs. Implementation, ongoing management, and third-party usage are priced separately, so the scope is clear.",
  },
];

export const workflowSteps = [
  {
    id: "answer",
    label: "Answer",
    title: "A helpful answer. A better beginning.",
    description:
      "Give buyers a useful first response, grounded in your approved project information. Help them find what matters without waiting for a callback.",
    question: "Hi! I’m looking for a 3 BHK. Can you help?",
    reply:
      "Of course. I can help with project details and your requirements. Are you looking for a home to move into, or an investment?",
    response: "A home for my family. We’re planning to move next year.",
    recordTitle: "A conversation with context",
    recordLabel: "Enquiry captured",
    fields: [
      ["Interest", "3 BHK home"],
      ["Purpose", "Family home"],
      ["Timeline", "Next year"],
    ],
    note: "A useful starting point for the next question.",
  },
  {
    id: "qualify",
    label: "Qualify",
    title: "Get to know the person behind the enquiry.",
    description:
      "Collect the details your sales team actually needs, naturally within the conversation: requirements, budget, location, and buying timeline.",
    question: "We need three bedrooms and a budget around ₹80 lakh.",
    reply:
      "Thank you. I’ll note that for the team. Is there a preferred location, and when are you hoping to make a decision?",
    response: "Near the city, within the next three months.",
    recordTitle: "The essentials, in one place",
    recordLabel: "Requirements captured",
    fields: [
      ["Requirement", "3 bedrooms"],
      ["Budget", "Around ₹80 lakh"],
      ["Decision", "Within 3 months"],
    ],
    note: "Your team starts the follow-up with context.",
  },
  {
    id: "coordinate",
    label: "Coordinate",
    title: "Turn interest into a clear next step.",
    description:
      "Help interested buyers request a site visit. Match the booking process to your team’s availability and confirmation rules.",
    question: "Could we visit the property this Saturday?",
    reply:
      "I can help arrange that. Would morning or afternoon work better for you? The team will confirm availability.",
    response: "Saturday morning would be great.",
    recordTitle: "A visit worth following up",
    recordLabel: "Visit requested",
    fields: [
      ["Preferred day", "Saturday"],
      ["Preferred time", "Morning"],
      ["Status", "Awaiting team confirmation"],
    ],
    note: "A request is only confirmed when your booking rules allow it.",
  },
  {
    id: "handoff",
    label: "Handoff",
    title: "Let your team take it from here.",
    description:
      "When a conversation needs a person, pass along the requirements and next action. Give your team the context to pick up where the agent left off.",
    question: "Can I speak with someone about the payment options?",
    reply:
      "Absolutely. I’ll pass your question and requirements to the sales team so they can help with the details.",
    response: "Thank you. An afternoon call works for me.",
    recordTitle: "Ready for a human touch",
    recordLabel: "Team follow-up needed",
    fields: [
      ["Topic", "Payment options"],
      ["Preference", "Afternoon call"],
      ["Next step", "Sales team follow-up"],
    ],
    note: "One clear handoff, with the conversation attached.",
  },
];
