'use client'
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { useRef } from "react"

import data from "./data.json"

export default function Dashboard({ className }: { className?: string }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    return (
        <SidebarProvider
            className={cn("isolate", className)}
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 60)",
                    "--header-height": "calc(var(--spacing) * 10)",
                    // Set a fixed width that's more reasonable for the container
                    width: "1100px",
                    // Scale down the entire dashboard
                    transform: "scale(0.5)",
                    transformOrigin: "top left",
                    // Position adjustment to center the content better
                    marginLeft: "-100px",
                    overflow: "hidden",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col overflow-hidden">
                    <div 
                        ref={scrollContainerRef}
                        className="@container/main flex flex-1 flex-col gap-2 overflow-y-auto scrollbar-hide"
                        onWheel={(e) => {
                            e.stopPropagation();
                        }}
                        onTouchMove={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <SectionCards />
                            <div className="px-4 lg:px-6">
                                <ChartAreaInteractive />
                            </div>
                            <DataTable data={data} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}