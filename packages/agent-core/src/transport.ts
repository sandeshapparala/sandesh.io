import "server-only";
export class SendFailure extends Error {
  constructor(public uncertain: boolean) {
    super(uncertain ? "Delivery outcome unknown" : "Provider rejected message");
  }
}
export async function sendText(phone: string, text: string) {
  const provider = process.env.WHATSAPP_TRANSPORT || "meta";
  const token =
    provider === "dualhook"
      ? process.env.DUALHOOK_API_KEY
      : process.env.WHATSAPP_ACCESS_TOKEN;
  const version = process.env.WHATSAPP_GRAPH_API_VERSION,
    number = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (
    !["meta", "dualhook"].includes(provider) ||
    !token ||
    !/^v\d+\.\d+$/.test(version || "") ||
    !/^\d+$/.test(number || "")
  )
    throw new SendFailure(false);
  let response: Response;
  try {
    response = await fetch(
      `https://${provider === "dualhook" ? "api.dualhook.com" : "graph.facebook.com"}/${version}/${number}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: phone,
          type: "text",
          text: { preview_url: false, body: text },
        }),
        signal: AbortSignal.timeout(12000),
        cache: "no-store",
      },
    );
  } catch {
    throw new SendFailure(true);
  }
  if (!response.ok) throw new SendFailure(response.status >= 500);
  const data = await response.json().catch(() => null);
  const id = data?.messages?.[0]?.id;
  if (typeof id !== "string") throw new SendFailure(true);
  return id;
}
