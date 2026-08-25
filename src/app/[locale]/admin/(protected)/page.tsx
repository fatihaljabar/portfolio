/**
 * Admin Dashboard
 */

import { ArrowUpRight, Award, FolderKanban } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAdminUser } from '@/lib/auth/server';
import type { Locale } from '@/lib/i18n/config';
import { prisma } from '@/lib/prisma/client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default async function AdminHomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const [user, projectTotal, projectDrafts, achievementTotal, achievementDrafts] =
    await Promise.all([
      getAdminUser(),
      prisma.project.count(),
      prisma.project.count({ where: { isPublished: false } }),
      prisma.achievement.count(),
      prisma.achievement.count({ where: { isPublished: false } }),
    ]);

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-[#666] mb-2">
        Dashboard
      </p>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">
        Welcome back, {user?.email?.split('@')[0]}
      </h1>

      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
        <Link
          href={`/${locale}/admin/projects`}
          className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 p-6 hover:border-gray-300 dark:hover:border-white/20 transition-colors"
        >
          <FolderKanban className="absolute -right-3 -bottom-3 text-[100px] text-blue-500/5 rotate-12" />
          <div className="relative flex items-start justify-between mb-8">
            <FolderKanban className="text-blue-500" size={20} />
            <ArrowUpRight
              className="text-gray-300 dark:text-[#444] group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
              size={16}
            />
          </div>
          <p className="relative text-3xl font-bold text-gray-900 dark:text-white">
            {projectTotal}
          </p>
          <p className="relative text-sm text-gray-500 dark:text-[#888] mt-1">
            Projects
            {projectDrafts > 0 && (
              <span className="text-gray-400 dark:text-[#666]"> · {projectDrafts} draft</span>
            )}
          </p>
        </Link>

        <Link
          href={`/${locale}/admin/achievements`}
          className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 p-6 hover:border-gray-300 dark:hover:border-white/20 transition-colors"
        >
          <Award className="absolute -right-3 -bottom-3 text-[100px] text-gray-500/5 rotate-12" />
          <div className="relative flex items-start justify-between mb-8">
            <Award className="text-gray-900 dark:text-white" size={20} />
            <ArrowUpRight
              className="text-gray-300 dark:text-[#444] group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
              size={16}
            />
          </div>
          <p className="relative text-3xl font-bold text-gray-900 dark:text-white">
            {achievementTotal}
          </p>
          <p className="relative text-sm text-gray-500 dark:text-[#888] mt-1">
            Achievements
            {achievementDrafts > 0 && (
              <span className="text-gray-400 dark:text-[#666]"> · {achievementDrafts} draft</span>
            )}
          </p>
        </Link>
      </div>
    </div>
  );
}
