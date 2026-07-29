"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";
import { SanityProject } from "@/lib/queries";
import { cn } from "@/lib/utils";

interface StickyCardSanityProps {
  projects: SanityProject[];
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
}

interface SanityBlock {
  _type: string;
  children?: Array<{
    _type: string;
    text: string;
  }>;
}

// Helper function to extract text from Sanity's rich text blocks
const extractTextFromBlocks = (blocks: SanityBlock[]): string[] => {
  if (!blocks || !Array.isArray(blocks)) return [];
  
  return blocks
    .filter(block => block._type === 'block')
    .map(block => {
      if (block.children && Array.isArray(block.children)) {
        return block.children
          .filter((child) => child._type === 'span' && child.text)
          .map((child) => child.text)
          .join(' ');
      }
      return '';
    })
    .filter(text => text.length > 0);
};

const StickyCardSanity = ({
  projects,
  className,
  containerClassName,
  cardClassName,
}: StickyCardSanityProps) => {
  const container = useRef(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cardElements = cardRefs.current;
      const totalCards = cardElements.length;

      if (!cardElements[0] || totalCards === 0) return;

      gsap.set(cardElements[0], { y: "0%", scale: 1, rotation: 0 });

      for (let i = 1; i < totalCards; i++) {
        if (!cardElements[i]) continue;
        gsap.set(cardElements[i], { y: "100%", scale: 1, rotation: 0 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-cards",
          start: "top top",
          end: `+=${window.innerHeight * totalCards}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        const position = i;
        if (!currentCard || !nextCard) continue;

        scrollTimeline.to(
          currentCard,
          {
            scale: 0.7,
            rotation: 5,
            duration: 1,
            ease: "none",
          },
          position,
        );

        scrollTimeline.to(
          nextCard,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position,
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container },
  );

  if (!projects || projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No featured projects found.</p>
      </div>
    );
  }

  return (
    <div className={cn("relative h-screen w-full", className)} ref={container}>
      <div className="sticky-cards relative flex h-screen w-full items-center justify-center overflow-hidden lg:p-4">
        <div
          className={cn(
            "relative h-[75%] w-full max-w-6xl overflow-hidden mt-10",
            containerClassName,
          )}
        >
          {projects.map((project, i) => {
            const solutionText = extractTextFromBlocks(project.solution || []);
            const imageUrl = project.thumbnail?.asset?.url || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&auto=format&q=80';
            
            return (
              <div
                key={project._id}
                className={cn(
                  "absolute h-full border border-dotted border-2px border-gray-500 w-full bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden",
                  cardClassName,
                )}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
              >
                <div className="flex h-full">
                  {/* Left side - Image */}
                  <div className="w-1/2 relative">
                    <Image
                      src={imageUrl}
                      alt={project.thumbnail?.alt || project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  
                  {/* Right side - Content */}
                  <div className="w-1/2 p-8 flex flex-col justify-between">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
                      <p className="text-gray-300 mb-6">{project.subtitle}</p>
                      
                      {project.challenge && (
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold mb-2">Challenge</h3>
                          <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
                            {project.challenge}
                          </p>
                        </div>
                      )}
                      
                      {solutionText.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold mb-2">Solution</h3>
                          <div className="text-gray-300 text-sm space-y-1 line-clamp-3">
                            {solutionText.slice(0, 3).map((item, idx) => (
                              <div key={idx} className="leading-relaxed">• {item}</div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack?.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-700 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {project.clientType && (
                        <div className="mb-4">
                          <p className="text-gray-400 text-sm">
                            <span className="capitalize">{project.clientType}</span>
                            {project.industry && ` • ${project.industry}`}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-4">
                      <button 
                        onClick={() => project.slug?.current && window.open(`/projects/${project.slug.current}`, '_blank')}
                        className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition-colors"
                      >
                        Read Case Study
                      </button>
                      {project.projectUrl && (
                        <button 
                          onClick={() => window.open(project.projectUrl, '_blank')}
                          className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          See Preview
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StickyCardSanity;