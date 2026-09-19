"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Copy } from "lucide-react";
import { businessTypes, requirements, volumes } from "@/lib/enquiry-validation";

function makeBrief(form: HTMLFormElement) {
  const data = new FormData(form);
  const value = (key: string) => String(data.get(key) ?? "").trim();
  return `Hi Sandesh,\n\nI’d like to discuss a project.\n\nName: ${value("name")}\nBusiness: ${value("company")}\nEmail: ${value("email")}\nBusiness type: ${value("type")}\nInterested in: ${value("requirement")}\nMonthly enquiries: ${value("volume") || "Not sure"}\n\nCurrent website or workflow:\n${value("current") || "Not provided"}\n\nProject brief:\n${value("goal")}\n\nPlease get in touch to discuss a consultation.`;
}

function validateBrief(form: HTMLFormElement) {
  for (const name of ["name", "company", "goal"]) {
    const field = form.elements.namedItem(name);
    if (
      field instanceof HTMLInputElement ||
      field instanceof HTMLTextAreaElement
    ) {
      field.setCustomValidity(
        field.value.trim() ? "" : "Please enter more than spaces.",
      );
    }
  }
  return form.reportValidity();
}

export function EnquiryForm() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const [preparedBrief, setPreparedBrief] = useState("");
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const submitting = useRef(false);
  const submission = useRef<{ id: string; payload: string } | null>(null);
  async function sendEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || saved || !validateBrief(event.currentTarget))
      return;
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    const payload = JSON.stringify(fields);
    if (!submission.current || submission.current.payload !== payload)
      submission.current = { id: crypto.randomUUID(), payload };
    submitting.current = true;
    setPending(true);
    setStatus("Saving your enquiry…");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          submissionId: submission.current.id,
        }),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error ||
            "We couldn’t confirm your enquiry was saved. Please try again.",
        );
      if (typeof result.reference !== "string")
        throw new Error(
          "We couldn’t confirm your enquiry was saved. Please try again.",
        );
      setSaved(true);
      setStatus(
        `Your enquiry is saved. I’ll review your brief and contact you by email. Reference: ${result.reference}`,
      );
    } catch (error) {
      setStatus(
        error instanceof Error &&
          error.name !== "TimeoutError" &&
          error.name !== "TypeError"
          ? error.message
          : "We couldn’t confirm your enquiry was saved. Please retry—your details are still here. You can also copy your brief and email hello@sandesh.io.",
      );
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }
  async function copyBrief() {
    if (!form.current || !validateBrief(form.current)) return;
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
    <form
      className="enquiry-form"
      ref={form}
      onSubmit={sendEnquiry}
      aria-busy={pending}
      onInput={(event) => {
        const field = event.target;
        if (
          field instanceof HTMLInputElement ||
          field instanceof HTMLTextAreaElement
        )
          field.setCustomValidity("");
        setStatus("");
        setPreparedBrief("");
        setSaved(false);
      }}
    >
      <h2>Tell me what you have in mind.</h2>
      <p className="form-note">
        Send a short project brief. I’ll review your enquiry and get in touch.
      </p>
      <fieldset disabled={pending} className="enquiry-fields">
        <div className="enquiry-honeypot" aria-hidden="true">
          <label>
            Leave this field empty
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
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
              {businessTypes.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label className="field">
            I’m interested in
            <select name="requirement" defaultValue="WhatsApp AI agent">
              {requirements.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label className="field field-full">
            Monthly enquiries (optional)
            <select name="volume" defaultValue="Not sure">
              {volumes.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label className="field field-full">
            Current website or workflow (optional)
            <textarea
              name="current"
              maxLength={450}
              placeholder="Share your current website or describe how your team works…"
            />
          </label>
          <label className="field field-full">
            Tell me about your project
            <textarea
              name="goal"
              maxLength={450}
              required
              placeholder="What would you like to build or improve?"
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit" className="button" disabled={pending || saved}>
            {pending ? "Saving…" : saved ? "Enquiry saved" : "Send enquiry"}
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
      </fieldset>
      <p className="form-note">
        Your details are used to respond to your enquiry. Read the{" "}
        <a href="/privacy">privacy notice</a>. This is not a confirmed calendar
        booking.
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
