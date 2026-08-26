/**
 * Delete Career Button
 * Confirms before removing a career entry from the admin list
 */

'use client';

import { useTransition } from 'react';
import { deleteCareer } from '@/lib/actions/admin-career';
import { ConfirmDeleteDialog } from '../confirm-delete-dialog';
import { useToast } from '../toast-provider';

export function DeleteCareerButton({ id, position }: { id: string; position: string }) {
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteCareer(id);
      if (result.success) {
        showToast('Career entry deleted');
      } else {
        showToast(result.error ?? 'Failed to delete career entry', 'error');
      }
    });
  };

  return (
    <ConfirmDeleteDialog
      itemLabel="career entry"
      itemName={position}
      onConfirm={handleDelete}
      isPending={isPending}
    />
  );
}
