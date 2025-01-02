"use client";

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import {ArrowUpRight} from "lucide-react";
import React from "react";

export default function ServicesSection() {
    return (
        <section
            className="
        mx-auto
        mt-16
        max-w-6xl
        rounded-md
        p-6
        text-white
        shadow-md
        md:mt-20
        md:p-8
      "
        >
            {/* Header */}
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center" id={"services"}>
                <div>
                    <h2 className="text-3xl font-bold md:text-4xl">Our Services</h2>
                    <p className="mt-2 max-w-xl text-base text-zinc-400">
                        Transforming ideas into impactful solutions—from digital
                        experiences to AI-powered innovations.
                    </p>
                </div>
                <p className="mt-2 hidden max-w-xs text-right text-sm text-zinc-300 md:block">
                    Elevate your brand and drive growth with our comprehensive suite of
                    end-to-end services, tailored to your unique vision.
                </p>
            </div>

            {/* Services List */}
            <div className="mt-8 divide-y divide-zinc-700">
                <ServiceRow
                    index="01"
                    title="Web Development"
                    description="From landing pages to complex SaaS platforms, we craft responsive and user-centric web solutions."
                    imageSrc="/images/project1.jpg"
                    alt="Web Development"
                />
                <ServiceRow
                    index="02"
                    title="AI Application Development"
                    description="Leverage data-driven intelligence to build cutting-edge, predictive, and scalable AI-powered apps."
                    imageSrc="/images/services/ai.jpg"
                    alt="AI Application Development"
                />
                <ServiceRow
                    index="03"
                    title="Social Media Management"
                    description="Grow your online presence with captivating content, strategic engagement, and impactful campaigns."
                    imageSrc="/images/services/socialmedia.jpg"
                    alt="Social Media Management"
                />
                <ServiceRow
                    index="04"
                    title="Creative & Branding"
                    description="Stand out with stunning visuals, from video editing and logo design to a cohesive brand identity."
                    imageSrc="/images/services/branding.jpg"
                    alt="Creative Work"
                />
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// ServiceRow Component
// ─────────────────────────────────────────────────────────────────────────────
function ServiceRow({
                        index,
                        title,
                        description,
                        imageSrc,
                        alt,
                    }: {
    index: string;
    title: string;
    description: string;
    imageSrc: string | StaticImageData;
    alt: string;
}) {
    return (
        <motion.div
            className="
        flex
        flex-col
        items-start
        gap-4
        py-6
        md:flex-row
        md:items-center
        md:justify-between
      "
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            {/* Image */}
            <div className="relative h-24 w-full flex-shrink-0 overflow-hidden rounded-md md:h-28 md:w-40">
                <Image
                    src={imageSrc}
                    alt={alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 200px"
                />
            </div>

            {/* Text Info */}
            <div className="flex w-full flex-col gap-1 md:flex-grow md:px-6">
                <h3 className="flex items-center text-xl font-semibold md:text-2xl">
                    {title}
                    <span className="ml-2 text-gray-300 group-hover:translate-x-1">
                        <ArrowUpRight className="w-4 h-4" />

          </span>
                </h3>
                <p className="text-sm text-zinc-300 md:text-base">{description}</p>
            </div>

            {/* Index Number */}
            <div className="hidden flex-shrink-0 text-zinc-400 md:block">
                {index}
            </div>
        </motion.div>
    );
}
