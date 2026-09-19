"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, stagger, useAnimate, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/links";
import { site } from "@/content/site";

export function Hero() {
  const [scope, animate] = useAnimate();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) {
      animate(".hero-reveal", { opacity: 1, y: 0 }, { duration: 0 });
      return;
    }
    if (reduced !== false) return;
    const entrance = animate(
      ".hero-reveal",
      { opacity: [0, 1], y: [18, 0] },
      { duration: 0.8, delay: stagger(0.12), ease: [0.22, 1, 0.36, 1] },
    );
    return () => entrance.stop();
  }, [animate, reduced]);
  return (
    <section ref={scope} className="hero container">
      <motion.div
        className="hero-aura"
        aria-hidden="true"
        initial={{ x: 0, scale: 1, opacity: 0.45 }}
        animate={
          reduced !== false
            ? { x: 0, scale: 1, opacity: 0.45 }
            : {
                x: [-12, 12, -12],
                scale: [1, 1.08, 1],
                opacity: [0.45, 0.7, 0.45],
              }
        }
        transition={{
          duration: reduced !== false ? 0 : 12,
          repeat: reduced !== false ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="hero-identity hero-reveal">
        <Image
          src="/portrait/sandesh-apparala.png"
          alt=""
          width={40}
          height={40}
          preload
        />
        <span>
          Sandesh Apparala <span className="identity-separator">/</span> AI
          Agent Engineer
        </span>
      </div>
      <h1 className="hero-reveal">
        AI agents that turn enquiries into <span>sales conversations.</span>
      </h1>
      <p className="hero-description hero-reveal">
        I build and manage WhatsApp AI agents for real estate businesses. Answer
        questions, qualify leads, and help your team take the next step.
      </p>
      <div className="hero-actions hero-reveal">
        <ButtonLink href="/contact">Discuss your project</ButtonLink>
        <ButtonLink href={site.demoUrl} secondary>
          Try the WhatsApp demo
        </ButtonLink>
      </div>
      <p className="hero-note hero-reveal">
        Built for your business. Managed for the long run.
      </p>
    </section>
  );
}
