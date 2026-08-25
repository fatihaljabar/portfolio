/**
 * New Achievement
 */

import type { Metadata } from 'next';
import { createAchievement } from '@/lib/actions/admin-achievements';
import { AchievementForm } from '../achievement-form';

export const metadata: Metadata = {
  title: 'New Achievement',
  robots: { index: false, follow: false },
};

export default function NewAchievementPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">New Achievement</h1>
      <AchievementForm action={createAchievement} submitLabel="Create Achievement" />
    </div>
  );
}
