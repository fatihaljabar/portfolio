/**
 * Delete Project Button
 * Confirms before removing a project from the admin list
 */

'use client';

import { useTransition } from 'react';
import { deleteProject } from '@/lib/actions/admin-projects';

export function DeleteProjectButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!window.confirm('Delete this project? This cannot be undone.')) {
      return;
    }
    startTransition(async () => {
      await deleteProject(id);
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
