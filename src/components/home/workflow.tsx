"use client";

import * as Tabs from "@radix-ui/react-tabs";
import {
  ArrowRight,
  Check,
  CheckCheck,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Send,
  SlidersHorizontal,
  CalendarDays,
  Users,
  MessagesSquare,
} from "lucide-react";
import { workflowSteps } from "@/content/home";

const icons = [MessagesSquare, SlidersHorizontal, CalendarDays, Users];

export function Workflow() {
  return (
    <section
      className="workflow-section container"
      aria-labelledby="workflow-title"
      id="how-it-works"
    >
      <div className="workflow-heading">
        <span className="eyebrow">A conversation. A clear next step.</span>
        <span className="example-label">
          Illustrative workflow · Sample data
        </span>
      </div>
      <h2 id="workflow-title" className="sr-only">
        How your WhatsApp AI agent can help
      </h2>
      <Tabs.Root defaultValue="answer" className="workflow-root">
        <Tabs.List
          className="workflow-tabs"
          aria-label="Explore the agent workflow"
        >
          {workflowSteps.map((step, index) => {
            const Icon = icons[index];
            return (
              <Tabs.Trigger
                key={step.id}
                value={step.id}
                className="workflow-tab"
              >
                <Icon size={19} aria-hidden="true" />
                <span>{step.label}</span>
                <ArrowRight
                  size={16}
                  className="tab-arrow"
                  aria-hidden="true"
                />
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
        {workflowSteps.map((step) => (
          <Tabs.Content
            value={step.id}
            key={step.id}
            className="workflow-content"
          >
            <div className="workflow-copy">
              <span className="tiny-label">Your agent at work</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <a href="/services/whatsapp-ai-agents" className="text-link">
                Explore the service <ArrowRight size={17} />
              </a>
            </div>
            <div className="workflow-visual">
              <div className="chat-window">
                <div className="chat-header">
                  <span className="chat-avatar">
                    <MessageCircle size={22} />
                  </span>
                  <div>
                    <strong>Your property assistant</strong>
                    <span>WhatsApp AI agent</span>
                  </div>
                  <MoreHorizontal
                    size={20}
                    className="chat-more"
                    aria-hidden="true"
                  />
                </div>
                <div className="chat-body">
                  <span className="chat-date">Example conversation</span>
                  <div className="message outgoing">
                    {step.question}
                    <span>
                      <CheckCheck size={13} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="message incoming">
                    {step.reply}
                    <span className="message-ai">AI assistant</span>
                  </div>
                  <div className="message outgoing">
                    {step.response}
                    <span>
                      <CheckCheck size={13} aria-hidden="true" />
                    </span>
                  </div>
                </div>
                <div className="chat-input" aria-hidden="true">
                  <Plus size={17} />
                  <span>Message</span>
                  <Send size={17} />
                </div>
              </div>
              <div className="lead-card">
                <div className="lead-card-heading">
                  <span className="lead-check">
                    <Check size={16} />
                  </span>
                  <span>{step.recordLabel}</span>
                </div>
                <h4>{step.recordTitle}</h4>
                <dl>
                  {step.fields.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="lead-card-note">
                  <span className="status-dot" />
                  {step.note}
                </div>
              </div>
            </div>
          </Tabs.Content>
        ))}
      </Tabs.Root>
      <p className="workflow-caption">
        A possible workflow, tailored to your business. This illustration uses
        sample conversations, not client records.
      </p>
    </section>
  );
}
