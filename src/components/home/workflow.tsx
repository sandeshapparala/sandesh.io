"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  CheckCheck,
  ChevronRight,
  MessageCircle,
  MessagesSquare,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { workflowSteps } from "@/content/home";
import "./workflow.css";

const icons = [MessagesSquare, SlidersHorizontal, CalendarDays, Users];
const subscribeHydration = () => () => {};
const desktopQuery =
  "(min-width: 1200px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)";
function subscribe(callback: () => void) {
  const query = window.matchMedia(desktopQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function Workflow() {
  const track = useRef<HTMLDivElement>(null);
  const desktop = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(desktopQuery).matches,
    () => false,
  );
  const reduced = useReducedMotion();
  const hydrated = useSyncExternalStore(
    subscribeHydration,
    () => true,
    () => false,
  );
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: entrance } = useScroll({
    target: track,
    offset: ["start end", "start start"],
  });
  const maxWidth = useTransform(entrance, [0, 1], [1200, 1920]);
  const radius = useTransform(entrance, [0, 1], [32, 24]);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (desktop) setActive(Math.min(3, Math.floor(Math.max(0, value) * 4)));
  });
  function select(value: string) {
    const index = workflowSteps.findIndex((step) => step.id === value);
    setActive(index);
    if (desktop && track.current) {
      const start = track.current.getBoundingClientRect().top + window.scrollY;
      const distance = track.current.offsetHeight - window.innerHeight;
      // Native scrolling keeps tabs, backtracking, and the visible chapter in sync.
      window.scrollTo({
        top: start + distance * ((index + 0.12) / 4),
        behavior: "instant",
      });
    }
  }
  const step = workflowSteps[active];
  return (
    <section
      className="journey"
      data-pinned={desktop}
      id="how-it-works"
      aria-labelledby="workflow-title"
    >
      <div className="workflow-heading container">
        <h2 id="workflow-title" className="eyebrow">
          A conversation. A clear next step.
        </h2>
        <span className="example-label">
          Illustrative workflow · Sample data
        </span>
      </div>
      <div ref={track} className="journey-track" data-pinned={desktop}>
        <motion.div
          className="journey-stage"
          style={desktop ? { maxWidth, borderRadius: radius } : undefined}
        >
          <Tabs.Root
            value={step.id}
            onValueChange={select}
            className="journey-inner"
          >
            <div className="journey-topline">
              <span>ONE ENQUIRY. FOUR USEFUL STEPS.</span>
              <a href="#client-work">
                Skip to client work <ArrowDown size={14} />
              </a>
            </div>
            <Tabs.List
              className="journey-tabs"
              aria-label="Explore the agent workflow"
            >
              {workflowSteps.map((item, index) => {
                const Icon = icons[index];
                return (
                  <Tabs.Trigger
                    key={item.id}
                    value={item.id}
                    className="journey-tab"
                  >
                    <Icon size={19} aria-hidden="true" />
                    <span>{item.label}</span>
                    <span className="journey-tab-number" aria-hidden="true">
                      0{index + 1}
                    </span>
                  </Tabs.Trigger>
                );
              })}
            </Tabs.List>
            {workflowSteps.map((item, index) => (
              <Tabs.Content
                key={item.id}
                value={item.id}
                className="journey-panel"
              >
                <motion.div
                  className="journey-copy"
                  initial={
                    hydrated && reduced === false ? { opacity: 0, y: 8 } : false
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.35 }}
                >
                  <span className="journey-chapter">
                    0{index + 1} / 04 <span>From enquiry to follow-up</span>
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link
                    href="/services/whatsapp-ai-agents"
                    className="text-link"
                  >
                    Explore the service <ArrowRight size={16} />
                  </Link>
                </motion.div>
                <div className="journey-demo">
                  <div className="journey-chat">
                    <div className="journey-chat-head">
                      <span className="journey-avatar">
                        <MessageCircle size={22} />
                      </span>
                      <div>
                        <strong>Property assistant</strong>
                        <span>AI assistant · Example conversation</span>
                      </div>
                    </div>
                    <div className="journey-messages" key={item.id}>
                      <span className="journey-day">
                        One buyer’s journey · Sample
                      </span>
                      {[item.question, item.reply, item.response].map(
                        (message, i) => (
                          <motion.div
                            key={message}
                            className={`journey-bubble ${i === 1 ? "agent" : "buyer"}`}
                            initial={
                              hydrated && reduced === false
                                ? { opacity: 0, y: 10 }
                                : false
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: reduced ? 0 : 0.35,
                              delay: reduced ? 0 : i * 0.12,
                            }}
                          >
                            <p>{message}</p>
                            <span className="journey-message-meta">
                              {i === 1 ? "AI assistant" : "Buyer"} · 10:
                              {String(
                                30 + index * 2 + (i === 2 ? 1 : 0),
                              ).padStart(2, "0")}
                              {i !== 1 && (
                                <CheckCheck size={13} aria-hidden="true" />
                              )}
                            </span>
                          </motion.div>
                        ),
                      )}
                    </div>
                    <div className="journey-chat-foot">
                      <span>Illustration only — not a live chat</span>
                    </div>
                  </div>
                  <motion.aside
                    className="journey-record"
                    aria-label="Example team summary"
                    initial={
                      hydrated && reduced === false
                        ? { opacity: 0, y: 12 }
                        : false
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduced ? 0 : 0.4,
                      delay: reduced ? 0 : 0.25,
                    }}
                  >
                    <div className="journey-record-top">
                      <span>FOR YOUR TEAM</span>
                      <span>0{index + 1}</span>
                    </div>
                    <span className="journey-status">{item.recordLabel}</span>
                    <h4>{item.recordTitle}</h4>
                    <dl>
                      {item.fields.map(([label, value]) => (
                        <div key={label}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <p>{item.note}</p>
                  </motion.aside>
                </div>
              </Tabs.Content>
            ))}
            <div className="journey-bottom">
              <span>
                {desktop
                  ? "Scroll to follow the conversation"
                  : "Choose a step to explore the conversation"}
              </span>
              <div className="journey-progress" aria-hidden="true">
                {workflowSteps.map((item, index) => (
                  <span key={item.id} data-complete={index <= active} />
                ))}
              </div>
              {active < 3 ? (
                <button onClick={() => select(workflowSteps[active + 1].id)}>
                  Next step <ChevronRight size={16} />
                </button>
              ) : (
                <a href="#client-work">
                  See client work <ArrowRight size={16} />
                </a>
              )}
            </div>
          </Tabs.Root>
        </motion.div>
      </div>
      <p className="journey-caption container">
        A possible workflow, tailored to your business. Sample conversations and
        records, not client evidence.
      </p>
    </section>
  );
}
