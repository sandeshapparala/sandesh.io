"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  Inbox as InboxIcon,
  Search,
  ArrowLeft,
  Send,
  Pause,
  Play,
  LogOut,
  RefreshCw,
  Settings,
} from "lucide-react";
import type { Conversation, Message, Mode } from "@sandesh/agent-core/types";
type Enquiry = {
  id: string;
  name?: string;
  company?: string;
  email?: string;
  type?: string;
  requirement?: string;
  goal?: string;
};
const quickReplies = [
  "What would you like an AI agent to handle for your business?",
  "Could you share how your team currently manages incoming enquiries?",
  "Sandesh will discuss the scope and pricing with you personally. What would you like the agent to handle for your business?",
];
async function request(url: string, init?: RequestInit) {
  const response = await fetch(url, { ...init, cache: "no-store" });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}
const time = (value: number) =>
  new Date(value).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
export function Inbox() {
  const router = useRouter(),
    [view, setView] = useState<"whatsapp" | "enquiries" | "settings">("whatsapp");
  const [items, setItems] = useState<Conversation[]>([]),
    [enquiries, setEnquiries] = useState<Enquiry[]>([]),
    [selected, setSelected] = useState<Conversation | null>(null),
    [messages, setMessages] = useState<Message[]>([]);
  const [mode, setMode] = useState<Mode>("off"),
    [query, setQuery] = useState(""),
    [text, setText] = useState(""),
    [notice, setNotice] = useState(""),
    [busy, setBusy] = useState(false),
    [loaded, setLoaded] = useState(false),
    [next, setNext] = useState<string | null>(null),
    [older, setOlder] = useState<string | null>(null);
  const [now, setNow] = useState(0);
  const activeId = useRef<string | null>(null),
    replyRequest = useRef<{
      id: string;
      text: string;
      requestId: string;
    } | null>(null);
  const expandedList = useRef(false),
    expandedHistory = useRef(false);
  const messageList = useRef<HTMLDivElement>(null);
  const stickToBottom = useRef(true);
  const previousHeight = useRef<number | null>(null);
  useLayoutEffect(() => {
    const panel = messageList.current;
    if (!panel) return;
    if (previousHeight.current !== null) {
      panel.scrollTop += panel.scrollHeight - previousHeight.current;
      previousHeight.current = null;
    } else if (stickToBottom.current) panel.scrollTop = panel.scrollHeight;
  }, [messages, view]);
  const load = useCallback(async () => {
    try {
      const data = await request("/api/admin/inbox");
      setNow(Date.now());
      setItems((old) =>
        expandedList.current
          ? [
              ...data.items,
              ...old.filter(
                (c) =>
                  !data.items.some((fresh: Conversation) => fresh.id === c.id),
              ),
            ]
          : data.items,
      );
      setMode(data.mode);
      if (!expandedList.current) setNext(data.next);
      setLoaded(true);
    } catch (e) {
      setNotice((e as Error).message);
    }
  }, []);
  useEffect(() => {
    let live = true;
    const refresh = () => {
      if (live && document.visibilityState === "visible") void load();
    };
    refresh();
    const interval = setInterval(refresh, 15000);
    return () => {
      live = false;
      clearInterval(interval);
    };
  }, [load]);
  const open = useCallback(async (id: string) => {
    const changed = activeId.current !== id;
    if (changed) expandedHistory.current = false;
    activeId.current = id;
    try {
      const data = await request(`/api/admin/inbox?id=${id}`);
      if (activeId.current !== id) return;
      setSelected(data.conversation);
      setMessages((old) =>
        changed
          ? data.messages
          : [
              ...old.filter(
                (m) =>
                  !data.messages.some((fresh: Message) => fresh.id === m.id),
              ),
              ...data.messages,
            ].sort((a, b) => a.timestamp - b.timestamp),
      );
      if (!expandedHistory.current) setOlder(data.next);
    } catch (e) {
      setNotice((e as Error).message);
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeId.current && document.visibilityState === "visible")
        void open(activeId.current);
    }, 10000);
    return () => clearInterval(interval);
  }, [open]);
  async function action(data: Record<string, unknown>) {
    setBusy(true);
    setNotice("");
    try {
      const result = await request("/api/admin/inbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setNotice(result.notice || "Saved.");
      await load();
      if (activeId.current) await open(activeId.current);
      return true;
    } catch (e) {
      setNotice((e as Error).message);
      return false;
    } finally {
      setBusy(false);
    }
  }
  async function send(event: React.FormEvent) {
    event.preventDefault();
    if (!selected || !text.trim()) return;
    if (
      !replyRequest.current ||
      replyRequest.current.id !== selected.id ||
      replyRequest.current.text !== text
    )
      replyRequest.current = {
        id: selected.id,
        text,
        requestId: crypto.randomUUID(),
      };
    if (await action({ action: "reply", ...replyRequest.current })) {
      setText("");
      replyRequest.current = null;
    }
  }
  async function changeView(value: "whatsapp" | "enquiries" | "settings") {
    setView(value);
    if (value === "enquiries")
      try {
        setEnquiries((await request("/api/admin/inbox?view=enquiries")).items);
      } catch (e) {
        setNotice((e as Error).message);
      }
  }
  const visible = items.filter((c) =>
    `${c.name} ${c.phone} ${c.preview}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const canReply =
    selected &&
    !selected.optedOut &&
    mode !== "off" &&
    now - selected.lastInboundAt < 86400000;
  return (
    <div className="inbox-shell">
      <aside className="inbox-rail">
        <a href="/admin" className="inbox-brand">
          s<span>.</span>
        </a>
        <button
          title="WhatsApp"
          aria-label="WhatsApp conversations"
          aria-pressed={view === "whatsapp"}
          onClick={() => void changeView("whatsapp")}
        >
          <MessageSquare />
        </button>
        <button
          title="Website enquiries"
          aria-label="Website enquiries"
          aria-pressed={view === "enquiries"}
          onClick={() => void changeView("enquiries")}
        >
          <InboxIcon />
        </button>
        <button
          title="Agent settings"
          aria-label="Agent settings"
          aria-pressed={view === "settings"}
          onClick={() => void changeView("settings")}
        >
          <Settings />
        </button>
        <button
          className="logout"
          title="Sign out"
          aria-label="Sign out"
          onClick={async () => {
            await fetch("/api/admin/session", { method: "DELETE" });
            router.refresh();
          }}
        >
          <LogOut />
        </button>
      </aside>
      <div className="inbox-body">
        <header className="inbox-top">
          <div>
            <p className="admin-eyebrow">YOUR CONVERSATION WORKSPACE</p>
            <h1>
              {view === "whatsapp" ? "WhatsApp inbox" : view === "settings" ? "Agent settings" : "Website enquiries"}
            </h1>
          </div>
          <label className="mode-control">
            Agent mode
            <select
              value={mode}
              disabled={busy || !loaded}
              onChange={(e) =>
                void action({ action: "mode", mode: e.target.value })
              }
            >
              <option value="off">Off · no sends</option>
              <option value="internal">Internal testing</option>
              <option value="public">Public · live replies</option>
            </select>
          </label>
        </header>
        <p className="inbox-notice" role="status">
          {notice ||
            "Pricing stays private. Human takeover pauses automatic replies."}
        </p>
        {view === "settings" ? (
          <section className="agent-settings" aria-label="AI system settings">
            <div className="settings-heading"><p className="admin-eyebrow">AUTOMATION CONTROLS</p><h2>Your agent. Your control.</h2><p>Choose who receives automatic replies. Changes apply immediately to new replies, including work waiting to be sent.</p></div>
            <div className="settings-switch-row"><div><h3>AI system</h3><p>{!loaded ? "Loading current settings…" : mode === "off" ? "Disabled. Incoming messages are still collected. All outgoing sends are paused." : mode === "internal" ? "Enabled for configured test numbers only." : "Enabled for incoming WhatsApp enquiries."}</p></div><button className="agent-switch" role="switch" aria-label="Enable AI system" aria-checked={mode !== "off"} disabled={busy || !loaded} onClick={() => void action({ action: "mode", mode: mode === "off" ? "public" : "off" })}><span /></button></div>
            <fieldset className="mode-options" disabled={busy || !loaded}><legend>Reply access</legend>{([
              ["off", "Off", "Collect enquiries without sending replies."],
              ["internal", "Internal testing", "Reply only to AGENT_TEST_NUMBERS configured in the agent deployment."],
              ["public", "Public", "Reply to incoming enquiries within the WhatsApp messaging window."],
            ] as const).map(([value, title, description]) => <label key={value}><input type="radio" name="agent-access" value={value} checked={mode === value} onChange={() => void action({ action: "mode", mode: value })} /><span><strong>{title}</strong><small>{description}</small></span></label>)}</fieldset>
            <div className="settings-note"><h3>Human control stays in place</h3><p>Use “Take over” inside a conversation to pause its automatic replies. Enabling the system does not resume paused or opted-out conversations, or resend old skipped messages.</p><p>Pricing stays private. Commercial questions are handed to Sandesh.</p></div>
          </section>
        ) : view === "enquiries" ? (
          <section className="enquiry-grid">
            {enquiries.length ? (
              enquiries.map((e) => (
                <article key={e.id}>
                  <p className="admin-eyebrow">{e.type || "NEW ENQUIRY"}</p>
                  <h2>{e.name}</h2>
                  <p>{e.company}</p>
                  <a href={`mailto:${e.email}`}>{e.email}</a>
                  <p>{e.requirement}</p>
                  <p>{e.goal}</p>
                  <small>{e.id}</small>
                </article>
              ))
            ) : (
              <div className="inbox-empty">
                <InboxIcon />
                <h2>No enquiries to show</h2>
                <p>Website submissions will appear here.</p>
              </div>
            )}
          </section>
        ) : (
          <div className={`inbox-columns ${selected ? "has-selection" : ""}`}>
            <section className="conversation-list">
              <div className="inbox-search">
                <Search size={17} />
                <input
                  aria-label="Search loaded conversations"
                  placeholder="Search name or number"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  onClick={() => void load()}
                  aria-label="Refresh conversations"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
              {visible.map((c) => (
                <button
                  key={c.id}
                  className={`conversation-item ${selected?.id === c.id ? "selected" : ""}`}
                  onClick={() => {
                    setText("");
                    setMessages([]);
                    stickToBottom.current = true;
                    previousHeight.current = null;
                    void open(c.id);
                  }}
                >
                  <span className="contact-avatar">
                    {c.name?.slice(0, 1) || "?"}
                  </span>
                  <span>
                    <strong>{c.name || c.phone}</strong>
                    <small>{c.preview}</small>
                    <em>
                      {c.optedOut
                        ? "Opted out"
                        : c.needsAttention
                          ? "Needs you"
                          : c.aiEnabled
                            ? "AI active"
                            : "Paused"}
                    </em>
                  </span>
                  <time>{time(c.updatedAt)}</time>
                </button>
              ))}
              {!visible.length ? (
                <div className="list-empty">
                  {loaded
                    ? "New WhatsApp enquiries will appear here."
                    : "Loading conversations…"}
                </div>
              ) : null}
              {next ? (
                <button
                  className="load-more"
                  onClick={async () => {
                    try {
                      const data = await request(
                        `/api/admin/inbox?before=${next}`,
                      );
                      setItems((old) => [
                        ...old,
                        ...data.items.filter(
                          (c: Conversation) => !old.some((o) => o.id === c.id),
                        ),
                      ]);
                      expandedList.current = true;
                      setNext(data.next);
                    } catch (e) {
                      setNotice((e as Error).message);
                    }
                  }}
                >
                  Load more
                </button>
              ) : null}
            </section>
            <section className="conversation-panel">
              {selected ? (
                <>
                  <header className="chat-header">
                    <button
                      className="chat-back"
                      aria-label="Back to conversations"
                      onClick={() => {
                        activeId.current = null;
                        setSelected(null);
                      }}
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <div>
                      <strong>{selected.name}</strong>
                      <small>+{selected.phone}</small>
                    </div>
                    <button
                      disabled={busy || selected.optedOut}
                      onClick={() =>
                        void action({ action: "toggle", id: selected.id })
                      }
                    >
                      {selected.aiEnabled ? (
                        <Pause size={15} />
                      ) : (
                        <Play size={15} />
                      )}{" "}
                      {selected.aiEnabled ? "Take over" : "Resume AI"}
                    </button>
                  </header>
                  {selected.referral ? (
                    <div className="ad-context">
                      <span>FROM META AD</span>{" "}
                      {selected.referral.headline || selected.referral.sourceId}
                    </div>
                  ) : null}
                  <div
                    className="chat-messages"
                    ref={messageList}
                    onScroll={(event) => {
                      const panel = event.currentTarget;
                      stickToBottom.current = panel.scrollHeight - panel.scrollTop - panel.clientHeight < 80;
                    }}
                    role="log"
                    aria-label="Conversation messages"
                  >
                    {older ? (
                      <button
                        className="load-more"
                        onClick={async () => {
                          const id = selected.id;
                          try {
                            const data = await request(
                              `/api/admin/inbox?id=${id}&before=${older}`,
                            );
                            if (activeId.current !== id) return;
                            previousHeight.current = messageList.current?.scrollHeight ?? null;
                            setMessages((old) => [...data.messages, ...old]);
                            expandedHistory.current = true;
                            setOlder(data.next);
                          } catch (e) {
                            setNotice((e as Error).message);
                          }
                        }}
                      >
                        Earlier messages
                      </button>
                    ) : null}
                    {messages.map((m) => (
                      <div key={m.id} className={`message ${m.direction}`}>
                        <p>{m.text}</p>
                        <small>
                          {time(m.timestamp)} ·{" "}
                          {m.direction === "outbound"
                            ? `${m.sentBy || "AI"} · ${m.status || "sent"}`
                            : "Customer"}
                        </small>
                      </div>
                    ))}
                  </div>
                  <form className="reply-form" onSubmit={send}>
                    <select
                      aria-label="Quick reply"
                      value=""
                      disabled={!canReply}
                      onChange={(e) => setText(e.target.value)}
                    >
                      <option value="">Insert a quick reply…</option>
                      {quickReplies.map((reply, i) => (
                        <option key={reply} value={reply}>
                          {
                            [
                              "Ask about the business",
                              "Understand the workflow",
                              "Pricing handoff",
                            ][i]
                          }
                        </option>
                      ))}
                    </select>
                    <div>
                      <textarea
                        aria-label="Your reply"
                        placeholder={
                          canReply
                            ? "Write a reply. Sending keeps AI paused."
                            : "Replies disabled: check mode, opt-out or 24-hour window."
                        }
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        maxLength={1400}
                        disabled={!canReply || busy}
                        rows={2}
                      />
                      <button
                        aria-label="Queue reply"
                        disabled={!canReply || busy || !text.trim()}
                      >
                        <Send size={19} />
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="inbox-empty">
                  <div className="admin-symbol">
                    <MessageSquare size={30} />
                  </div>
                  <h2>
                    Every enquiry.
                    <br />A useful next step.
                  </h2>
                  <p>
                    Select a conversation to review the context, reply
                    personally, or let your agent continue.
                  </p>
                  <small>
                    {mode === "off"
                      ? "Your agent is currently off."
                      : mode === "internal"
                        ? "Replies are limited to configured test numbers."
                        : "Your agent is enabled for incoming enquiries."}
                  </small>
                </div>
              )}
            </section>
            {selected ? (
              <aside className="lead-details">
                <p className="admin-eyebrow">CONVERSATION CONTEXT</p>
                <h2>{selected.service || "Discovering their needs"}</h2>
                <dl>
                  <dt>Business</dt>
                  <dd>{selected.business || "Not shared yet"}</dd>
                  <dt>Timeline</dt>
                  <dd>{selected.timeline || "Not shared yet"}</dd>
                  <dt>Summary</dt>
                  <dd>
                    {selected.summary ||
                      "The conversation summary will appear here."}
                  </dd>
                  <dt>Attention</dt>
                  <dd>
                    {selected.reason?.replaceAll("_", " ") ||
                      "No handoff requested"}
                  </dd>
                </dl>
                <p>
                  Ad details and conversation content are customer data. Review
                  them before acting.
                </p>
              </aside>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
