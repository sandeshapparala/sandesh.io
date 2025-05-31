import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Briefcase, Rocket, PenTool } from 'lucide-react'
import { ReactNode } from 'react'

export default function UseCases() {
    return (
        <section className="py-16 md:py-32">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Who We Build For</h2>
                    <p className="mx-auto mt-4 max-w-xl px-4 text-center text-base/6 text-gray-200">Whether you&#39;re a startup founder, digital agency, or enterprise team, Kōva AI helps bring your vision to life with speed, intelligence, and creativity.</p>
                </div>
                <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 [--color-background:var(--color-muted)] [--color-card:var(--color-muted)] *:text-center md:mt-16 dark:[--color-muted:var(--color-zinc-900)]">
                    <Card className="group border-0 shadow-none bg-background">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Rocket
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>
                            <h3 className="mt-6 font-medium">Startups</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm -mt-4">Fast-moving teams that need launch-ready AI tools.</p>
                        </CardContent>
                    </Card>

                    <Card className="group border-0 shadow-none bg-background">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <PenTool
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>
                            <h3 className="mt-6 font-medium">Agencies</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm -mt-4">Custom AI solutions to scale your client services.</p>
                        </CardContent>
                    </Card>

                    <Card className="group border-0 shadow-none bg-background">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Briefcase
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>
                            <h3 className="mt-6 font-medium">Enterprises</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm -mt-4">Enterprise-grade integrations and workflows, built for scale.</p>
                        </CardContent>
                    </Card>
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
