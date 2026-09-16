import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { site } from "@/content/site";

export const metadata = pageMetadata(
  "Let’s talk about your AI agent",
  "Discuss a WhatsApp AI agent, custom workflow, or ongoing agent management directly with Sandesh Apparala.",
  "/contact",
);

export default function ContactPage() {
  return (
    <main id="main" className="container contact-layout">
      <div className="contact-intro">
        <span className="eyebrow">Let’s make something useful</span>
        <h1>
          Good conversations.
          <br />
          <span className="serif">Better possibilities.</span>
        </h1>
        <p>
          Tell me how enquiries reach your business, what your team handles
          manually, and what you want to happen next.
        </p>
        <p>
          I’ll help you assess the fit for an AI agent and define a practical
          scope.
        </p>
        <a className="contact-email" href={`mailto:${site.email}`}>
          {site.email}
          <ArrowUpRight size={20} />
        </a>
        <div className="contact-person">
          <Image
            src="/portrait/sandesh-apparala.png"
            alt=""
            width={48}
            height={48}
          />
          <div>
            <strong>You’ll speak directly with me.</strong>
            <span>Sandesh Apparala · AI Agent Engineer</span>
          </div>
        </div>
      </div>
      <EnquiryForm />
    </main>
  );
}
