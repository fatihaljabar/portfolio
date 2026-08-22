/**
 * Achievements Page
 * Certificates and badges with filter functionality
 */

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma/client';
import { buildMetadata } from '@/lib/seo/metadata';
import type { Locale } from '@/lib/i18n/config';
import { AchievementsClient } from './achievements-client';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('achievements');
  return buildMetadata({ locale, path: '/achievements', title: t('title'), description: t('subtitle') });
}

export default async function AchievementsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const achievements = await prisma.achievement.findMany({
    orderBy: { issuedDate: 'desc' },
    select: {
      id: true,
      slug: true,
      title: true,
      issuer: true,
      certificateNumber: true,
      credentialUrl: true,
      imageUrl: true,
      issuedDate: true,
      type: true,
      category: true,
    },
  });

  const categoriesResult = await prisma.achievement.findMany({
    where: { category: { not: null } },
    select: { category: true },
    distinct: ['category'],
  });

  const categories = categoriesResult.map((c) => c.category!).filter(Boolean);

  return <AchievementsClient initialAchievements={achievements} categories={categories} />;
}
