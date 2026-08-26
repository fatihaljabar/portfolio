/**
 * Delete Achievement Button
 * Confirms before removing an achievement from the admin list
 */

'use client';

import { useTransition } from 'react';
import { deleteAchievement } from '@/lib/actions/admin-achievements';
import { useToast } from '../toast-provider';

export function DeleteAchievementButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleDelete = () => {
    if (!window.confirm('Delete this achievement? This cannot be undone.')) {
      return;
    }
    startTransition(async () => {
      const result = await deleteAchievement(id);
      if (result.success) {
        showToast('Achievement deleted');
      } else {
        showToast(result.error ?? 'Failed to delete achievement', 'error');
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="text-xs font-medium px-3 py-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
    >
      Delete
    </button>
  );
}
