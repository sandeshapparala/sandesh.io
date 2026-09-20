import "server-only";
import { safeDecision, isPricing } from "./policy";
import { systemPrompt } from "./knowledge";
import type { Message, Decision } from "./types";
import { formatWhatsAppReply, isSimpleGreeting, WELCOME_REPLY } from "./whatsapp-format";
import { DEMO_REPLY, wantsDemo } from "./demo";
export async function generateReply(
  text: string,
  history: Message[],
): Promise<Decision> {
  if (isPricing(text)) return safeDecision(null, text);
  if (wantsDemo(text, history)) return safeDecision({ reply: DEMO_REPLY, handoff: false }, text);
  if (isSimpleGreeting(text) && !history.some((message) => message.direction === "outbound"))
    return safeDecision({ reply: WELCOME_REPLY, handoff: false }, text);
  const key = process.env.GEMINI_API_KEY,
    model = process.env.GEMINI_MODEL;
  if (!key || !model) return safeDecision(null, text);
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        cache: "no-store",
        signal: AbortSignal.timeout(18000),
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: JSON.stringify({
                    history: history
                      .slice(-20)
                      .map((m) => ({
                        role: m.direction,
                        text: m.text.slice(0, 1500),
                      })),
                    latestMessage: text,
                  }),
                },
              ],
            },
          ],
          generationConfig: {
            temperature: model.startsWith("gemini-3") ? 1 : 0.2,
            ...(model === "gemini-3-flash-preview"
              ? { thinkingConfig: { thinkingLevel: "minimal" } }
              : {}),
            maxOutputTokens: 1600,
            responseMimeType: "application/json",
          },
        }),
      },
    );
    if (!response.ok) return safeDecision(null, text);
    const data = await response.json();
    const raw = data.candidates?.[0]?.content?.parts
      ?.filter((p: { thought?: boolean }) => !p.thought)
      .map((p: { text?: string }) => p.text || "")
      .join("");
    const decision = safeDecision(JSON.parse(raw), text);
    return { ...decision, reply: formatWhatsAppReply(decision.reply) };
  } catch {
    return safeDecision(null, text);
  }
}
