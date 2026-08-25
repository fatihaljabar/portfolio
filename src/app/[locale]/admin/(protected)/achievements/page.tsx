/**
 * Admin Achievements List
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { prisma } from '@/lib/prisma/client';
import { DeleteAchievementButton } from './delete-achievement-button';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Achievements',
  robots: { index: false, follow: false },
};

export default async function AdminAchievementsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const achievements = await prisma.achievement.findMany({ orderBy: { issuedDate: 'desc' } });

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Achievements</h1>
        <Link
          href={`/${locale}/admin/achievements/new`}
          className="bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-bold px-4 py-2 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200"
        >
          New Achievement
        </Link>
      </div>

      {achievements.length === 0 ? (
        <p className="text-gray-500 dark:text-[#888] text-sm">No achievements yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {achievements.map((achievement) => (
            <li
              key={achievement.id}
              className="rounded-2xl border border-gray-200 dark:border-white/10 p-4 lg:p-6 flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-bold text-gray-900 dark:text-white">
                  {achievement.title}
                  {!achievement.isPublished && (
                    <span className="ml-2 text-[10px] font-bold uppercase text-red-500">Draft</span>
                  )}
                </p>
                <p className="text-sm text-gray-500 dark:text-[#888]">
                  {achievement.issuer} · {achievement.type}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/${locale}/admin/achievements/${achievement.id}/edit`}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg text-gray-500 dark:text-[#888] hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  Edit
                </Link>
                <DeleteAchievementButton id={achievement.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
