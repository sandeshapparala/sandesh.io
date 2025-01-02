"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SkillBadge } from "@/components/about/skill-badge";

interface Skill {
    name: string;
    category: string;
    description: string;
}

interface ProjectCardProps {
    project: {
        id: number;
        title: string;
        description: string;
        imageSrc: string;
        link: string;
        skills: Skill[];
    };
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            viewport={{ once: true }}
            // Adding h-full to ensure the card stretches
            className="group h-full"
        >
            <Card
                // Use flex flex-col and h-full so the card fills the parent grid cell
                className="relative h-full flex flex-col overflow-hidden
                   bg-black/40 backdrop-blur-sm border-neutral-800
                   hover:border-neutral-700 transition-all duration-300"
            >
                {/* Fixed height image container at the top */}
                <div className="relative h-64 overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/60" />
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className="h-full"
                    >
                        <Image
                            src={project.imageSrc}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </motion.div>
                    <Link
                        href={project.link}
                        target={"_blank"}
                        className={cn(
                            "absolute top-4 right-4 z-20 p-2 rounded-full",
                            "bg-black/30 backdrop-blur-md border border-white/10",
                            "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                            "hover:bg-white/10"
                        )}
                    >
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Content area that can expand to fill remaining space */}
                <div className="relative p-6 space-y-4 flex-grow">
                    <div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, i) => (
                            <SkillBadge
                                key={`${project.id}-${skill.name}`}
                                skill={skill}
                                index={i}
                            />
                        ))}
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
