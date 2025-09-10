import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Twitter, Linkedin, Github, Facebook, Instagram } from 'lucide-react'
// import { TextHoverEffect } from "@/components/ui/text-hover-effect";


export function Footer() {
    return (
        <footer className="bg-accent text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center mb-8 text-foreground">
                    <div className="flex items-center mb-6">
                        {/*<Laptop className="h-6 w-6 mr-2" />*/}
                        <span className="text-xl font-semibold">Sandesh Apparala</span>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-6">
                        {['about', 'projects', 'services', 'testimonials', ].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="hover:text-accent-foreground transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                        <Link
                            href="/terms"
                            className="hover:text-accent-foreground transition-colors"
                        >
                            Terms
                        </Link>
                        <Link
                            href="/privacy"
                            className="hover:text-accent-foreground transition-colors"
                        >
                            Privacy Policy
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-800 pt-8 text-accent-foreground">
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 sm:mb-0">
                        <p className="text-sm">© Sandesh Apparala</p>
                        <div className="flex gap-4 text-sm">
                            <Link href="/terms" className="hover:text-white transition-colors">
                                Terms & Conditions
                            </Link>
                            <Link href="/privacy" className="hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <Button variant="ghost" size="icon" aria-label="Twitter">
                            <Link href="https://x.com/sandeshapparala" target="_blank" rel="noopener noreferrer">
                                <Twitter className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" aria-label="LinkedIn">
                            <Link href="https://linkedin.com/in/sandeshapparala" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" aria-label="GitHub">
                            <Link href="https://github.com/sandeshapparala" target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" aria-label="Facebook">
                            <Link href="https://facebook.com/sandeshapparala" target="_blank" rel="noopener noreferrer">
                                <Facebook className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" aria-label="Instagram">
                            <Link href="https://instagram.com/sandeshapparala" target="_blank" rel="noopener noreferrer">
                                <Instagram className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
                {/*<TextHoverEffect text="SO." />*/}

            </div>
        </footer>
    )

}

