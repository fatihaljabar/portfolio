/**
 * Edit Achievement
 */

import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { updateAchievement } from '@/lib/actions/admin-achievements';
import type { Locale } from '@/lib/i18n/config';
import { prisma } from '@/lib/prisma/client';
import { AchievementForm } from '../../achievement-form';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Edit Achievement',
  robots: { index: false, follow: false },
};

export default async function EditAchievementPage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  const achievement = await prisma.achievement.findUnique({ where: { id } });

  if (!achievement) {
    notFound();
  }

  const boundUpdateAchievement = updateAchievement.bind(null, achievement.id);

  const categories = await prisma.achievement.findMany({
    where: { category: { not: null } },
    select: { category: true },
    distinct: ['category'],
    orderBy: { category: 'asc' },
  });
  const existingCategories = categories.map((c) => c.category).filter((c): c is string => !!c);

  return (
    <div>
      <Link
        href={`/${locale}/admin/achievements`}
        className="inline-flex items-center gap-2 text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white transition-colors mb-6 text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Achievements
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">Edit Achievement</h1>
      <AchievementForm
        action={boundUpdateAchievement}
        submitLabel="Save Changes"
        existingCategories={existingCategories}
        defaultValues={{
          titleEn: achievement.titleEn,
          titleId: achievement.titleId,
          descriptionEn: achievement.descriptionEn ?? '',
          descriptionId: achievement.descriptionId ?? '',
          issuer: achievement.issuer,
          certificateNumber: achievement.certificateNumber ?? '',
          credentialUrl: achievement.credentialUrl ?? '',
          imageUrl: achievement.imageUrl ?? '',
          additionalImages: achievement.additionalImages,
          issuedDate: achievement.issuedDate.toISOString().slice(0, 10),
          type: achievement.type,
          category: achievement.category ?? '',
          isPublished: achievement.isPublished,
        }}
      />
    </div>
  );
}
