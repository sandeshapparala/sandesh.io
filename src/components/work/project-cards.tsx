import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { caseStudies } from "@/content/case-studies";
import { websites } from "@/content/websites";

export function CaseCards() {
  return (
    <div className="case-grid">
      {caseStudies.map((project) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className="case-card"
        >
          <div className={`case-art ${project.tone}`}>
            <span className="case-sector">{project.sector}</span>
            <div className="client-wordmark">
              {project.shortName}
              <span>
                {project.slug === "tungabhadra-developers"
                  ? "DEVELOPERS · SRINGERI"
                  : "CONSTRUCTIONS"}
              </span>
            </div>
            <div className="case-art-bottom">
              <span>
                <MessageCircle size={16} /> WhatsApp AI agent
              </span>
              <span className="card-arrow">
                <ArrowUpRight size={20} />
              </span>
            </div>
          </div>
          <div className="case-text">
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <span className="text-link">
              View project <ArrowUpRight size={16} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function WebsiteCards({ all = false }: { all?: boolean }) {
  return (
    <div className="website-grid">
      {(all ? websites : websites.slice(0, 3)).map((project) => {
        const content = (
          <>
            <div className={`website-image ${project.tone}`}>
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.name} website imagery`}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 800px) 50vw, 33vw"
                />
              ) : (
                <div className="website-placeholder">
                  <span className="tiny-label">Website project</span>
                  <span className="serif">{project.name}</span>
                  <span>{project.domain}</span>
                </div>
              )}
              {project.url && (
                <span className="website-open">
                  <ArrowUpRight size={19} />
                  <span className="sr-only">Open website in a new tab</span>
                </span>
              )}
            </div>
            <div className="website-caption">
              <div>
                <h3>{project.name}</h3>
                <p>{project.category}</p>
              </div>
              {project.url && <ArrowUpRight size={19} aria-hidden="true" />}
            </div>
          </>
        );
        return project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            key={project.name}
            className="website-card"
          >
            {content}
          </a>
        ) : (
          <article className="website-card" key={project.name}>
            {content}
          </article>
        );
      })}
    </div>
  );
}
