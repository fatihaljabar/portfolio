/**
 * Admin Projects List
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { Badge } from '@/components/ui/badge';
import type { Locale } from '@/lib/i18n/config';
import { prisma } from '@/lib/prisma/client';
import { ToastFromSearchParams } from '../toast-from-search-params';
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
    <div>
      <Suspense fallback={null}>
        <ToastFromSearchParams />
      </Suspense>
      <div className="flex items-start justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-[#666] mb-2">
            {projects.length} total
          </p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
        </div>
        <Link
          href={`/${locale}/admin/projects/new`}
          className="shrink-0 bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-500 dark:text-[#888] text-sm">No projects yet.</p>
      ) : (
        <ul className="flex flex-col">
          {projects.map((project, index) => (
            <li
              key={project.id}
              className={`flex items-center gap-4 py-4 ${
                index !== 0 ? 'border-t border-gray-200 dark:border-white/10' : ''
              }`}
            >
              <div className="shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt=""
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-300 dark:text-[#444] text-xs font-bold">
                    {project.title.charAt(0)}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-gray-900 dark:text-white truncate">
                    {project.title}
                  </p>
                  {project.isFeatured && (
                    <Badge variant="secondary" className="text-[10px]">
                      Featured
                    </Badge>
                  )}
                  {!project.isPublished && (
                    <Badge variant="destructive" className="text-[10px]">
                      Draft
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-[#888] truncate">/{project.slug}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <Link
                  href={`/${locale}/admin/projects/${project.id}/edit`}
                  className="text-xs font-medium px-3 py-2 rounded-lg text-gray-500 dark:text-[#888] hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                >
                  Edit
                </Link>
                <DeleteProjectButton id={project.id} title={project.title} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
