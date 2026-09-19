"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, UserRound } from "lucide-react";
import { testimonials, showTestimonialTemplate } from "@/content/testimonials";

const templates = Array.from({ length: 5 }, (_, index) => ({
  id: `template-${index}`,
  headline: [
    "A client’s experience. In their own words.",
    "The story behind a better conversation.",
    "A working relationship, worth talking about.",
    "Small details. A meaningful difference.",
    "Built together. Shared in their words.",
  ][index],
  quote:
    "The approved client quote will appear here, sharing their experience of working together.",
  name: "Client name",
  role: "Role",
  company: "Company",
  image: "",
  imageAlt: "",
}));

export function Testimonials() {
  const isTemplate = testimonials.length === 0;
  const stories = isTemplate ? templates : testimonials;
  const [active, setActive] = useState(isTemplate ? 2 : 0);
  const reduced = useReducedMotion();
  if (isTemplate && !showTestimonialTemplate) return null;
  const change = (direction: number) =>
    setActive(
      (current) => (current + direction + stories.length) % stories.length,
    );
  return (
    <section
      className="stories-section"
      aria-labelledby="stories-title"
      aria-roledescription="carousel"
    >
      <div className="container stories-heading">
        <span className="eyebrow">Client perspectives</span>
        <h2 id="stories-title">
          Good work starts with
          <br />a good working relationship.
        </h2>
        {isTemplate && (
          <p className="template-label">
            Design preview · Client testimonials to be added
          </p>
        )}
      </div>
      <div className="stories-deck container">
        {stories.map((story, index) => {
          const selected = active === index;
          const distance = Math.abs(index - active);
          return (
            <motion.div
              key={story.id}
              className="story-panel"
              data-active={selected}
              data-distance={Math.min(distance, 2)}
              initial={false}
              animate={{ flexGrow: selected ? 7 : distance === 1 ? 1 : 0.7 }}
              transition={{
                duration: reduced ? 0 : 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ "--story-tone": index } as CSSProperties}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setActive(index);
              }}
            >
              {index < stories.length - 1 && (
                <svg
                  className="story-panel-join"
                  viewBox="0 0 24 32"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M0 0 C0 12 5 14 12 14 C19 14 24 12 24 0 V32 C24 20 19 18 12 18 C5 18 0 20 0 32 Z" />
                </svg>
              )}
              <article
                className="story-panel-inner"
                aria-hidden={!selected}
                inert={!selected}
              >
                <motion.div
                  className="story-panel-copy"
                  initial={false}
                  animate={{
                    opacity: selected ? 1 : 0,
                  }}
                  transition={{
                    duration: reduced ? 0 : selected ? 0.3 : 0.1,
                    delay: reduced || !selected ? 0 : 0.25,
                  }}
                >
                  <h3>{story.headline}</h3>
                  <div>
                    {isTemplate ? (
                      <p className="story-quote">{story.quote}</p>
                    ) : (
                      <blockquote className="story-quote">
                        “{story.quote}”
                      </blockquote>
                    )}
                    <div className="story-attribution">
                      <span>{story.name}</span>
                      <span>
                        {story.role} · {story.company}
                      </span>
                    </div>
                  </div>
                </motion.div>
                <div className="story-panel-photo">
                  {story.image ? (
                    <Image
                      src={story.image}
                      alt={story.imageAlt}
                      fill
                      sizes="(max-width: 800px) 90vw, 360px"
                    />
                  ) : (
                    <div className="story-photo-placeholder">
                      <UserRound strokeWidth={1} />
                      <span>Client portrait</span>
                      <small>Photo to be supplied</small>
                    </div>
                  )}
                </div>
              </article>
              {!selected && (
                <button
                  type="button"
                  className="story-panel-hit"
                  tabIndex={-1}
                  aria-label={`Show ${isTemplate ? "preview" : "client story"} ${index + 1}`}
                  onClick={() => setActive(index)}
                />
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="story-controls">
        <button
          type="button"
          className="story-nav"
          onClick={() => change(-1)}
          aria-label="Previous client story"
        >
          <ArrowLeft size={19} />
        </button>
        <div className="story-dots" aria-label="Choose a client story">
          {stories.map((story, index) => (
            <button
              key={story.id}
              type="button"
              aria-label={`${isTemplate ? "Preview" : "Client story"} ${index + 1}`}
              aria-current={active === index ? "true" : undefined}
              onClick={() => setActive(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="story-nav"
          onClick={() => change(1)}
          aria-label="Next client story"
        >
          <ArrowRight size={19} />
        </button>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {isTemplate ? "Template" : "Story"} {active + 1} of {stories.length}:{" "}
        {stories[active].headline}
      </p>
    </section>
  );
}
