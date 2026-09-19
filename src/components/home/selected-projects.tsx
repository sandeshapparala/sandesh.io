import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { caseStudies } from "@/content/case-studies";
import { ClientLogo, hasClientLogo } from "@/components/work/client-logo";

export function SelectedProjects() {
  return (
    <div className="selected-projects">
      {caseStudies.map((project, index) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className={`project-row project-${project.tone}`}
        >
          <span className="project-index">0{index + 1}</span>
          <div className="project-row-copy">
            <span className="tiny-label">
              {project.sector} · WhatsApp AI agent
            </span>
            <h3>{project.name}</h3>
            <p>{project.title}</p>
            <p className="project-period">{project.period}</p>
            {project.results && (
              <div className="project-results">
                <span>Owner-reported results</span>
                <div>
                  {project.results.map((result) => (
                    <span key={result.label}>
                      <strong>{result.value}</strong> {result.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <span className="project-row-link">
              Explore the project <ArrowUpRight size={17} />
            </span>
          </div>
          <div className="project-canvas" aria-hidden="true">
            <div className="project-orbit" />
            {hasClientLogo(project.name) ? (
              <div className="project-brand">
                <ClientLogo name={project.name} />
              </div>
            ) : (
              <span className="project-monogram">
                {project.shortName.charAt(0)}
              </span>
            )}
            <div className="project-floating">
              <MessageCircle size={20} />
              <span>
                {project.shortName}
                <small>WhatsApp AI agent</small>
              </span>
              <span className="project-tile-arrow">
                <ArrowUpRight size={16} />
              </span>
            </div>
            <span className="project-canvas-caption">{project.focus}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
