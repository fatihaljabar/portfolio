/**
 * New Achievement
 */

import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { createAchievement } from '@/lib/actions/admin-achievements';
import type { Locale } from '@/lib/i18n/config';
import { AchievementForm } from '../achievement-form';

export const metadata: Metadata = {
  title: 'New Achievement',
  robots: { index: false, follow: false },
};

export default async function NewAchievementPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <Link
        href={`/${locale}/admin/achievements`}
        className="inline-flex items-center gap-2 text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white transition-colors mb-6 text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Achievements
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">New Achievement</h1>
      <AchievementForm action={createAchievement} submitLabel="Create Achievement" />
    </div>
  );
}
