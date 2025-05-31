
import type React from "react"

import { Button } from "@/components/ui/button"
import LogoCloud from "@/components/logo-cloud"

export default function HeroSection() {
    return (

        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 md:px-8 md:py-40 bg-black z-10">

            {/* Grid Background Pattern */}
            <div className="pointer-events-none absolute inset-0 z-0 grid h-full w-full -rotate-45 transform select-none grid-cols-2 gap-10 md:grid-cols-4">
                {/* Grid Column 1 */}
                <div className="relative h-full w-full">
                    <div
                        className="absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] left-0"
                        style={
                            {
                                "--background": "#000000",
                                "--color": "rgba(255, 255, 255, 0.3)",
                                "--height": "5px",
                                "--width": "1px",
                                "--fade-stop": "90%",
                                "--offset": "150px",
                                "--color-dark": "rgba(255, 255, 255, 0.3)",
                                maskComposite: "exclude",
                            } as React.CSSProperties
                        }
                    />
                    <div
                        className="absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] left-auto right-0"
                        style={
                            {
                                "--background": "#000000",
                                "--color": "rgba(255, 255, 255, 0.3)",
                                "--height": "5px",
                                "--width": "1px",
                                "--fade-stop": "90%",
                                "--offset": "150px",
                                "--color-dark": "rgba(255, 255, 255, 0.3)",
                                maskComposite: "exclude",
                            } as React.CSSProperties
                        }
                    />
                </div>

                {/* Grid Column 2 */}
                <div className="relative h-full w-full">
                    <div
                        className="absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] left-0"
                        style={
                            {
                                "--background": "#000000",
                                "--color": "rgba(255, 255, 255, 0.3)",
                                "--height": "5px",
                                "--width": "1px",
                                "--fade-stop": "90%",
                                "--offset": "150px",
                                "--color-dark": "rgba(255, 255, 255, 0.3)",
                                maskComposite: "exclude",
                            } as React.CSSProperties
                        }
                    />
                    <div
                        className="absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] left-auto right-0"
                        style={
                            {
                                "--background": "#000000",
                                "--color": "rgba(255, 255, 255, 0.3)",
                                "--height": "5px",
                                "--width": "1px",
                                "--fade-stop": "90%",
                                "--offset": "150px",
                                "--color-dark": "rgba(255, 255, 255, 0.3)",
                                maskComposite: "exclude",
                            } as React.CSSProperties
                        }
                    />
                </div>

                {/* Grid Column 3 - Center with gradient */}
                <div className="relative h-full w-full bg-gradient-to-b from-transparent via-neutral-800 to-transparent">
                    <div
                        className="absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] left-0"
                        style={
                            {
                                "--background": "#000000",
                                "--color": "rgba(255, 255, 255, 0.3)",
                                "--height": "5px",
                                "--width": "1px",
                                "--fade-stop": "90%",
                                "--offset": "150px",
                                "--color-dark": "rgba(255, 255, 255, 0.3)",
                                maskComposite: "exclude",
                            } as React.CSSProperties
                        }
                    />
                    <div
                        className="absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] left-auto right-0"
                        style={
                            {
                                "--background": "#000000",
                                "--color": "rgba(255, 255, 255, 0.3)",
                                "--height": "5px",
                                "--width": "1px",
                                "--fade-stop": "90%",
                                "--offset": "150px",
                                "--color-dark": "rgba(255, 255, 255, 0.3)",
                                maskComposite: "exclude",
                            } as React.CSSProperties
                        }
                    />
                </div>

                {/* Grid Column 4 */}
                <div className="relative h-full w-full">
                    <div
                        className="absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] left-0"
                        style={
                            {
                                "--background": "#000000",
                                "--color": "rgba(255, 255, 255, 0.3)",
                                "--height": "5px",
                                "--width": "1px",
                                "--fade-stop": "90%",
                                "--offset": "150px",
                                "--color-dark": "rgba(255, 255, 255, 0.3)",
                                maskComposite: "exclude",
                            } as React.CSSProperties
                        }
                    />
                    <div
                        className="absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] left-auto right-0"
                        style={
                            {
                                "--background": "#000000",
                                "--color": "rgba(255, 255, 255, 0.3)",
                                "--height": "5px",
                                "--width": "1px",
                                "--fade-stop": "90%",
                                "--offset": "150px",
                                "--color-dark": "rgba(255, 255, 255, 0.3)",
                                maskComposite: "exclude",
                            } as React.CSSProperties
                        }
                    />
                </div>
            </div>            {/* Content */}            <h1 className="relative z-50 mx-auto mb-4 mt-4 max-w-4xl text-balance text-center text-3xl font-semibold tracking-tight text-neutral-300 md:text-7xl leading-tight">
                Bringing Ideas to Life with Artificial Intelligence.
            </h1>

            <p className="relative z-50 mx-auto mt-4 max-w-xl px-4 text-center text-base/6 text-gray-200">
                We design and build generative AI tools, intelligent interfaces, and CMS-powered platforms for startups and
                brands that dare to lead.
            </p>            <div className="mb-10 mt-8 flex w-full flex-col items-center justify-center gap-4 px-8 sm:flex-row md:mb-20">
                <Button className="group relative z-20 flex h-10 w-full cursor-pointer items-center justify-center space-x-2 rounded-lg bg-white p-px px-4 py-2 text-center text-sm font-semibold leading-6 text-black no-underline transition duration-200 sm:w-52">
                    Start a Project
                </Button>
                <Button
                    variant="outline"
                    className="shadow-input group relative z-20 flex h-10 w-full cursor-pointer items-center justify-center space-x-2 rounded-lg bg-neutral-800 p-px px-4 py-2 text-sm font-semibold leading-6 text-white no-underline transition duration-200 hover:-translate-y-0.5 sm:w-52"
                >
                    Start a Project
                </Button>
            </div>
            <div>
                <LogoCloud />
            </div>
        </div>
    )
}
