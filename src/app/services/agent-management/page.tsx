import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/links";
import { ContactCTA } from "@/components/home/sections";

export const metadata = pageMetadata(
  "Ongoing AI agent management",
  "Scoped monthly care for your WhatsApp AI agent: conversation reviews, knowledge updates, reporting, and ongoing improvements.",
  "/services/agent-management",
);

export default function ManagementPage() {
  return (
    <main id="main">
      <div className="page-hero container">
        <span className="eyebrow">Ongoing agent management</span>
        <h1>
          A good launch.
          <br />
          <span className="serif">An even better next month.</span>
        </h1>
        <p>
          Keep your AI agent aligned with the business it represents. I review
          conversations, update approved information, and make improvements
          within a clear monthly scope.
        </p>
        <ButtonLink href="/contact">Discuss monthly management</ButtonLink>
      </div>
      <section className="scope-panel container">
        <span className="eyebrow">The starting scope</span>
        <h2>Care you can plan around.</h2>
        <ul className="scope-list">
          <li>
            <strong>One agent. One business. One WhatsApp number.</strong>
            <p>A focused management plan for an agreed production workflow.</p>
          </li>
          <li>
            <strong>Weekly reviews.</strong>
            <p>
              Review a sample of up to 50 conversations across the month to
              identify useful improvements.
            </p>
          </li>
          <li>
            <strong>Four engineering hours each month.</strong>
            <p>
              For approved updates, fixes, and workflow improvements. Additional
              work is scoped separately.
            </p>
          </li>
          <li>
            <strong>A monthly report and 30-minute call.</strong>
            <p>
              See what was reviewed, what changed, and what to prioritise next.
              Routine reviews and reporting sit outside the engineering
              allowance.
            </p>
          </li>
          <li>
            <strong>Weekday support, 10 am–6 pm IST.</strong>
            <p>
              Issue acknowledgement by the next business day. Resolution depends
              on the issue and third-party systems.
            </p>
          </li>
          <li>
            <strong>Separate, transparent costs.</strong>
            <p>
              Implementation, monthly management, and platform or model usage
              are quoted separately. New agents and major integrations need
              their own scope.
            </p>
          </li>
        </ul>
      </section>
      <section className="container article-layout">
        <div>
          <span className="eyebrow">What the work looks like</span>
          <h2>
            Small improvements.
            <br />
            Consistent attention.
          </h2>
        </div>
        <div>
          <p>
            A changed project detail. A repeated question that needs a clearer
            answer. A handoff that could be more useful for the team. These are
            the things a managed agent should get better at over time.
          </p>
          <p>
            We agree the priorities together. I keep a record of changes and
            explain what was reviewed, without promising sales results an agent
            cannot control.
          </p>
        </div>
      </section>
      <ContactCTA />
    </main>
  );
}
