"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Zap, Brain, Globe, ArrowUpRight } from "lucide-react"
import Link from "next/link"

const STATS = [
    { value: "20+", label: "Projects Shipped" },
    { value: "3+", label: "Years with AI" },
    { value: "10+", label: "Clients Globally" },
    { value: "100%", label: "Remote-First" },
]

const PILLARS = [
    {
        icon: Zap,
        title: "Speed as a Strategy",
        body: "I move fast without cutting corners. Every project gets a production-grade foundation from day one — so you're never rebuilding from scratch a year later.",
    },
    {
        icon: Brain,
        title: "AI That Actually Works",
        body: "Not AI for the press release. I integrate intelligence where it compounds value: in your workflows, customer touchpoints, and internal tools.",
    },
    {
        icon: Globe,
        title: "Long-term Partnership",
        body: "I don't disappear after launch. I'm in your corner for ongoing improvements, new integrations, and keeping your product ahead of the curve.",
    },
]

function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-60px" })
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, delay, ease: [0.0, 0.0, 0.2, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default function AboutSection() {
    return (
        <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-black">
            {/* Subtle background grid */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Ambient glow */}
            <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-[120px]"
                style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
            />

            <div className="relative mx-auto max-w-6xl px-6">
                {/* Section label */}
                <FadeUp delay={0} className="mb-14 flex items-center gap-4">
                    <span className="text-xs font-semibold tracking-[0.25em] uppercase text-blue-400">01 / About</span>
                    <div className="h-px flex-1 max-w-[60px] bg-blue-400/30" />
                </FadeUp>

                {/* Main grid */}
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
                    {/* Left — narrative */}
                    <div className="flex flex-col justify-center">
                        <FadeUp delay={0.05}>
                            <h2 className="text-5xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl leading-[1.05]">
                                Hey, I&apos;m{" "}
                                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
                                    Sandesh
                                </span>
                            </h2>
                        </FadeUp>

                        <FadeUp delay={0.1}>
                            <p className="mt-6 text-lg leading-relaxed text-gray-400">
                                I build at the intersection of{" "}
                                <span className="text-white font-medium">AI intelligence</span> and premium web craft —
                                turning complex technology into decisive business advantages.
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.15}>
                            <p className="mt-4 text-base leading-relaxed text-gray-500">
                                With a background spanning full-stack development and AI integration, I&apos;ve spent years
                                helping startups and founders move faster, think smarter, and ship products that win markets.
                                I don&apos;t just build websites — I engineer systems that learn, adapt, and compound your
                                competitive edge over time.
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.2}>
                            <p className="mt-4 text-base leading-relaxed text-gray-500">
                                Every project is treated as a long-term partnership, not a transaction. When I&apos;m not
                                shipping code, I&apos;m researching the next AI capability that&apos;ll give my clients an
                                unfair advantage.
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.25} className="mt-8">
                            <Link
                                href="#booking"
                                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                            >
                                Work with me
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </FadeUp>
                    </div>

                    {/* Right — stats */}
                    <FadeUp delay={0.1} className="flex flex-col justify-center">
                        <div className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden border border-white/8 bg-white/8">
                            {STATS.map((stat, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-center justify-center py-10 px-6 bg-black text-center"
                                    style={{
                                        borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.06)" : undefined,
                                        borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : undefined,
                                    }}
                                >
                                    <span className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                                        {stat.value}
                                    </span>
                                    <span className="mt-2 text-xs font-medium tracking-widest uppercase text-gray-500">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Availability badge */}
                        <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-5 py-4">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                            </span>
                            <p className="text-sm text-gray-400">
                                <span className="font-medium text-white">Available for new projects.</span>{" "}
                                Currently taking on 1–2 new clients.
                            </p>
                        </div>
                    </FadeUp>
                </div>

                {/* Pillars */}
                <div className="mt-20 grid grid-cols-1 gap-px sm:grid-cols-3 rounded-2xl overflow-hidden border border-white/8 bg-white/8">
                    {PILLARS.map((pillar, i) => {
                        const Icon = pillar.icon
                        return (
                            <FadeUp
                                key={i}
                                delay={0.1 + i * 0.08}
                                className="flex flex-col gap-4 bg-black p-8"
                            >
                                <div
                                    className="contents"
                                    style={{
                                        borderRight: i < PILLARS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : undefined,
                                    }}
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                                        <Icon className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <h3 className="text-base font-semibold text-white">{pillar.title}</h3>
                                    <p className="text-sm leading-relaxed text-gray-500">{pillar.body}</p>
                                </div>
                            </FadeUp>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
