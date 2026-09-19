export const businessTypes = [
  "Real estate",
  "Construction",
  "Retail / Ecommerce",
  "Professional services",
  "Other",
] as const;
export const requirements = [
  "WhatsApp AI agent",
  "Custom AI workflow",
  "Existing agent improvements",
  "Business website",
  "Ecommerce website",
] as const;
export const volumes = [
  "Not sure",
  "Under 100",
  "100–500",
  "500–2,000",
  "More than 2,000",
] as const;

export function parseEnquiry(input: unknown) {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new Error("Invalid form.");
  const data = input as Record<string, unknown>;
  function field(key: string, max: number, required = true) {
    const raw = data[key];
    if (raw === undefined && !required) return "";
    if (typeof raw !== "string" || raw.length > max)
      throw new Error(`Please check ${key}.`);
    const value = raw.trim();
    if (
      (required && !value) ||
      /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)
    )
      throw new Error(`Please check ${key}.`);
    return value;
  }
  const submissionId = field("submissionId", 36);
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      submissionId,
    )
  )
    throw new Error("Please refresh the form and try again.");
  const email = field("email", 150).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("Please enter a valid email address.");
  const type = field("type", 40);
  const requirement = field("requirement", 50);
  const volume = field("volume", 30);
  if (
    !(businessTypes as readonly string[]).includes(type) ||
    !(requirements as readonly string[]).includes(requirement) ||
    !(volumes as readonly string[]).includes(volume)
  )
    throw new Error("Please select a listed option.");
  if (field("website", 200, false))
    throw new Error("Unable to accept this enquiry.");
  return {
    submissionId,
    name: field("name", 80),
    company: field("company", 100),
    email,
    type,
    requirement,
    volume,
    current: field("current", 450, false),
    goal: field("goal", 450),
  };
}
export type Enquiry = ReturnType<typeof parseEnquiry>;
