import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface SanityProject {
  _id: string;
  title: string;
  subtitle: string;
  slug: {
    current: string;
  };
  challenge?: string;
  solution?: SanityBlock[]; // Rich text blocks
  stack: string[];
  deliverables?: string[];
  thumbnail: {
    asset: {
      _id: string;
      url: string;
    };
  };
  projectUrl?: string;
  githubRepo?: string;
  featured: boolean;
  status: string;
  publishedAt: string;
}

interface SanityBlock {
  _type: string;
  children?: SanitySpan[];
}

interface SanitySpan {
  _type: string;
  text: string;
}

interface ProjectCardData {
  id: string;
  title: string;
  subtitle: string;
  challenge: string;
  solution: string[];
  technologies: string[];
  image: string;
  alt?: string;
  caseStudyLink?: string;
  previewLink?: string;
}

// GROQ query to fetch projects
const projectsQuery = `*[_type == "project"] | order(publishedAt desc) {
  _id,
  title,
  subtitle,
  slug,
  challenge,
  solution,
  stack,
  deliverables,
  thumbnail {
    asset->
  },
  projectUrl,
  githubRepo,
  featured,
  status,
  publishedAt
}`;

// Transform Sanity project data to component format
const transformSanityProject = (project: SanityProject): ProjectCardData => {
  // Convert rich text solution to string array
  const solutionArray = project.solution 
    ? project.solution
        .filter(block => block._type === 'block' && block.children)
        .map(block => 
          block.children
            ?.filter((child: SanitySpan) => child._type === 'span')
            .map((child: SanitySpan) => child.text)
            .join('') || ''
        )
        .filter(text => text.trim().length > 0)
    : [];

  return {
    id: project._id,
    title: project.title,
    subtitle: project.subtitle,
    challenge: project.challenge || '',
    solution: solutionArray.length > 0 ? solutionArray : [project.subtitle],
    technologies: project.stack || [],
    image: project.thumbnail ? urlFor(project.thumbnail).width(800).height(600).url() : 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop&auto=format&q=80',
    alt: `${project.title} project screenshot`,
    caseStudyLink: `/projects/${project.slug?.current}`,
    previewLink: project.projectUrl,
  };
};

export function useProjects() {
  const [projects, setProjects] = useState<ProjectCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        console.log('Fetching projects from Sanity...');
        const sanityProjects: SanityProject[] = await client.fetch(projectsQuery);
        console.log('Sanity projects fetched:', sanityProjects.length, 'projects');
        const transformedProjects = sanityProjects.map(transformSanityProject);
        setProjects(transformedProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
}

export function useFeaturedProjects() {
  const [projects, setProjects] = useState<ProjectCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setLoading(true);
        const featuredQuery = `*[_type == "project" && featured == true] | order(publishedAt desc) [0...6] {
          _id,
          title,
          subtitle,
          slug,
          challenge,
          solution,
          stack,
          deliverables,
          thumbnail {
            asset->
          },
          projectUrl,
          githubRepo,
          featured,
          status,
          publishedAt
        }`;
        
        const sanityProjects: SanityProject[] = await client.fetch(featuredQuery);
        const transformedProjects = sanityProjects.map(transformSanityProject);
        setProjects(transformedProjects);
      } catch (err) {
        console.error('Error fetching featured projects:', err);
        setError('Failed to load featured projects');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return { projects, loading, error };
}