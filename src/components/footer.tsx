import Link from 'next/link'
import Image from 'next/image'

const links = [
    {
        group: 'Navigation',
        items: [
            { title: 'About', href: '#about' },
            { title: 'Services', href: '#services' },
            { title: 'Projects', href: '/projects' },
            { title: 'Process', href: '#process' },
            { title: 'Testimonials', href: '#testimonials' },
            { title: 'Book a Call', href: '#booking' },
        ],
    },
    {
        group: 'Services',
        items: [
            { title: 'AI Automation', href: '#services' },
            { title: 'CMS-Driven Websites', href: '#services' },
            { title: 'Animated UI/UX', href: '#services' },
            { title: 'API Integrations', href: '#services' },
            { title: 'Tech Strategy', href: '#services' },
        ],
    },
    {
        group: 'Connect',
        items: [
            { title: 'hello@sandesh.io', href: 'mailto:hello@sandesh.io' },
            { title: 'LinkedIn', href: 'https://linkedin.com/in/SandeshApparala' },
            { title: 'GitHub', href: 'https://github.com/sandeshapparala' },
            { title: 'Instagram', href: 'https://instagram.com/SandeshApparala' },
            { title: 'Twitter / X', href: 'https://twitter.com/SandeshApparala' },
        ],
    },
]

export default function FooterSection() {
    return (
        <footer className="border-b bg-white pt-20 dark:bg-transparent">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid gap-12 md:grid-cols-5">
                    <div className="md:col-span-2">
                        <Link href="/" aria-label="go home" className="block size-fit">
                            <Image src={"/logow.png"} alt={"Sandesh Apparala"} width={100} height={40} className="-ml-2" />
                        </Link>
                        <div className="mt-4 space-y-4">
                            <p className="text-sm text-muted-foreground max-w-[50ch]">
                                I build AI-powered digital experiences — fast, scalable, and smart.
                                From web platforms to automation workflows, I help founders ship bold, intelligent products.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:col-span-3">
                        {links.map((link, index) => (
                            <div key={index} className="space-y-4 text-sm">
                                <span className="block font-medium">{link.group}</span>
                                {link.items.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={item.href}
                                        className="text-muted-foreground hover:text-primary block duration-150"
                                        {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                    >
                                        <span>{item.title}</span>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6">
                    <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
                        © {new Date().getFullYear()} Sandesh Apparala. All rights reserved.
                    </span>
                    <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
                        <Link
                            href="https://linkedin.com/in/SandeshApparala"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="text-muted-foreground hover:text-primary block">
                            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
                            </svg>
                        </Link>
                        <Link
                            href="https://github.com/sandeshapparala"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="text-muted-foreground hover:text-primary block">
                            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                            </svg>
                        </Link>
                        <Link
                            href="https://instagram.com/SandeshApparala"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="text-muted-foreground hover:text-primary block">
                            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" />
                            </svg>
                        </Link>
                        <Link
                            href="https://twitter.com/SandeshApparala"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter / X"
                            className="text-muted-foreground hover:text-primary block">
                            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.73-8.835L1.254 2.25H8.08l4.259 5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
