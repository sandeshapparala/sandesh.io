"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Code2, Lightbulb, Rocket, Sparkles } from "lucide-react";
import { FeatureCard } from "@/components/about/feature-card";
import { SkillBadge } from "@/components/about/skill-badge";
import { CTAButton } from "@/components/about/cta-button";


const skills = [
    { name: "Next.js", category: "frontend", description: "Building modern web applications with server-side rendering and dynamic routing" },
    { name: "React", category: "frontend", description: "Creating seamless, interactive user interfaces" },
    { name: "TypeScript", category: "frontend", description: "Writing type-safe, scalable, and maintainable applications" },
    { name: "Python", category: "backend", description: "Developing robust server-side logic and data processing" },
    { name: "Django", category: "backend", description: "Building scalable, secure, and efficient web applications" },
    { name: "Flask", category: "backend", description: "Creating lightweight, flexible web applications and APIs" },
    { name: "Firebase", category: "backend", description: "Integrating real-time databases and authentication" },
    { name: "REST APIs", category: "backend", description: "Building scalable, maintainable web services" },
    { name: "Framer Motion", category: "frontend", description: "Creating smooth animations and interactive transitions for modern UI/UX" },
    { name: "GSAP", category: "frontend", description: "Crafting high-performance, complex animations for web applications" },
    { name: "Version Control", category: "frontend", description: "Collaborating and managing code efficiently with Git and GitHub" }
];


const features = [
    {
        icon: Code2,
        title: "Clean Code",
        description: "Writing maintainable, efficient, and scalable code is my passion.",
        color: "text-white"
    },
    {
        icon: Lightbulb,
        title: "Innovation",
        description: "Pushing boundaries with creative solutions and cutting-edge tech.",
        color: "text-white"
    },
    {
        icon: Rocket,
        title: "Performance",
        description: "Optimizing for speed, efficiency, and exceptional user experience.",
        color: "text-white"
    }
];

export default function About() {
    return (
        <section className="relative py-12 overflow-hidden bg-black" id={"about"}>
            {/*<AnimatedGradient />*/}

            <motion.div
                className="container mx-auto px-4"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
            >
                <motion.div
                    className="max-w-4xl mx-auto space-y-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center space-y-4">
                        <motion.h2
                            className="text-5xl font-bold text-white mb-6 max-md:text-3xl"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            Crafting Digital Excellence
                        </motion.h2>
                        <motion.p
                            className="text-gray-400 text-lg max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            I am a full-stack developer with a passion for building scalable, AI-powered solutions that drive real-world impact. Skilled in crafting clean, efficient code, I specialize in SaaS platforms, intuitive websites, and AI integrations, delivering exceptional user experiences with cutting-edge tools.
                        </motion.p>
                    </div>

                    {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-6">*/}
                    {/*    {features.map((feature, index) => (*/}
                    {/*        <FeatureCard*/}
                    {/*            key={feature.title}*/}
                    {/*            {...feature}*/}
                    {/*            delay={index * 0.2}*/}
                    {/*        />*/}
                    {/*    ))}*/}
                    {/*</div>*/}

                    <motion.div
                        className="mt-16 space-y-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Separator className="bg-white/10" />

                        <div className="flex flex-wrap gap-3 justify-center">
                            {skills.map((skill, index) => (
                                <SkillBadge key={skill.name} skill={skill} index={index} />
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="text-center mt-16 space-y-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-gray-400 flex items-center justify-center gap-2 mb-8">
                            <Sparkles className="w-5 h-5 text-white" />
                            Always learning, always growing, always delivering excellence
                        </p>

                        <CTAButton text="View My Portfolio" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}