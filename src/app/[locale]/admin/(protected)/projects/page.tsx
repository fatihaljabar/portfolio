/**
 * Admin Projects List
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { prisma } from '@/lib/prisma/client';
import { DeleteProjectButton } from './delete-project-button';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Projects',
  robots: { index: false, follow: false },
};

export default async function AdminProjectsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <Link
          href={`/${locale}/admin/projects/new`}
          className="bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-bold px-4 py-2 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200"
        >
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-500 dark:text-[#888] text-sm">No projects yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {projects.map((project) => (
            <li
              key={project.id}
              className="rounded-2xl border border-gray-200 dark:border-white/10 p-4 lg:p-6 flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-bold text-gray-900 dark:text-white">
                  {project.title}
                  {project.isFeatured && (
                    <span className="ml-2 text-[10px] font-bold uppercase text-gray-500 dark:text-[#888]">
                      Featured
                    </span>
                  )}
                  {!project.isPublished && (
                    <span className="ml-2 text-[10px] font-bold uppercase text-red-500">Draft</span>
                  )}
                </p>
                <p className="text-sm text-gray-500 dark:text-[#888]">/{project.slug}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/${locale}/admin/projects/${project.id}/edit`}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg text-gray-500 dark:text-[#888] hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  Edit
                </Link>
                <DeleteProjectButton id={project.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
