"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Copy } from "lucide-react";
import { site } from "@/content/site";

function makeBrief(form: HTMLFormElement) {
  const data = new FormData(form);
  const value = (key: string) => String(data.get(key) ?? "").trim();
  return `Hi Sandesh,\n\nI’d like to discuss an AI agent project.\n\nName: ${value("name")}\nBusiness: ${value("company")}\nEmail: ${value("email")}\nBusiness type: ${value("type")}\nInterested in: ${value("requirement")}\nMonthly enquiries: ${value("volume") || "Not sure"}\n\nCurrent workflow:\n${value("current")}\n\nWhat I’d like to improve:\n${value("goal")}\n\nPlease get in touch to discuss a consultation.`;
}

export function EnquiryForm() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const [preparedBrief, setPreparedBrief] = useState("");
  function openDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = makeBrief(event.currentTarget);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("AI agent consultation")}&body=${encodeURIComponent(body)}`;
    setStatus(
      "Your email app should open with a draft. Please send it there to contact me. If nothing opens, copy the brief and email hello@sandesh.io.",
    );
  }
  async function copyBrief() {
    if (!form.current?.reportValidity()) return;
    const brief = makeBrief(form.current);
    setPreparedBrief(brief);
    try {
      await navigator.clipboard.writeText(brief);
      setStatus(
        "Brief copied. Paste it into an email to hello@sandesh.io and send it when you’re ready.",
      );
    } catch {
      setStatus(
        "Automatic copying wasn’t available. Select the prepared brief below, copy it, and email hello@sandesh.io.",
      );
    }
  }
  return (
    <form className="enquiry-form" ref={form} onSubmit={openDraft}>
      <h2>Tell me what you have in mind.</h2>
      <p className="form-note">
        Create a short project brief, then send it through your email app.
        Nothing is submitted from this page.
      </p>
      <div className="field-grid">
        <label className="field">
          Your name
          <input name="name" autoComplete="name" required maxLength={80} />
        </label>
        <label className="field">
          Business or project name
          <input
            name="company"
            autoComplete="organization"
            required
            maxLength={100}
          />
        </label>
        <label className="field field-full">
          Your email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={150}
          />
        </label>
        <label className="field">
          Business type
          <select name="type" defaultValue="Real estate">
            <option>Real estate</option>
            <option>Construction</option>
            <option>Other</option>
          </select>
        </label>
        <label className="field">
          I’m interested in
          <select name="requirement" defaultValue="WhatsApp AI agent">
            <option>WhatsApp AI agent</option>
            <option>Custom AI workflow</option>
            <option>Existing agent improvements</option>
            <option>Website with automation</option>
          </select>
        </label>
        <label className="field field-full">
          Monthly enquiries (optional)
          <select name="volume" defaultValue="Not sure">
            <option>Not sure</option>
            <option>Under 100</option>
            <option>100–500</option>
            <option>500–2,000</option>
            <option>More than 2,000</option>
          </select>
        </label>
        <label className="field field-full">
          How do you handle this workflow today?
          <textarea
            name="current"
            maxLength={450}
            required
            placeholder="Where enquiries arrive and what your team does next…"
          />
        </label>
        <label className="field field-full">
          What would you like to improve?
          <textarea
            name="goal"
            maxLength={450}
            required
            placeholder="What should the agent help your team with?"
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" className="button">
          Open email draft
          <ArrowUpRight size={16} />
        </button>
        <button
          type="button"
          className="button button-secondary"
          onClick={copyBrief}
        >
          Copy brief
          <Copy size={15} />
        </button>
      </div>
      <p className="form-note">
        A consultation request is the start of a conversation, not a confirmed
        calendar booking.
      </p>
      <p className="form-status" role="status" aria-live="polite">
        {status}
      </p>
      {preparedBrief && (
        <label className="field prepared-brief">
          Your prepared brief
          <textarea
            readOnly
            value={preparedBrief}
            rows={12}
            onFocus={(event) => event.currentTarget.select()}
          />
        </label>
      )}
    </form>
  );
}
