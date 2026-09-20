import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Privacy",
  "How contact information is handled on Sandesh Apparala’s portfolio website.",
  "/privacy",
);
export default function PrivacyPage() {
  return (
    <main id="main" className="container prose">
      <h1>Your information.</h1>
      <p>This website presents my work and lets you send a project enquiry.</p>
      <h2>Contacting me</h2>
      <p>
        When you send an enquiry, the website submits your contact information
        and project brief to a private database hosted through Google Firebase.
        A success message appears only after storage is confirmed. I use these
        details to respond and discuss your project. Enquiries are not published
        on this website. Copying the brief instead puts it on your device’s
        clipboard.
      </p>
      <p>
        If you email me, I use the information you share to respond and discuss
        your project. Please avoid including private customer records,
        credentials, or other sensitive information in an initial enquiry.
      </p>
      <h2>Website operation</h2>
      <p>
        To limit spam, the submission service keeps short-lived counters based
        on protected hashes of email addresses and, on the production host,
        network addresses. Raw network addresses are not stored in enquiry
        records. You can contact me to request deletion of information you have
        submitted.
      </p>
      <p>
        This build does not include advertising trackers or a marketing mailing
        list. The hosting provider may process routine request information to
        operate and protect the website. Links to client websites and social
        profiles open services with their own privacy practices.
      </p>
      <h2>Visitor analytics</h2>
      <p>
        I use Vercel Web Analytics to understand visits to public pages, including
        popular pages, referral sources, and broad device and location information.
        It does not use tracking cookies. Admin pages are excluded, and page URLs
        are stripped of query parameters and fragments before tracking. Contact
        form answers are not sent to analytics.
        {" "}<a href="https://vercel.com/docs/analytics/privacy-policy">Learn how Vercel handles analytics data</a>.
      </p>
      <h2>Questions</h2>
      <p>
        For questions about information you’ve shared with me, contact{" "}
        <a href="mailto:hello@sandesh.io">hello@sandesh.io</a>.
      </p>
    </main>
  );
}
