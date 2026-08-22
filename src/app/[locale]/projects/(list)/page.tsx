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

  // Extract all needed translation strings
  const translations = {
    title: t('title'),
    subtitle: t('subtitle'),
    featured: t('featured'),
    view_project: t('view_project'),
    no_projects: t('no_projects'),
  };

  return <ProjectsClient projects={projects} translations={translations} />;
}
