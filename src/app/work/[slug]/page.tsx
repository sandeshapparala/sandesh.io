import { notFound } from "next/navigation";
import { caseStudies } from "@/content/case-studies";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink, TextLink } from "@/components/ui/links";
import { ContactCTA } from "@/components/home/sections";
import { site } from "@/content/site";
import { ClientLogo, hasClientLogo } from "@/components/work/client-logo";

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = caseStudies.find((item) => item.slug === slug);
  if (!project) return {};
  return pageMetadata(
    `${project.name} WhatsApp AI agent`,
    project.summary,
    `/work/${project.slug}`,
  );
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = caseStudies.find((item) => item.slug === slug);
  if (!project) notFound();
  return (
    <main id="main">
      <div className="page-hero container">
        <div className="back-link">
          <TextLink href="/work">All client work</TextLink>
        </div>
        <span className="eyebrow">Client project · WhatsApp AI agent</span>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
      </div>
      <section className="container" aria-label={project.name}>
        <div className={`detail-banner ${project.tone}`}>
          <div className="detail-meta">
            <span>{project.sector}</span>
            <span>Custom AI implementation</span>
          </div>
          {hasClientLogo(project.name) ? (
            <ClientLogo name={project.name} />
          ) : (
            <div className="client-wordmark">
              {project.shortName}
              <span>
                {project.slug === "tungabhadra-developers"
                  ? "DEVELOPERS · SRINGERI"
                  : "CONSTRUCTIONS"}
              </span>
            </div>
          )}
          <div className="detail-meta">
            <span>Built by Sandesh Apparala</span>
            <span>WhatsApp</span>
          </div>
        </div>
        <div className="article-layout">
          <dl className="article-facts">
            <div>
              <dt>Project period</dt>
              <dd>{project.period}</dd>
            </div>
            <div>
              <dt>Client</dt>
              <dd>{project.name}</dd>
            </div>
            <div>
              <dt>Sector</dt>
              <dd>{project.sector}</dd>
            </div>
            <div>
              <dt>My role</dt>
              <dd>AI agent engineering</dd>
            </div>
            <div>
              <dt>Project focus</dt>
              <dd>{project.focus}</dd>
            </div>
          </dl>
          <div>
            <span className="eyebrow">The project</span>
            <h2>A useful agent starts with the business.</h2>
            <p style={{ marginTop: 24 }}>{project.introduction}</p>
            {project.results && (
              <div className="reported-results">
                <span className="eyebrow">Owner-reported results</span>
                <dl>
                  {project.results.map((result) => (
                    <div key={result.label}>
                      <dt>{result.label}</dt>
                      <dd>{result.value}</dd>
                    </div>
                  ))}
                </dl>
                <p>{project.resultsNote}</p>
              </div>
            )}
            <p>
              This is a concise project overview. If you’re exploring a similar
              workflow, we can discuss your requirements, the information your
              agent needs, and the right next steps for your team.
            </p>
            <div style={{ marginTop: 32 }}>
              <ButtonLink href="/contact">Discuss a similar project</ButtonLink>
              <p style={{ marginTop: 20 }}>
                <a className="text-link" href={site.demoUrl}>
                  Try the AI agent demo on WhatsApp ↗
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <ContactCTA />
    </main>
  );
}
