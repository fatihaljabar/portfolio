/**
 * Edit Project
 */

import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { updateProject } from '@/lib/actions/admin-projects';
import type { Locale } from '@/lib/i18n/config';
import { prisma } from '@/lib/prisma/client';
import { getTechIcon, type TechIconResult } from '@/lib/tech-icon';
import { ProjectForm } from '../../project-form';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Edit Project',
  robots: { index: false, follow: false },
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) {
    notFound();
  }

  const boundUpdateProject = updateProject.bind(null, project.id);

  const initialTechIcons: Record<string, TechIconResult | null> = {};
  for (const tech of project.techStack) {
    initialTechIcons[tech] = getTechIcon(tech);
  }

  const categories = await prisma.project.findMany({
    where: { category: { not: null } },
    select: { category: true },
    distinct: ['category'],
    orderBy: { category: 'asc' },
  });
  const existingCategories = categories.map((c) => c.category).filter((c): c is string => !!c);

  return (
    <div>
      <Link
        href={`/${locale}/admin/projects`}
        className="inline-flex items-center gap-2 text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white transition-colors mb-6 text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Projects
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">Edit Project</h1>
      <ProjectForm
        action={boundUpdateProject}
        submitLabel="Save Changes"
        initialTechIcons={initialTechIcons}
        existingCategories={existingCategories}
        defaultValues={{
          titleEn: project.titleEn,
          titleId: project.titleId,
          descriptionEn: project.descriptionEn,
          descriptionId: project.descriptionId,
          contentEn: project.contentEn,
          contentId: project.contentId,
          imageUrl: project.imageUrl ?? '',
          githubUrl: project.githubUrl ?? '',
          demoUrl: project.demoUrl ?? '',
          techStack: project.techStack,
          category: project.category ?? '',
          isFeatured: project.isFeatured,
          isPublished: project.isPublished,
        }}
      />
    </div>
  );
}
