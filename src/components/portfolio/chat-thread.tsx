import { MoreVertical, Phone, Video } from "lucide-react";

type ChatThreadProps = {
  className?: string;
  compact?: boolean;
  title?: string;
  status?: string;
  enquiry?: string;
  reply?: string;
};

export function ChatThread({
  className = "",
  compact = false,
  title = "Verenza sales",
  status = "illustrative preview",
  enquiry = "Hi",
  reply = "Hi — I’m the Verenza demo agent. What would you like to ask?",
}: ChatThreadProps) {
  return (
    <div
      className={`chat-thread ${compact ? "chat-thread--compact" : ""} ${className}`}
      aria-label="Illustrative WhatsApp sales conversation; live replies may differ"
    >
      <div className="chat-thread__bar">
        <span className="chat-thread__avatar" aria-hidden="true">
          V
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{title}</p>
          <p className="text-xs text-white/65">{status}</p>
        </div>
        <Video className="size-4 text-white/72" aria-hidden="true" />
        <Phone className="size-4 text-white/72" aria-hidden="true" />
        <MoreVertical className="size-4 text-white/72" aria-hidden="true" />
      </div>

      <div className="chat-thread__body">
        <div className="chat-bubble chat-bubble--in">
          <p>{enquiry}</p>
          <time>11:47 PM</time>
        </div>

        <div className="chat-typing" aria-label="Agent is typing">
          <span />
          <span />
          <span />
        </div>

        <div className="chat-bubble chat-bubble--out">
          <p>{reply}</p>
          <time>
            11:47 PM <span aria-label="Read">✓✓</span>
          </time>
        </div>
      </div>

      <div className="chat-thread__input">
        <span>Message</span>
        <span aria-hidden="true">→</span>
      </div>
    </div>
  );
}
