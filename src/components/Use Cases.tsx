import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Monitor, Bot, Target, ArrowRight } from 'lucide-react'
import { ReactNode } from 'react'
import Link from 'next/link'

export default function UseCases() {
    return (
        <section className="py-8 md:py-8">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">What I Do</h2>
                    <p className="mx-auto mt-8 max-w-xl px-4 text-center text-base/6 text-gray-200">I help businesses build modern, high-performance websites and integrate AI solutions that save time, improve efficiency, and drive growth.</p>
                </div>
                <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 [--color-background:var(--color-muted)] [--color-card:var(--color-muted)] *:text-center md:mt-4 dark:[--color-muted:var(--color-zinc-900)]">
                    <Card className="group border-0 shadow-none bg-background">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Monitor
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>
                            <h3 className="mt-6 text-2xl font-medium">Web Development</h3>
                        </CardHeader>
                        <CardContent className="flex flex-col h-full">
                            <div className="text-sm -mt-4 space-y-1 text-center flex-grow">
                                <p className="font-medium text-gray-800 dark:text-gray-200 mb-3">Fast, SEO-optimized websites that help you rank higher and convert more visitors.</p>
                                <p>• Next.js websites built for performance</p>
                                <p>• Clean, responsive design</p>
                                <p>• CMS integration (Sanity, Prismic, etc.)</p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <Link href="/case-studies" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                                    See Case Studies
                                    <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="group border-0 shadow-none bg-background">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Bot
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>
                            <h3 className="mt-6 font-medium text-2xl">AI Integration</h3>
                        </CardHeader>
                        <CardContent className="flex flex-col h-full">
                            <div className="text-sm -mt-4 space-y-1 text-center flex-grow">
                                <p className="font-medium text-gray-800 dark:text-gray-200 mb-3">AI-powered tools that save you hours and deliver better customer experiences.</p>
                                <br />
                                <p>• GPT chatbots for support & lead-gen</p>
                                <p>• RAG search for PDFs and docs</p>
                                <p>• Automations that cut repetitive work</p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <Link href="/ai-features" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                                    Explore AI Features
                                    <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="group border-0 shadow-none bg-background">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Target
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>
                            <h3 className="mt-6 font-medium text-2xl">Tech Strategy</h3>
                        </CardHeader>
                        <CardContent className="flex flex-col h-full">
                            <div className="text-sm -mt-4 space-y-1 text-center flex-grow">
                                <p className="font-medium text-gray-800 dark:text-gray-200 mb-3">Clarity on the right stack so you invest smartly and grow faster.</p>
                                <br />
                                <p>• Help map the right tech stack</p>
                                <p>• Identify AI opportunities for ROI</p>
                                <p>• Ongoing consulting to stay ahead</p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <Link href="/strategy-call" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                                    Book a Strategy Call
                                    <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                {/* Section CTA */}
                <div className="text-center mt-8">
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                        Not sure which service is right for you? Let&apos;s discuss your project.
                    </p>
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                        <Link href="/book-call">
                            👉 Book a Free Call
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
        />
        <div
            aria-hidden
            className="bg-radial to-background absolute inset-0 from-transparent to-75%"
        />
        <div className="dark:bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t bg-white">{children}</div>
    </div>
)
