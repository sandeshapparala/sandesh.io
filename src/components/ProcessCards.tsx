import {
    ProcessCardTitle, ContainerScroll,
    ContainerSticky,
    ProcessCard,
    ProcessCardBody
} from "@/components/process-timeline";
import {GridPattern} from "@/components/magicui/grid-pattern";
import {cn} from "@/lib/utils";

const PROCESS_PHASES = [
    {
        id: "process-1",
        title: "Discover",
        description:
            "Understand your goals & challenges\n• 30-min free strategy call\n• Review current website & needs\n• Define scope, timeline, and success metrics",
    },
    {
        id: "process-2",
        title: "Design",
        description:
            "Plan and prototype with clarity\n• Wireframes & content structure\n• Visual direction & motion ideas\n• Feedback & iteration until approved",
    },
    {
        id: "process-3",
        title: "Build",
        description:
            "Develop with performance in mind\n• Next.js for speed & SEO\n• Django + APIs for back-end\n• AI integrations (chatbots, RAG, automations)\n• QA, mobile responsiveness, and performance tests",
    },
    {
        id: "process-4",
        title: "Launch & Support",
        description:
            "Deliver and optimize for growth\n• Deploy to production (Vercel / custom hosting)\n• Training + handover docs\n• 30-day support & bug fixes\n• Optional ongoing maintenance/retainer",
    },
    {
        id: "process-5",
        title: "Partner",
        description:
            "Not just a project, a long-term ally\n• Continuous advisory & optimization\n• Future-ready AI integrations\n• Helping your brand stay competitive",
    },
]

export const ProcessCards = () => {
    return (
        <ContainerScroll
            className="container px-6 py-12 h-[150vh]"
        >
            <ContainerSticky className=" top-20 mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-16">

                <div className="mb-8 space-y-4 text-center z-20 flex flex-col items-center justify-center">
                    <h2 className="bg-gradient-to-b from-neutral-800 via-white to-white bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
                       How I Work
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl px-4 text-center text-base/6 text-gray-200">
                       A clear, outcome-driven process that keeps projects smooth and stress-free from idea to launch.
                    </p>
                </div>


                <div className="flex flex-nowrap">
                    <GridPattern
                        width={30}
                        height={30}
                        x={-1}
                        y={-1}
                        strokeDasharray={"4 2"}
                        className={cn(
                            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] h-96",
                        )}
                    />
                    {PROCESS_PHASES.map((phase, index) => (
                        <ProcessCard
                            key={phase.id}
                            itemsLength={PROCESS_PHASES.length}
                            index={index}
                            className="min-w-[70%] max-w-[70%] "
                        >
                            <ProcessCardTitle className=" dark:[border:1px_solid_rgba(255,255,255,.1)]">
                                <div className="rounded-full size-8 bg- text-sm flex justify-center items-center">
                                    {String(index + 1).padStart(2, "0")}
                                </div>
                            </ProcessCardTitle>
                            <ProcessCardBody className="flex flex-col gap-5">
                                <h3 className=" text-3xl font-semibold leading-tight">
                                    {phase.title}
                                </h3>
                                <div className=" opacity-80">
                                    {phase.description.split('\n').map((line, idx) => (
                                        <div key={idx} className={idx === 0 ? "font-semibold mb-2" : "mb-1"}>
                                            {line}
                                        </div>
                                    ))}
                                </div>
                            </ProcessCardBody>
                        </ProcessCard>
                    ))}
                </div>
            </ContainerSticky>
        </ContainerScroll>
    )
}
