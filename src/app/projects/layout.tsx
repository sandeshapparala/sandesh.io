import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Kōva AI',
  description:
    'Explore my latest projects and case studies showcasing full-stack development, AI integration, and modern web technologies.',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
