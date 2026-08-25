/**
 * Delete Achievement Button
 * Confirms before removing an achievement from the admin list
 */

'use client';

import { useTransition } from 'react';
import { deleteAchievement } from '@/lib/actions/admin-achievements';

export function DeleteAchievementButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!window.confirm('Delete this achievement? This cannot be undone.')) {
      return;
    }
    startTransition(async () => {
      await deleteAchievement(id);
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="text-xs font-medium px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
    >
      Delete
    </button>
  );
}
