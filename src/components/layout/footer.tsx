import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer container">
      <div className="footer-main">
        <div>
          <Link href="/" className="wordmark">
            sandesh<span className="wordmark-dot">.</span>io
          </Link>
          <p>
            Thoughtful AI. Useful outcomes.
            <br />
            Built and managed by Sandesh Apparala.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/services/whatsapp-ai-agents">AI agents</Link>
          <Link href="/work">Client work</Link>
          <Link href="/about">About me</Link>
          <Link href="/contact">Get in touch</Link>
        </div>
        <div className="footer-links">
          <a href={`mailto:${site.email}`}>
            {site.email}
            <ArrowUpRight size={14} />
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
            <ArrowUpRight size={14} />
          </a>
          <a href={site.github} target="_blank" rel="noreferrer">
            GitHub
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Sandesh Apparala</span>
        <span>Independent engineer. Personal attention.</span>
        <Link href="/privacy">Privacy</Link>
      </div>
    </footer>
  );
}
