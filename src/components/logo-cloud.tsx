import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

const STACK = [
    { name: 'Next.js', slug: 'nextdotjs' },
    { name: 'React', slug: 'react' },
    { name: 'TypeScript', slug: 'typescript' },
    { name: 'Tailwind CSS', slug: 'tailwindcss' },
    { name: 'OpenAI', slug: 'openai' },
    { name: 'Vercel', slug: 'vercel' },
    { name: 'Sanity', slug: 'sanity' },
    { name: 'Python', slug: 'python' },
]

export default function LogoCloud() {
    return (
        <section className="overflow-hidden py-8">
            <div className="group relative m-auto max-w-7xl px-6">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="md:max-w-44 md:border-r md:border-white/10 md:pr-6">
                        <p className="text-end text-sm text-gray-400 leading-snug">My Tech Stack</p>
                    </div>
                    <div className="relative py-6 md:w-[calc(100%-11rem)]">
                        <InfiniteSlider speedOnHover={20} speed={40} gap={80}>
                            {STACK.map((tech) => (
                                <div key={tech.slug} className="flex flex-col items-center gap-2">
                                    <img
                                        className="mx-auto h-6 w-fit brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                                        src={`https://cdn.simpleicons.org/${tech.slug}/ffffff`}
                                        alt={`${tech.name} logo`}
                                        height="24"
                                        width="24"
                                    />
                                    <span className="text-[10px] text-gray-500 tracking-wider uppercase">{tech.name}</span>
                                </div>
                            ))}
                        </InfiniteSlider>

                        <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20" />
                        <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20" />
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
