import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Workflow,
  PanelsTopLeft,
  ShoppingBag,
  Check,
} from "lucide-react";
import { services, type Service } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import { site } from "@/content/site";
import { WebsiteCards } from "@/components/work/project-cards";
import { ButtonLink } from "@/components/ui/links";
import "./services.css";

const icons = {
  agent: MessageCircle,
  integration: Workflow,
  website: PanelsTopLeft,
  ecommerce: ShoppingBag,
};
export function ServiceVisual({ service }: { service: Service }) {
  const Icon = icons[service.kind];
  if (service.kind === "website" || service.kind === "ecommerce") {
    const commerce = service.kind === "ecommerce";
    return (
      <div
        className={`service-visual service-screen visual-${service.kind}`}
        aria-hidden="true"
      >
        <div className="service-screen-frame">
          <div className="service-screen-bar">
            <span />
            <span />
            <span />
            <small>
              {commerce ? "meghamchocolate.com" : "zaxdesignstudio.com"}
            </small>
          </div>
          <div className="service-screen-image">
            <Image
              src={
                commerce
                  ? "/projects/megham-supplied.png"
                  : "/projects/zax-supplied.png"
              }
              alt=""
              fill
              sizes="(max-width: 700px) 90vw, 45vw"
            />
          </div>
        </div>
        <span className="service-visual-caption">
          Selected work · {commerce ? "Megham Chocolate" : "ZAX Design Studio"}
        </span>
      </div>
    );
  }
  const steps =
    service.kind === "agent"
      ? ["An enquiry arrives", "A useful conversation", "Your team takes over"]
      : ["Your information", "An agreed workflow", "The right next action"];
  return (
    <div className={`service-visual visual-${service.kind}`} aria-hidden="true">
      <div className="service-visual-ring" />
      <span className="service-visual-symbol">
        <Icon size={36} strokeWidth={1.3} />
      </span>
      <div className="service-visual-flow">
        {steps.map((step, index) => (
          <div key={step}>
            <span>0{index + 1}</span>
            <strong>{step}</strong>
            {index === 2 ? <Check size={16} /> : <ArrowRight size={16} />}
          </div>
        ))}
      </div>
      <span className="service-visual-caption">
        {service.kind === "agent"
          ? "A conversation with somewhere to go."
          : "Designed around the way you work."}
      </span>
    </div>
  );
}
export function ServiceOverview() {
  return (
    <main id="main" className="services-page">
      <header className="service-hero container">
        <span className="eyebrow">What I can build with you</span>
        <h1>
          Useful AI.
          <br />
          <span className="serif">Thoughtful digital experiences.</span>
        </h1>
        <div className="service-hero-bottom">
          <p>
            AI agents are my focus. The workflows, websites, and stores around
            them bring the bigger picture together.
          </p>
          <a href="#service-list" className="text-link">
            Find your starting point <ArrowRight size={17} />
          </a>
        </div>
      </header>
      <section
        id="service-list"
        className="service-list container"
        aria-label="Services"
      >
        {services.map((service, index) => (
          <article key={service.slug} className="service-feature">
            <div className="service-feature-copy">
              <span className="service-index">
                0{index + 1} /{" "}
                {service.kind === "agent"
                  ? "MY PRIMARY FOCUS"
                  : "BUILT AROUND YOUR BUSINESS"}
              </span>
              <h2>{service.title}</h2>
              <p>{service.summary}</p>
              <ul>
                {service.features.slice(0, 3).map((feature) => (
                  <li key={feature.title}>{feature.title}</li>
                ))}
              </ul>
              <Link
                href={`/services/${service.slug}`}
                className="button button-secondary"
              >
                Explore the service <ArrowUpRight size={18} />
              </Link>
            </div>
            <Link
              href={`/services/${service.slug}`}
              className="service-visual-link"
              aria-label={`Explore ${service.title}`}
            >
              <ServiceVisual service={service} />
            </Link>
          </article>
        ))}
      </section>
      <ServiceCare />
      <ServiceClosing />
    </main>
  );
}
function ServiceCare() {
  return (
    <section className="service-care container">
      <div>
        <span className="eyebrow">Beyond the launch</span>
        <h2>
          Built together.
          <br />
          <span className="serif">Looked after, too.</span>
        </h2>
      </div>
      <div>
        <p>
          A useful agent keeps pace with your business. Conversation reviews,
          approved knowledge updates, and scoped improvements can be part of a
          monthly management plan.
        </p>
        <Link href="/services/agent-management" className="text-link">
          Explore ongoing agent care <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
function ServiceClosing() {
  return (
    <section className="service-closing container">
      <span className="eyebrow">A good place to start</span>
      <h2>
        Tell me what
        <br />
        <span className="serif">you have in mind.</span>
      </h2>
      <p>We’ll work out the useful next step together.</p>
      <ButtonLink href="/contact">Let’s discuss your project</ButtonLink>
    </section>
  );
}
export function ServiceDetail({ service }: { service: Service }) {
  const isAgent = service.kind === "agent";
  const relatedAgents = isAgent || service.kind === "integration";
  return (
    <main id="main" className="services-page">
      <header className="service-detail-hero container">
        <Link href="/services" className="service-back">
          Services / {service.title}
        </Link>
        <div className="service-detail-grid">
          <div>
            <span className="eyebrow">{service.eyebrow}</span>
            <h1>
              {service.headline}
              <br />
              <span className="serif">{service.accent}</span>
            </h1>
            <p>{service.intro}</p>
            <div className="service-actions">
              <ButtonLink href="/contact">Discuss your project</ButtonLink>
              {isAgent && (
                <a className="text-link" href={site.demoUrl}>
                  Try the WhatsApp demo <ArrowUpRight size={17} />
                </a>
              )}
            </div>
          </div>
          <ServiceVisual service={service} />
        </div>
      </header>
      <section className="service-fit container">
        <span className="eyebrow">A good fit for</span>
        <p>{service.fit}</p>
      </section>
      <section className="service-capabilities container">
        <div className="service-section-heading">
          <span className="eyebrow">The scope we shape together</span>
          <h2>
            Practical details.
            <br />
            <span className="serif">Thoughtfully connected.</span>
          </h2>
        </div>
        <div className="service-capability-grid">
          {service.features.map((feature, index) => (
            <article key={feature.title}>
              <span>0{index + 1}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="service-portfolio container">
        <div className="service-section-heading">
          <span className="eyebrow">
            {service.kind === "integration"
              ? "Related experience"
              : "Selected work"}
          </span>
          <h2>
            {service.kind === "integration"
              ? "Agent projects. Practical foundations."
              : "A closer look at the work."}
          </h2>
          <p>
            {service.kind === "integration"
              ? "These are delivered AI-agent projects, not standalone integration case studies. Specific connections are scoped for each new project."
              : "Projects built for real businesses, with their own requirements and character."}
          </p>
        </div>
        {relatedAgents ? (
          <div className="service-agent-projects">
            {caseStudies.map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`}>
                <span className="eyebrow">{project.period}</span>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <span className="text-link">
                  Explore the project <ArrowUpRight size={17} />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <WebsiteCards
            all
            kind={service.kind === "ecommerce" ? "ecommerce" : "website"}
          />
        )}
      </section>
      <section className="service-approach container">
        <div>
          <span className="eyebrow">Working directly with me</span>
          <h2>
            A clear process.
            <br />
            <span className="serif">A close collaboration.</span>
          </h2>
        </div>
        <ol>
          {[
            {
              title: "Understand",
              text: "Start with your business, your customers, and the problem worth solving.",
            },
            {
              title: "Build & review",
              text: "Agree the scope, work through the details, and review the important decisions together.",
            },
            {
              title: "Test & launch",
              text: "Check the agreed journeys, prepare the handover, and define support after launch.",
            },
          ].map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>
      {isAgent && <ServiceCare />}
      <section className="service-questions container">
        <h2>A few useful answers.</h2>
        <div>
          {service.questions.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <ServiceClosing />
    </main>
  );
}
