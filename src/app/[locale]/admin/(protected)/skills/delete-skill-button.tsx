/**
 * Delete Skill Button
 * Confirms before removing a skill from the admin list
 */

'use client';

import { useTransition } from 'react';
import { deleteSkill } from '@/lib/actions/admin-skills';
import { ConfirmDeleteDialog } from '../confirm-delete-dialog';
import { useToast } from '../toast-provider';

export function DeleteSkillButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteSkill(id);
      if (result.success) {
        showToast('Skill deleted');
      } else {
        showToast(result.error ?? 'Failed to delete skill', 'error');
      }
    });
  };

  return (
    <ConfirmDeleteDialog
      itemLabel="skill"
      itemName={name}
      onConfirm={handleDelete}
      isPending={isPending}
    />
  );
}
