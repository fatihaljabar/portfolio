/**
 * Admin Achievements List
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
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
    <div>
      <div className="flex items-start justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-[#666] mb-2">
            {achievements.length} total
          </p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h1>
        </div>
        <Link
          href={`/${locale}/admin/achievements/new`}
          className="shrink-0 bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          New Achievement
        </Link>
      </div>

      {achievements.length === 0 ? (
        <p className="text-gray-500 dark:text-[#888] text-sm">No achievements yet.</p>
      ) : (
        <ul className="flex flex-col">
          {achievements.map((achievement, index) => (
            <li
              key={achievement.id}
              className={`flex items-center gap-4 py-4 ${
                index !== 0 ? 'border-t border-gray-200 dark:border-white/10' : ''
              }`}
            >
              <div className="shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                {achievement.imageUrl ? (
                  <Image
                    src={achievement.imageUrl}
                    alt=""
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-300 dark:text-[#444] text-xs font-bold">
                    {achievement.title.charAt(0)}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-gray-900 dark:text-white truncate">
                    {achievement.title}
                  </p>
                  <Badge variant="outline" className="text-[10px] shrink-0">
                    {achievement.type}
                  </Badge>
                  {!achievement.isPublished && (
                    <Badge variant="destructive" className="text-[10px]">
                      Draft
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-[#888] truncate">
                  {achievement.issuer}
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <Link
                  href={`/${locale}/admin/achievements/${achievement.id}/edit`}
                  className="text-xs font-medium px-3 py-2 rounded-lg text-gray-500 dark:text-[#888] hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
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
