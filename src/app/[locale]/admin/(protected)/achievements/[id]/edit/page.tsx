/**
 * Edit Achievement
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { updateAchievement } from '@/lib/actions/admin-achievements';
import { prisma } from '@/lib/prisma/client';
import { AchievementForm } from '../../achievement-form';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Edit Achievement',
  robots: { index: false, follow: false },
};

export default async function EditAchievementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const achievement = await prisma.achievement.findUnique({ where: { id } });

  if (!achievement) {
    notFound();
  }

  const boundUpdateAchievement = updateAchievement.bind(null, achievement.id);

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Edit Achievement</h1>
      <AchievementForm
        action={boundUpdateAchievement}
        submitLabel="Save Changes"
        defaultValues={{
          title: achievement.title,
          description: achievement.description ?? '',
          issuer: achievement.issuer,
          certificateNumber: achievement.certificateNumber ?? '',
          credentialUrl: achievement.credentialUrl ?? '',
          imageUrl: achievement.imageUrl ?? '',
          issuedDate: achievement.issuedDate.toISOString().slice(0, 10),
          type: achievement.type,
          category: achievement.category ?? '',
          isPublished: achievement.isPublished,
        }}
      />
    </div>
  );
}
