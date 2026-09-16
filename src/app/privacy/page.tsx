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
      <p>
        This website presents my work and lets you prepare an enquiry by email.
      </p>
      <h2>Contacting me</h2>
      <p>
        The project brief form prepares text in your browser. It does not submit
        your answers to a website database. Opening the email draft passes that
        text to your email application; you choose whether to send it. Copying
        the brief puts it on your device’s clipboard.
      </p>
      <p>
        If you email me, I use the information you share to respond and discuss
        your project. Please avoid including private customer records,
        credentials, or other sensitive information in an initial enquiry.
      </p>
      <h2>Website operation</h2>
      <p>
        This build does not include advertising trackers or a marketing mailing
        list. The hosting provider may process routine request information to
        operate and protect the website. Links to client websites and social
        profiles open services with their own privacy practices.
      </p>
      <h2>Questions</h2>
      <p>
        For questions about information you’ve shared with me, contact{" "}
        <a href="mailto:hello@sandesh.io">hello@sandesh.io</a>.
      </p>
    </main>
  );
}
