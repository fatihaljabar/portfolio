/**
 * Delete Education Button
 * Confirms before removing an education entry from the admin list
 */

'use client';

import { useTransition } from 'react';
import { deleteEducation } from '@/lib/actions/admin-education';
import { ConfirmDeleteDialog } from '../confirm-delete-dialog';
import { useToast } from '../toast-provider';

export function DeleteEducationButton({ id, university }: { id: string; university: string }) {
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteEducation(id);
      if (result.success) {
        showToast('Education entry deleted');
      } else {
        showToast(result.error ?? 'Failed to delete education entry', 'error');
      }
    });
  };

  return (
    <ConfirmDeleteDialog
      itemLabel="education entry"
      itemName={university}
      onConfirm={handleDelete}
      isPending={isPending}
    />
  );
}
