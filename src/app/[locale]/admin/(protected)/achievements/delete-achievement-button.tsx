/**
 * Delete Achievement Button
 * Confirms before removing an achievement from the admin list
 */

'use client';

import { useTransition } from 'react';
import { deleteAchievement } from '@/lib/actions/admin-achievements';
import { ConfirmDeleteDialog } from '../confirm-delete-dialog';
import { useToast } from '../toast-provider';

export function DeleteAchievementButton({ id, title }: { id: string; title: string }) {
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleDelete = () => {
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
    <ConfirmDeleteDialog
      itemLabel="achievement"
      itemName={title}
      onConfirm={handleDelete}
      isPending={isPending}
    />
  );
}
