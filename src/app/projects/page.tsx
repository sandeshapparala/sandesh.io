'use client';

import ProjectCard from '@/components/ProjectCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useProjects } from '@/hooks/useProjects';

export default function ProjectsPage() {
  const { projects: sanityProjects, loading, error } = useProjects();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.error('Projects loading error:', error);
  }

  if (!loading && sanityProjects.length === 0 && !error) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Projects Yet</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Projects will appear here once added to the CMS.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black py-16">
      <div className="container mx-auto px-4">
        {/* Error Banner */}
        {error && (
          <div className="mb-8 p-4 bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200 text-center">
              Unable to load projects from CMS. Please try again later.
            </p>
          </div>
        )}
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore a collection of my latest work, featuring full-stack applications, 
            AI-powered solutions, and modern web technologies. Each project represents 
            a unique challenge and innovative solution.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="space-y-12">
          {sanityProjects.map((project, index) => (
            <div key={project.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProjectCard
                title={project.title}
                subtitle={project.subtitle}
                challenge={project.challenge}
                solution={project.solution}
                technologies={project.technologies}
                image={project.image}
                alt={project.alt}
                caseStudyLink={project.caseStudyLink}
                previewLink={project.previewLink}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold mb-4">Interested in Working Together?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Let&apos;s discuss how I can help bring your project to life.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow">
              Start a Project
            </button>
            <button className="px-8 py-3 border-2 border-gray-800 dark:border-white rounded-lg hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
              View Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}