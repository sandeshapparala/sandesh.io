/** Normalize model Markdown into WhatsApp's native text conventions. */
export function formatWhatsAppReply(value: string) {
  return value.trim()
    .replace(/\r\n?/g, "\n")
    .replace(/\*\*([^*\n]+)\*\*/g, "*$1*")
    .replace(/^#{1,6}\s+(.+)$/gm, "*$1*")
    .replace(/^[ \t]*[•▪◦][ \t]+/gm, "- ")
    .replace(/^[ \t]*\*[ \t]+(?=\S)/gm, "- ")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, "$1: $2")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n");
}

export const WELCOME_REPLY = "Hi! Welcome to sandesh.io 👋\n\nWhat would you like to automate in your business?";
export function isSimpleGreeting(value: string) {
  return /^(hi|hello|hey|good morning|good afternoon|good evening)[\s!.👋]*$/iu.test(value.trim());
}
