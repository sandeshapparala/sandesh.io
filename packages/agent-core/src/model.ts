import "server-only";
import { safeDecision, isPricing } from "./policy";
import { systemPrompt } from "./knowledge";
import type { Message, Decision } from "./types";
export async function generateReply(
  text: string,
  history: Message[],
): Promise<Decision> {
  if (isPricing(text)) return safeDecision(null, text);
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
            temperature: 0.2,
            maxOutputTokens: 1600,
            responseMimeType: "application/json",
          },
        }),
      },
    );
    if (!response.ok) return safeDecision(null, text);
    const data = await response.json();
    const raw = data.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text || "")
      .join("");
    return safeDecision(JSON.parse(raw), text);
  } catch {
    return safeDecision(null, text);
  }
}
