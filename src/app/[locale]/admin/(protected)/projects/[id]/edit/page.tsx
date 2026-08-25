/**
 * Edit Project
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { updateProject } from '@/lib/actions/admin-projects';
import { prisma } from '@/lib/prisma/client';
import { ProjectForm } from '../../project-form';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Edit Project',
  robots: { index: false, follow: false },
};

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) {
    notFound();
  }

  const boundUpdateProject = updateProject.bind(null, project.id);

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Edit Project</h1>
      <ProjectForm
        action={boundUpdateProject}
        submitLabel="Save Changes"
        defaultValues={{
          title: project.title,
          description: project.description,
          content: project.content,
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
