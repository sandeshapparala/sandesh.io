"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Layers3,
  MessageCircle,
  Rocket,
  ScanLine,
  RefreshCw,
} from "lucide-react";
import { processSteps } from "@/content/process";

const icons = [ScanLine, Layers3, Rocket, RefreshCw];

export function Process() {
  const [active, setActive] = useState(0);
  return (
    <section className="process-section" aria-labelledby="process-title">
      <div className="container">
        <div className="process-intro">
          <span className="eyebrow">From the first conversation onwards</span>
          <h2 id="process-title">
            Thoughtfully built.
            <br />
            Continuously improved.
          </h2>
          <p>
            A clear process, a close working relationship, and an agent built
            around your business.
          </p>
        </div>
        <div className="process-deck">
          {processSteps.map((step, index) => {
            const Icon = icons[index];
            const selected = active === index;
            return (
              <article
                key={step.id}
                className={`process-card process-${step.id}`}
                data-active={selected}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setActive(index);
                }}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={selected}
                    aria-controls={`process-${step.id}`}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                  >
                    {step.title}
                    <span className="process-number">0{index + 1}</span>
                  </button>
                </h3>
                <p className="process-summary" aria-hidden={selected}>
                  {step.summary}
                </p>
                <div
                  id={`process-${step.id}`}
                  className="process-details"
                  inert={!selected}
                  aria-hidden={!selected}
                >
                  <p>{step.description}</p>
                  <ul>
                    {step.points.map((point) => (
                      <li key={point}>
                        <Check size={14} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="process-art" aria-hidden="true">
                  <div className="process-shape" />
                  <div className="process-mini">
                    <span className="process-mini-icon">
                      <Icon size={25} />
                    </span>
                    <span className="tiny-label">{step.visualLabel}</span>
                    <strong>{step.visualTitle}</strong>
                    <div className="process-mini-flow">
                      {step.tags.map((tag, i) => (
                        <span key={tag}>
                          {i === 0 ? (
                            <MessageCircle size={14} />
                          ) : i === 2 ? (
                            <Check size={14} />
                          ) : (
                            <Layers3 size={14} />
                          )}
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="process-mini-footer">
                      <span>Made for your business</span>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
