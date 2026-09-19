export const processSteps = [
  {
    id: "understand",
    title: "Understand",
    summary: "Start with your business. And the conversations that matter.",
    description:
      "We map your enquiries, your information, and the next step a useful conversation should lead to.",
    points: [
      "Review the questions customers ask",
      "Organise your business knowledge",
      "Agree on scope and human handoffs",
    ],
    visualTitle: "A clear starting point",
    visualLabel: "Your business, mapped",
    tags: ["Enquiries", "Knowledge", "Next steps"],
  },
  {
    id: "build",
    title: "Build",
    summary: "An agent shaped around the way your business works.",
    description:
      "I build the conversation flow, connect the agreed tools, and test how the agent handles real-world questions.",
    points: [
      "Design the conversation flow",
      "Connect your agreed tools",
      "Test answers and edge cases",
    ],
    visualTitle: "Everything, connected",
    visualLabel: "Built for your workflow",
    tags: ["WhatsApp", "AI agent", "Your team"],
  },
  {
    id: "launch",
    title: "Launch",
    summary: "Test together. Refine the details. Then go live.",
    description:
      "You review the experience before launch. We check the answers, handoffs, and boundaries together.",
    points: [
      "Review example conversations",
      "Confirm the escalation process",
      "Launch with a clear handover",
    ],
    visualTitle: "Ready when you are",
    visualLabel: "A considered launch",
    tags: ["Review", "Approve", "Go live"],
  },
  {
    id: "improve",
    title: "Improve",
    summary: "Keep your agent useful as your business moves forward.",
    description:
      "With monthly management, I review conversations and make scoped improvements as your information and needs evolve.",
    points: [
      "Review conversation quality",
      "Keep business information current",
      "Make scoped monthly improvements",
    ],
    visualTitle: "Better, over time",
    visualLabel: "Ongoing management",
    tags: ["Review", "Update", "Refine"],
  },
] as const;
