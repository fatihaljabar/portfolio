/**
 * Projects Page
 * Showcase of projects with filtering
 */

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/i18n/config';
import { prisma } from '@/lib/prisma/client';
import { buildMetadata } from '@/lib/seo/metadata';
import { getTechIcon, type TechIconResult } from '@/lib/tech-icon';
import { ProjectsClient } from './projects-client';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('projects');
  return buildMetadata({
    locale,
    path: '/projects',
    title: t('title'),
    description: t('subtitle'),
  });
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('projects');

  // Fetch projects directly from Prisma
  const rawProjects = await prisma.project.findMany({
    where: { isPublished: true },
    orderBy: [{ isFeatured: 'desc' }, { publishedAt: 'desc' }],
    select: {
      slug: true,
      titleEn: true,
      titleId: true,
      descriptionEn: true,
      descriptionId: true,
      imageUrl: true,
      isFeatured: true,
      techStack: true,
      category: true,
    },
  });

  const projects = rawProjects.map(
    ({ titleEn, titleId, descriptionEn, descriptionId, ...rest }) => ({
      ...rest,
      title: locale === 'id' ? titleId : titleEn,
      description: locale === 'id' ? descriptionId : descriptionEn,
    }),
  );

  // Extract all needed translation strings
  const translations = {
    title: t('title'),
    subtitle: t('subtitle'),
    featured: t('featured'),
    view_project: t('view_project'),
    no_projects: t('no_projects'),
    all: t('all'),
  };

  // Resolve tech icons server-side so the (client) icon library never ships to the browser.
  const techIconMap: Record<string, TechIconResult | null> = {};
  for (const project of projects) {
    for (const tech of project.techStack) {
      if (!(tech in techIconMap)) {
        techIconMap[tech] = getTechIcon(tech);
      }
    }
  }

  return (
    <ProjectsClient projects={projects} translations={translations} techIconMap={techIconMap} />
  );
}
