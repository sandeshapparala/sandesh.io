import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/links";
import { Workflow } from "@/components/home/workflow";
import { Management, FAQ, ContactCTA } from "@/components/home/sections";

export const metadata = pageMetadata(
  "WhatsApp AI agents for real estate",
  "Custom WhatsApp AI agents to answer property enquiries, qualify leads, coordinate site visits, and support your sales team.",
  "/services/whatsapp-ai-agents",
);

export default function AgentsPage() {
  return (
    <main id="main">
      <div className="page-hero container">
        <span className="eyebrow">WhatsApp AI agents</span>
        <h1>
          Your next sales conversation.
          <br />
          <span className="serif">Already moving forward.</span>
        </h1>
        <p>
          An agent built around your project information and sales process. Help
          people get useful answers, share their requirements, and take the next
          step with your team.
        </p>
        <ButtonLink href="/contact">Discuss your agent</ButtonLink>
      </div>
      <Workflow />
      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A practical way to build</span>
            <h2>
              From your workflow
              <br />
              to a working agent.
            </h2>
          </div>
          <p>
            The right scope comes first. We agree what the agent should do, what
            it should know, and when a person should step in.
          </p>
        </div>
        <div className="service-grid">
          <article className="service-card">
            <span>01 / Understand</span>
            <h2>Map the conversation.</h2>
            <p>
              Review how enquiries arrive, the questions your team answers, and
              the next actions that matter. Define the information,
              integrations, and handoff rules.
            </p>
          </article>
          <article className="service-card">
            <span>02 / Build & test</span>
            <h2>Make it work for you.</h2>
            <p>
              Build the agent around approved business information. Test useful
              questions, missing details, out-of-scope requests, and the path to
              a human.
            </p>
          </article>
          <article className="service-card">
            <span>03 / Launch & learn</span>
            <h2>Improve with real use.</h2>
            <p>
              Launch the agreed workflow, review conversations, and refine the
              agent. Choose ongoing management for updates and a defined
              improvement allowance.
            </p>
          </article>
        </div>
        <div className="scope-panel">
          <h2>Clear boundaries. Better conversations.</h2>
          <ul className="scope-list">
            <li>
              <strong>Your information is the foundation.</strong>
              <p>
                Project facts, services, and policies come from sources you
                approve.
              </p>
            </li>
            <li>
              <strong>Your team stays in the picture.</strong>
              <p>
                Human handoff and booking confirmation follow the rules agreed
                during scoping.
              </p>
            </li>
            <li>
              <strong>Integrations are scoped to fit.</strong>
              <p>
                We confirm system access and feasibility before promising a
                connection.
              </p>
            </li>
            <li>
              <strong>Costs stay understandable.</strong>
              <p>
                Implementation, ongoing management, and third-party usage are
                quoted separately.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <div className="soft-section">
        <Management />
      </div>
      <FAQ />
      <ContactCTA />
    </main>
  );
}
