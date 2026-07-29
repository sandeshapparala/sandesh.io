import { client } from '@/sanity/lib/client'

export interface SanityProject {
  _id: string
  title: string
  subtitle: string
  challenge?: string
  solution?: Array<{
    _type: string
    children?: Array<{
      _type: string
      text: string
    }>
  }>
  stack: string[]
  deliverables?: string[]
  thumbnail: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  slug: {
    current: string
  }
  projectUrl?: string
  githubRepo?: string
  featured: boolean
  status: string
  clientName?: string
  clientType?: string
  industry?: string
}

export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    challenge,
    solution,
    stack,
    deliverables,
    thumbnail {
      asset->{
        _id,
        url
      },
      alt
    },
    slug,
    projectUrl,
    githubRepo,
    featured,
    status,
    clientName,
    clientType,
    industry
  }
`

export async function getFeaturedProjects(): Promise<SanityProject[]> {
  try {
    const projects = await client.fetch(FEATURED_PROJECTS_QUERY)
    return projects
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}