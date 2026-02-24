/**
 * Projects Page
 * Showcase of projects with filtering
 */

import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma/client';
import { ProjectsClient } from './projects-client';

export default async function ProjectsPage() {
  const t = await getTranslations('projects');

  // Fetch projects directly from Prisma
  const projects = await prisma.project.findMany({
    orderBy: [{ isFeatured: 'desc' }, { publishedAt: 'desc' }],
    select: {
      slug: true,
      title: true,
      description: true,
      imageUrl: true,
      isFeatured: true,
      techStack: true,
    },
  });

  return <ProjectsClient projects={projects} translations={t} />;
}
