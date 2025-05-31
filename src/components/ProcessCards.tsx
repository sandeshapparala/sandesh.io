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
        title: "Research and Analysis",
        description:
            "With your vision in mind, we enter the Research and Analysis phase. Here, we examine your competitors, industry trends, and user preferences. This informed approach ensures your website stands out and provides an excellent user experience.",
    },
    {
        id: "process-2",
        title: "Wireframing and Prototyping",
        description:
            "We move on to Wireframing and Prototyping, where we create skeletal representations of your website's pages. These visual indigoprints allow us to test and refine the user experience before diving into design.",
    },
    {
        id: "process-3",
        title: "Design Creation",
        description:
            "Now, it's time for the Design Creation phase. Our talented designers bring your vision to life. We focus on aesthetics, ensuring your website not only looks stunning but also aligns perfectly with your brand identity.",
    },
    {
        id: "process-4",
        title: "Development and Testing",
        description:
            "In the Development and Testing phase, our skilled developers turn designs into a fully functional website. Rigorous testing ensures everything works seamlessly, providing an exceptional user experience.",
    },
    {
        id: "process-5",
        title: "Launch and Optimization",
        description:
            "Finally, we reach the Launch and Optimization phase. Your website goes live, and we monitor its performance. We make necessary adjustments to ensure it continues to meet your goals and exceed user expectations.",
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
                        Our Process
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl px-4 text-center text-base/6 text-gray-200">
                        We combine advanced AI workflows with stunning frontend design to build intelligent,
                        high-performance websites that captivate users and elevate brands.
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
                            <ProcessCardBody className="flex flex-col gap-10">
                                <h3 className=" text-3xl font-semibold leading-tight">
                                    {phase.title}
                                </h3>
                                <p className=" opacity-80">{phase.description}</p>
                            </ProcessCardBody>
                        </ProcessCard>
                    ))}
                </div>
            </ContainerSticky>
        </ContainerScroll>
    )
}
