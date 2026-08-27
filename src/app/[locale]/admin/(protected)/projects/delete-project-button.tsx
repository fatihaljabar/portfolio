/**
 * Delete Project Button
 * Confirms before removing a project from the admin list
 */

'use client';

import { useTransition } from 'react';
import { deleteProject } from '@/lib/actions/admin-projects';
import { ConfirmDeleteDialog } from '../confirm-delete-dialog';
import { useToast } from '../toast-provider';

export function DeleteProjectButton({ id, title }: { id: string; title: string }) {
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProject(id);
      if (result.success) {
        showToast('Project deleted');
      } else {
        showToast(result.error ?? 'Failed to delete project', 'error');
      }
    });
  };

  return (
    <ConfirmDeleteDialog
      itemLabel="project"
      itemName={title}
      onConfirm={handleDelete}
      isPending={isPending}
    />
  );
}
