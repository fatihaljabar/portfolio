/**
 * New Project
 */

import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { createProject } from '@/lib/actions/admin-projects';
import type { Locale } from '@/lib/i18n/config';
import { ProjectForm } from '../project-form';

export const metadata: Metadata = {
  title: 'New Project',
  robots: { index: false, follow: false },
};

export default async function NewProjectPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return (
    <div>
      <Link
        href={`/${locale}/admin/projects`}
        className="inline-flex items-center gap-2 text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white transition-colors mb-6 text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Projects
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">New Project</h1>
      <ProjectForm action={createProject} submitLabel="Create Project" />
    </div>
  );
}
