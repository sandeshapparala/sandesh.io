import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import "./footer.css";

export function Footer() {
  return (
    <footer className="signature-footer">
      <div className="container">
        <div className="signature-footer-top">
          <div className="signature-footer-note">
            <span className="eyebrow">
              Independent engineer. Personal attention.
            </span>
            <p>
              Thoughtful AI.
              <br />
              <span className="serif">Useful by design.</span>
            </p>
            <a href={`mailto:${site.email}`} className="footer-email">
              {site.email}
              <ArrowUpRight size={19} />
            </a>
          </div>
          <nav
            className="signature-footer-links"
            aria-label="Footer navigation"
          >
            <span className="tiny-label">Explore</span>
            <Link href="/services">Services</Link>
            <Link href="/work">Client work</Link>
            <Link href="/about">About me</Link>
            <Link href="/contact">Get in touch</Link>
          </nav>
          <div className="signature-footer-links">
            <span className="tiny-label">Elsewhere</span>
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
        <Link
          href="/"
          className="signature-wordmark"
          aria-label="Sandesh Apparala home"
        >
          sandesh<span>.</span>io
          <ArrowUpRight aria-hidden="true" />
        </Link>
        <div className="signature-footer-bottom">
          <span>© {new Date().getFullYear()} Sandesh Apparala</span>
          <span>AI agents · Websites · Thoughtful automation</span>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
