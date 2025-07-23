"use client";

import React from "react";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/portfolio/background-beams";
import { ProjectCard } from "@/components/portfolio/Project-card";

interface Skill {
    name: string;
    category: string;
    description: string;
}

interface Project {
    id: number;
    title: string;
    description: string;
    imageSrc: string;
    link: string;
    skills: Skill[];
}
const projects: Project[] = [
    {
        id: 1,
        title: "ZAX Design Studio Website",
        description:
            "A minimalist yet powerful portfolio site for an architecture studio. It features smooth animations, dynamic project filtering, and Sanity-powered blog management.",
        imageSrc: "/images/projects/zax.png",
        link: "https://zaxdesignstudio.com",
        skills: [
            {
                name: "Next.js",
                category: "frontend",
                description: "Building performant, SEO-friendly websites with app router and dynamic routing",
            },
            {
                name: "Sanity CMS",
                category: "backend",
                description: "Managing structured content like blogs and project data with real-time editing",
            },
            {
                name: "GSAP & Lenis",
                category: "frontend",
                description: "Creating smooth scroll and subtle animation effects for an immersive experience",
            },
            {
                name: "Tailwind CSS",
                category: "frontend",
                description: "Designing a modern, responsive UI with utility-first CSS",
            },
        ],
    },
    {
        id: 2,
        title: "Prakruti Interiors Website",
        description:
            "A responsive and visually rich website designed for a premium interior design firm, showcasing their projects, services, and studio style.",
        imageSrc: "/images/projects/prakruti.png",
        link: "https://prakrutiinteriors.com",
        skills: [
            {
                name: "Next.js",
                category: "frontend",
                description: "Developing dynamic pages for interior design portfolios and services",
            },
            {
                name: "Sanity CMS",
                category: "backend",
                description: "Allowing the client to manage content like images, testimonials, and project pages",
            },
            {
                name: "Tailwind CSS",
                category: "frontend",
                description: "Crafting visually elegant layouts with custom styling and component-based design",
            },
        ],
    },
    {
        id: 3,
        title: "Epix Infra Website",
        description:
            "A modern, elegant single-page website showcasing the home theater and interior designing services of Epix Infra.",
        imageSrc: "/images/projects/epixinfra.jpg",
        link: "https://epixinfra.com",
        skills: [
            {
                name: "Next.js",
                category: "frontend",
                description:
                    "Building modern web apps with server-side rendering and dynamic routing",
            },
            {
                name: "TypeScript",
                category: "frontend",
                description: "Writing type-safe, scalable, and maintainable applications",
            },
            {
                name: "Tailwind CSS",
                category: "frontend",
                description: "Utility-first CSS framework for rapidly building custom UIs",
            },
            {
                name: "Content Management",
                category: "backend",
                description: "Creating and managing dynamic content for service pages",
            },
        ],
    },
    {
        id: 4,
        title: "Kōva AI — Fictional AI Product Studio",
        description:
            "A fictional full-stack AI startup website built to demonstrate motion design, product-first branding, and developer skills. Includes interactive hero, feature cards, and a pricing section.",
        imageSrc: "/images/projects/kova.png",
        link: "https://kovaai.sandesh.io",
        skills: [
            {
                name: "Next.js",
                category: "frontend",
                description: "Modern web architecture with app directory and modular components",
            },
            {
                name: "Framer Motion",
                category: "frontend",
                description: "Animating components and transitions for a premium feel",
            },
            {
                name: "ShadCN UI",
                category: "frontend",
                description: "Using well-crafted components to quickly build interactive UI",
            },
            {
                name: "Tailwind CSS",
                category: "frontend",
                description: "Rapid styling and layout for high-precision UI control",
            },
        ],
    },
    {
        id: 5,
        title: "Summaize - YouTube Summarizer",
        description:
            "An AI-powered application that generates concise summaries of YouTube videos, enabling users to quickly grasp key content.",
        imageSrc: "/images/projects/summaize.png",
        link: "https://summaize.sandeshapparala.com",
        skills: [
            {
                name: "Next.js",
                category: "frontend",
                description:
                    "Building modern web apps with server-side rendering and dynamic routing",
            },
            {
                name: "TypeScript",
                category: "frontend",
                description: "Writing type-safe, scalable, and maintainable applications",
            },
            {
                name: "Tailwind CSS",
                category: "frontend",
                description: "Utility-first CSS framework for rapidly building custom UIs",
            },
            {
                name: "OpenAI API",
                category: "backend",
                description: "Integrating GPT for AI-driven summarization capabilities",
            },
            {
                name: "Django",
                category: "backend",
                description: "Building scalable, secure, and efficient web applications",
            },
        ],
    },
    {
        id: 6,
        title: "RainVine Weather App",
        description:
            "A weather application that provides accurate forecasts and integrates real-time weather data with user-friendly visuals.",
        imageSrc: "/images/projects/rainvine.png",
        link: "https://rainvine.sandeshapparala.com/",
        skills: [
            {
                name: "React",
                category: "frontend",
                description: "Creating seamless, interactive user interfaces",
            },
            {
                name: "API Integration",
                category: "backend",
                description: "Fetching and displaying real-time weather data from third-party APIs",
            },
            {
                name: "Firebase",
                category: "backend",
                description: "Integrating real-time databases and authentication",
            },
            {
                name: "Tailwind CSS",
                category: "frontend",
                description: "Utility-first CSS framework for rapidly building custom UIs",
            },
        ],
    },
];

export default function PortfolioSection() {
    return (
        <section className="relative w-full py-12 overflow-hidden px-28 max-md:px-2 max-lg:px-6" id={"projects"}>
            <BackgroundBeams />

            <div className="relative z-10 container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="mb-6 inline-block"
                    >
                        <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                            Portfolio
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
                    >
                        Featured Projects
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-muted-foreground"
                    >
                        Take a look at some of my recent projects. I focus on building
                        scalable and modern applications to deliver exceptional user
                        experiences.
                    </motion.p>
                </motion.div>

                {/*
          Use items-stretch so each card stretches to the same height in the grid.
          Optionally, add [grid-auto-rows:1fr] if you have multiple rows.
        */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 items-stretch">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
