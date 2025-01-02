"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function BackgroundBeams({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "absolute inset-0 z-0 opacity-50",
                "bg-gradient-to-t from-black to-neutral-950",
                className
            )}
        >
            <div
                className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:radial-gradient(white,transparent_85%)]"
                style={{
                    backgroundSize: "30px 30px",
                    opacity: 0.2,
                }}
            />

            <div className="absolute inset-0 bg-black/50" />

            {/* Animated beams */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[500px] w-[500px] animate-pulse">
                    <div className="absolute inset-0 rotate-45 bg-gradient-to-r from-primary/20 to-transparent blur-3xl" />
                    <div className="absolute inset-0 -rotate-45 bg-gradient-to-l from-primary/20 to-transparent blur-3xl" />
                </div>
            </div>
        </div>
    );
}