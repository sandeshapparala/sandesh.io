"use client";

import { useEffect, useState } from "react";
import ReactLenis from "lenis/react";
import { SanityProject, getFeaturedProjects } from "@/lib/queries";
import StickyCardSanity from "@/components/magicui/stickycards-sanity";

const FeaturedProjectsFromSanity = () => {
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const featuredProjects = await getFeaturedProjects();
        setProjects(featuredProjects);
      } catch (err) {
        setError('Failed to load featured projects');
        console.error('Error loading featured projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading featured projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl mb-2">⚠️ {error}</p>
          <p className="text-sm text-gray-400">Please check your Sanity configuration</p>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-400 text-center">
          <p className="text-xl mb-2">📝 No featured projects found</p>
          <p className="text-sm">Mark some projects as featured in Sanity Studio</p>
        </div>
      </div>
    );
  }

  const totalHeight = `${(projects.length + 1) * 100}vh`;

  return (
    <ReactLenis root>
      <div className="w-full" style={{ height: totalHeight }}>
        <StickyCardSanity projects={projects} />
      </div>
    </ReactLenis>
  );
};

export default FeaturedProjectsFromSanity;