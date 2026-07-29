/* eslint-disable @typescript-eslint/no-explicit-any */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Calendar, User, Building } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { GridPattern } from '@/components/magicui/grid-pattern';
import { cn } from '@/lib/utils';
import PortableTextRenderer from '@/components/PortableTextRenderer';
import type { Metadata } from 'next';

// Query to fetch project by slug
const projectQuery = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  subtitle,
  slug,
  thumbnail,
  challenge,
  solution,
  outcome,
  description,
  stack,
  deliverables,
  clientName,
  clientType,
  industry,
  status,
  startDate,
  endDate,
  projectUrl,
  githubRepo,
  tags,
  publishedAt
}`;

// Query to fetch adjacent projects
const adjacentProjectsQuery = `{
  "current": *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    publishedAt
  },
  "all": *[_type == "project"] | order(publishedAt desc){
    _id,
    title,
    slug,
    thumbnail,
    publishedAt
  }
}`;

interface Project {
  _id: string;
  title: string;
  subtitle: string;
  slug: { current: string };
  thumbnail: { asset: { _ref: string } };
  challenge?: string;
  solution?: any[];
  outcome?: string;
  description?: any[];
  stack: string[];
  deliverables?: string[];
  clientName?: string;
  clientType?: string;
  industry?: string;
  status: string;
  startDate?: string;
  endDate?: string;
  projectUrl?: string;
  githubRepo?: string;
  tags?: string[];
  publishedAt: string;
}

// Generate static params for all project slugs
export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "project"]{ slug }`
  );
  return slugs.map((project) => ({
    slug: project.slug.current,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await client.fetch<Project | null>(projectQuery, { slug });

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} | Kōva AI`,
    description: project.subtitle,
    openGraph: {
      title: `${project.title} | Kōva AI`,
      description: project.subtitle,
      images: project.thumbnail
        ? [{ url: urlFor(project.thumbnail).width(1200).height(630).url() }]
        : [],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch the current project
  const project = await client.fetch<Project | null>(projectQuery, { slug });

  if (!project) {
    notFound();
  }

  // Fetch adjacent projects
  const { current, all } = await client.fetch(adjacentProjectsQuery, { slug });
  const currentIndex = all.findIndex((p: { _id: string }) => p._id === current?._id);
  const adjacentProjects = {
    previous: currentIndex > 0 ? all[currentIndex - 1] : null,
    next: currentIndex < all.length - 1 ? all[currentIndex + 1] : null,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
        {/* Hero Section with Grid Background */}
        <div className="relative overflow-hidden bg-black text-white">
          <GridPattern
            width={30}
            height={30}
            x={-1}
            y={-1}
            strokeDasharray={"4 2"}
            className={cn(
              "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
              "opacity-30"
            )}
          />
          
          <div className="relative z-10 px-4 py-20 md:py-32">
            <div className="container mx-auto max-w-6xl">
              {/* Back Button */}
              <Link
                href="/projects"
                className="inline-flex items-center mb-8 text-gray-300 hover:text-white transition-colors group"
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Projects
              </Link>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Project Info */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {project.title}
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Meta Information */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {project.clientName && (
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span className="text-gray-300">{project.clientName}</span>
                      </div>
                    )}
                    {project.industry && (
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4" />
                        <span className="text-gray-300 capitalize">{project.industry.replace('-', ' ')}</span>
                      </div>
                    )}
                    {project.startDate && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-gray-300">
                          {formatDate(project.startDate)}
                          {project.endDate && ` - ${formatDate(project.endDate)}`}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Live Site
                      </a>
                    )}
                    {project.githubRepo && (
                      <a
                        href={project.githubRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors font-semibold"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        View Code
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Image */}
                <div className="relative">
                  <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                    <Image
                      src={urlFor(project.thumbnail)?.url() || ''}
                      alt={project.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            {/* Technology Stack */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6 text-center">Technology Stack</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {project.stack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-gray-800 dark:text-gray-200 rounded-full font-medium hover:scale-105 transition-transform cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenge, Solution, Outcome */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {project.challenge && (
                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-red-800 dark:text-red-200">
                    Challenge
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.solution && project.solution.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-blue-800 dark:text-blue-200">
                    Solution
                  </h3>
                  <div className="text-gray-700 dark:text-gray-300">
                    <PortableTextRenderer value={project.solution} />
                  </div>
                </div>
              )}

              {project.outcome && (
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-green-800 dark:text-green-200">
                    Outcome
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.outcome}
                  </p>
                </div>
              )}
            </div>

            {/* Detailed Description */}
            {project.description && project.description.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Case Study</h2>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <PortableTextRenderer value={project.description} />
                </div>
              </div>
            )}

            {/* Deliverables */}
            {project.deliverables && project.deliverables.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 text-center">Deliverables</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.deliverables.map((deliverable, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center hover:scale-105 transition-transform"
                    >
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {deliverable}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation to Other Projects */}
        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-16">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Previous Project */}
              {adjacentProjects.previous && (
                <Link
                  href={`/projects/${adjacentProjects.previous.slug.current}`}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                    <div className="flex items-center mb-4">
                      <ArrowLeft className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Previous Project</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {adjacentProjects.previous.title}
                    </h3>
                  </div>
                </Link>
              )}

              {/* Next Project */}
              {adjacentProjects.next && (
                <Link
                  href={`/projects/${adjacentProjects.next.slug.current}`}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                    <div className="flex items-center justify-end mb-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Next Project</span>
                      <ArrowRight className="ml-2 h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-right group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {adjacentProjects.next.title}
                    </h3>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
    </div>
  );
}