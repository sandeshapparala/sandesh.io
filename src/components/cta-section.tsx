import type React from "react"
import Link from "next/link"

export default function CTASection() {
    return (
        <div className="relative overflow-hidden">
            <section className="relative z-20 mx-auto my-20 grid w-full max-w-7xl px-4 grid-cols-1 justify-start bg-gradient-to-br from-gray-100 to-white md:my-20 md:grid-cols-3 dark:from-neutral-900 dark:to-neutral-950">
                {/* Top Border */}
                <div
                    className="absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))] bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] top-0"
                    style={
                        {
                            "--background": "#ffffff",
                            "--color": "rgba(0, 0, 0, 0.2)",
                            "--height": "1px",
                            "--width": "5px",
                            "--fade-stop": "90%",
                            "--offset": "200px",
                            "--color-dark": "rgba(255, 255, 255, 0.2)",
                            maskComposite: "exclude",
                        } as React.CSSProperties
                    }
                />

                {/* Bottom Border */}
                <div
                    className="absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))] bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] top-auto bottom-0"
                    style={
                        {
                            "--background": "#ffffff",
                            "--color": "rgba(0, 0, 0, 0.2)",
                            "--height": "1px",
                            "--width": "5px",
                            "--fade-stop": "90%",
                            "--offset": "200px",
                            "--color-dark": "rgba(255, 255, 255, 0.2)",
                            maskComposite: "exclude",
                        } as React.CSSProperties
                    }
                />

                {/* Left Border */}
                <div
                    className="absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] left-0"
                    style={
                        {
                            "--background": "#ffffff",
                            "--color": "rgba(0, 0, 0, 0.2)",
                            "--height": "5px",
                            "--width": "1px",
                            "--fade-stop": "90%",
                            "--offset": "80px",
                            "--color-dark": "rgba(255, 255, 255, 0.2)",
                            maskComposite: "exclude",
                        } as React.CSSProperties
                    }
                />

                {/* Right Border */}
                <div
                    className="absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] right-0 left-auto"
                    style={
                        {
                            "--background": "#ffffff",
                            "--color": "rgba(0, 0, 0, 0.2)",
                            "--height": "5px",
                            "--width": "1px",
                            "--fade-stop": "90%",
                            "--offset": "80px",
                            "--color-dark": "rgba(255, 255, 255, 0.2)",
                            maskComposite: "exclude",
                        } as React.CSSProperties
                    }
                />

                {/* Left Column - CTA Content */}
                <div className="p-8 md:col-span-2 md:p-14">
                    <h2 className="text-left text-xl font-medium tracking-tight text-neutral-500 md:text-3xl dark:text-neutral-200">
                        Want a professional, extraordinary website tailored to your needs? &nbsp;
                        <span className="font-bold text-black dark:text-white">Get in touch</span>
                    </h2>

                    <p className="mt-4 max-w-lg text-left text-base font-medium tracking-tight text-neutral-500 md:text-base dark:text-neutral-200">
                        We&#39;ve helped thousands of <span className="text-sky-700">founders and teams</span> build their products and
                        apps from scratch, and we can help you too.
                    </p>

                    <div className="flex flex-col items-start sm:flex-row sm:items-center sm:gap-4">
                        <div className="mt-6 flex justify-center">
                            <Link
                                href="#contact"
                                className="no-underline flex space-x-2 group cursor-pointer transition duration-200 p-px font-semibold px-4 py-2 w-full sm:w-44 h-10 rounded-lg text-sm text-center items-center justify-center relative z-20 bg-black dark:bg-white dark:text-black text-white"
                            >
                                Talk to us
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Column - Testimonial */}
                <div className="border-t border-dashed p-8 md:border-t-0 md:border-l md:p-14">
                    <p className="text-base text-neutral-700 dark:text-neutral-200">
                        Manu literally took our requirements and quite literally ran with them. To anyone reading this - I can&#39;t
                        recommend Manu enough, your job will be done exceptionally well, and you will be delighted with the end
                        result.
                    </p>

                    <div className="mt-4 flex flex-col items-start gap-1 text-sm">
                        <p className="font-bold text-neutral-800 dark:text-neutral-200">John Shahawy</p>
                        <p className="text-neutral-500 dark:text-neutral-400">Founder - Moonbeam, Rogue.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
