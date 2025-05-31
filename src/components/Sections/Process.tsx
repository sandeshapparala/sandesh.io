"use client";

import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
import {ProcessCards} from "@/components/ProcessCards";

export function Process() {
    return (
        <div className="relative min-h-[100vh] flex items-center justify-center overflow-hidden rounded-lg border bg-background p-20">
            <GridPattern
                width={30}
                height={30}
                x={-1}
                y={-1}
                strokeDasharray={"4 2"}
                className={cn(
                    "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                )}
            />

            <div className="w-full">
                <ProcessCards />
            </div>
        </div>
    );
}
