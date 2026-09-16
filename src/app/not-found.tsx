import { ButtonLink } from "@/components/ui/links";
export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <span className="eyebrow">404 · A little off track</span>
      <h1>
        Let’s get you
        <br />
        <span className="serif">back to the good stuff.</span>
      </h1>
      <p>This page isn’t here. My current work is a good place to start.</p>
      <ButtonLink href="/work">Explore client work</ButtonLink>
    </main>
  );
}
