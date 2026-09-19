"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { caseStudies } from "@/content/case-studies";
import { WebsiteCards } from "./project-cards";
import { ClientLogo, hasClientLogo } from "./client-logo";
import "./work.css";
const filters = ["All work", "AI agents", "Websites", "Ecommerce"] as const;
export function WorkCollection() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All work");
  return (
    <div className="work-collection container">
      <div className="work-filters" role="group" aria-label="Filter projects">
        {filters.map((item) => (
          <button
            key={item}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="work-filter-status sr-only" role="status">
        Showing {filter.toLowerCase()}
      </p>
      {(filter === "All work" || filter === "AI agents") && (
        <section
          id="ai-agents"
          className="work-group"
          aria-labelledby="agent-work-title"
        >
          <div className="work-group-title">
            <div>
              <span className="eyebrow">Conversations into possibilities</span>
              <h2 id="agent-work-title">AI agents, in the real world.</h2>
            </div>
            <span>03 PROJECTS</span>
          </div>
          <div className="work-agent-grid">
            {caseStudies.map((project, index) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className={`work-agent-card work-agent-${index}`}
              >
                <div className="work-agent-top">
                  <span>WHATSAPP AI AGENT</span>
                  <ArrowUpRight size={22} />
                </div>
                <div className="work-agent-identity">
                  {hasClientLogo(project.name) ? <ClientLogo name={project.name} /> : <span className="work-agent-icon">
                    <MessageCircle size={30} strokeWidth={1.3} />
                  </span>}
                  <h3>{project.name}</h3>
                  <p>{project.period}</p>
                </div>
                <p>{project.summary}</p>
                {project.results ? (
                  <div className="work-agent-results">
                    <span>Owner-reported results</span>
                    <strong>{project.results[0].value}</strong>
                    <span>{project.results[0].label}</span>
                  </div>
                ) : (
                  <div className="work-agent-results">
                    <span>Project focus</span>
                    <p>{project.focus}</p>
                  </div>
                )}
                <span className="work-agent-link">
                  View project <ArrowUpRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
      {(filter === "All work" || filter === "Websites") && (
        <section
          id="websites"
          className="work-group"
          aria-labelledby="website-work-title"
        >
          <div className="work-group-title">
            <div>
              <span className="eyebrow">A thoughtful presence</span>
              <h2 id="website-work-title">Websites with a point of view.</h2>
            </div>
            <span>BUSINESS WEBSITES</span>
          </div>
          <WebsiteCards all kind="website" />
        </section>
      )}
      {(filter === "All work" || filter === "Ecommerce") && (
        <section
          id="ecommerce"
          className="work-group"
          aria-labelledby="ecommerce-work-title"
        >
          <div className="work-group-title">
            <div>
              <span className="eyebrow">Built for discovery</span>
              <h2 id="ecommerce-work-title">Good brands. Better shopping.</h2>
            </div>
            <span>ECOMMERCE</span>
          </div>
          <WebsiteCards all kind="ecommerce" />
        </section>
      )}
    </div>
  );
}
