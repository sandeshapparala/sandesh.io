"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle, AlertCircle, Mail, Clock, MessageSquare } from "lucide-react"

const SERVICES = [
    { value: "web", label: "Web Development" },
    { value: "ai", label: "AI Integration" },
    { value: "strategy", label: "Tech Strategy" },
    { value: "fullstack", label: "Full-Stack Build" },
    { value: "unsure", label: "Not sure yet" },
]

const BUDGETS = [
    { value: "sub5k", label: "Under $5k" },
    { value: "5k-15k", label: "$5k – $15k" },
    { value: "15k-30k", label: "$15k – $30k" },
    { value: "30k+", label: "$30k+" },
    { value: "discuss", label: "Prefer to discuss" },
]

const TIMELINES = [
    { value: "asap", label: "ASAP" },
    { value: "1-3m", label: "1–3 months" },
    { value: "3-6m", label: "3–6 months" },
    { value: "exploring", label: "Just exploring" },
]

const PERKS = [
    { icon: Clock, text: "Response within 24 hours" },
    { icon: MessageSquare, text: "Free 30-min strategy call" },
    { icon: Mail, text: "hello@sandesh.io" },
]

type FormState = {
    name: string
    email: string
    company: string
    service: string
    budget: string
    timeline: string
    message: string
}

const INITIAL: FormState = {
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
}

export default function BookingSection() {
    const [form, setForm] = useState<FormState>(INITIAL)
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [errorMsg, setErrorMsg] = useState("")

    const set = (field: keyof FormState) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => setForm((f) => ({ ...f, [field]: e.target.value }))

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("loading")
        setErrorMsg("")

        try {
            const res = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "Unknown error")
            setStatus("success")
            setForm(INITIAL)
        } catch (err: unknown) {
            setStatus("error")
            setErrorMsg(err instanceof Error ? err.message : "Something went wrong.")
        }
    }

    return (
        <section id="booking" className="relative py-24 md:py-32 bg-white dark:bg-neutral-950">
            <div className="mx-auto max-w-6xl px-6">
                {/* Header */}
                <div className="mb-14">
                    <span className="text-xs font-semibold tracking-[0.25em] uppercase text-blue-600 dark:text-blue-400">
                        04 / Book a Call
                    </span>
                    <h2 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                        Let&apos;s build your advantage.
                    </h2>
                    <p className="mt-4 max-w-xl text-base text-neutral-500 dark:text-neutral-400">
                        Tell me about your project. I&apos;ll get back to you within 24 hours with a plan.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
                    {/* Form — takes 3/5 */}
                    <div className="lg:col-span-3">
                        {status === "success" ? (
                            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-14 text-center dark:border-emerald-800/40 dark:bg-emerald-950/20">
                                <CheckCircle className="h-12 w-12 text-emerald-500" />
                                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">Request received!</h3>
                                <p className="max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
                                    I&apos;ll review your project details and get back to you within 24 hours. Check your inbox.
                                </p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="mt-2 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    Submit another request
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={submit} className="space-y-5">
                                {/* Name + Email */}
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <Field label="Full Name *">
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your name"
                                            value={form.name}
                                            onChange={set("name")}
                                            className={inputCls}
                                        />
                                    </Field>
                                    <Field label="Email *">
                                        <input
                                            type="email"
                                            required
                                            placeholder="you@company.com"
                                            value={form.email}
                                            onChange={set("email")}
                                            className={inputCls}
                                        />
                                    </Field>
                                </div>

                                {/* Company */}
                                <Field label="Company / Project Name">
                                    <input
                                        type="text"
                                        placeholder="Optional"
                                        value={form.company}
                                        onChange={set("company")}
                                        className={inputCls}
                                    />
                                </Field>

                                {/* Service + Timeline */}
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <Field label="Service">
                                        <select value={form.service} onChange={set("service")} className={inputCls}>
                                            <option value="">Select a service</option>
                                            {SERVICES.map((s) => (
                                                <option key={s.value} value={s.value}>{s.label}</option>
                                            ))}
                                        </select>
                                    </Field>
                                    <Field label="Timeline">
                                        <select value={form.timeline} onChange={set("timeline")} className={inputCls}>
                                            <option value="">When do you need this?</option>
                                            {TIMELINES.map((t) => (
                                                <option key={t.value} value={t.value}>{t.label}</option>
                                            ))}
                                        </select>
                                    </Field>
                                </div>

                                {/* Budget */}
                                <Field label="Budget Range">
                                    <div className="flex flex-wrap gap-2">
                                        {BUDGETS.map((b) => (
                                            <button
                                                key={b.value}
                                                type="button"
                                                onClick={() => setForm((f) => ({ ...f, budget: b.value }))}
                                                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                                                    form.budget === b.value
                                                        ? "border-blue-600 bg-blue-600 text-white"
                                                        : "border-neutral-200 text-neutral-600 hover:border-blue-400 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-blue-500"
                                                }`}
                                            >
                                                {b.label}
                                            </button>
                                        ))}
                                    </div>
                                </Field>

                                {/* Message */}
                                <Field label="Tell me about your project *">
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="What are you building? What's the biggest challenge you're facing right now?"
                                        value={form.message}
                                        onChange={set("message")}
                                        className={inputCls + " resize-none"}
                                    />
                                </Field>

                                {status === "error" && (
                                    <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800/40 dark:bg-red-950/20 dark:text-red-400">
                                        <AlertCircle className="h-4 w-4 shrink-0" />
                                        {errorMsg}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-neutral-800 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-neutral-100 sm:w-auto sm:min-w-[200px]"
                                >
                                    {status === "loading" ? "Sending…" : "Send Request"}
                                    {status !== "loading" && <ArrowRight className="h-4 w-4" />}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Sidebar — takes 2/5 */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* Info card */}
                        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-900">
                            <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                                What happens next?
                            </h3>
                            <ol className="mt-5 space-y-4">
                                {[
                                    "I review your project details carefully.",
                                    "I send you a personalised reply within 24 hours.",
                                    "We jump on a free 30-min strategy call.",
                                    "If it's a fit, I send a clear proposal.",
                                ].map((step, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-[10px] font-bold text-blue-600 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-400">
                                            {i + 1}
                                        </span>
                                        {step}
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Perks */}
                        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
                            {PERKS.map(({ icon: Icon, text }) => (
                                <div key={text} className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                                    <Icon className="h-4 w-4 text-blue-500 shrink-0" />
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const inputCls =
    "w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none ring-0 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-500 dark:focus:border-blue-500"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{label}</label>
            {children}
        </div>
    )
}
