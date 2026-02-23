/**
 * Achievements Page
 * Certificates and badges with filter functionality
 */

import { prisma } from '@/lib/prisma/client';
import { AchievementsClient } from './achievements-client';

export default async function AchievementsPage() {
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
