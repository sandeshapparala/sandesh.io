export type Referral = {
  headline: string;
  body: string;
  sourceId: string;
  sourceUrl: string;
  clickId: string;
};
export type Inbound = {
  kind: "inbound" | "echo";
  id: string;
  phone: string;
  name: string;
  text: string;
  timestamp: number;
  unsupported: boolean;
  referral: Referral | null;
};
export type Delivery = {
  kind: "status";
  id: string;
  phone: string;
  status: "sent" | "delivered" | "read" | "failed";
  timestamp: number;
};
export type Manual = {
  kind: "manual";
  id: string;
  phone: string;
  text: string;
  timestamp: number;
};
export type Event = Inbound | Delivery | Manual;
export type Decision = {
  reply: string;
  handoff: boolean;
  reason: string;
  summary: string;
  service: string;
  business: string;
  timeline: string;
};
export type Mode = "off" | "internal" | "public";
export type Conversation = {
  id: string;
  phone: string;
  name: string;
  preview: string;
  updatedAt: number;
  lastInboundAt: number;
  aiEnabled: boolean;
  optedOut: boolean;
  needsAttention: boolean;
  reason: string;
  summary?: string;
  service?: string;
  business?: string;
  timeline?: string;
  referral?: Referral | null;
};
export type Message = {
  id: string;
  text: string;
  direction: "inbound" | "outbound";
  timestamp: number;
  sentBy?: string;
  status?: string;
};
