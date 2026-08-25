/**
 * Message Actions
 * Per-row mark-as-read / delete buttons for the inbox
 */

'use client';

import { useTransition } from 'react';
import { deleteMessage, markMessageAsRead } from '@/lib/actions/messages';

export function MessageActions({ id, isRead }: { id: string; isRead: boolean }) {
  const [isPending, startTransition] = useTransition();

  const handleMarkAsRead = () => {
    startTransition(async () => {
      await markMessageAsRead(id);
    });
  };

  const handleDelete = () => {
    if (!window.confirm('Delete this message? This cannot be undone.')) {
      return;
    }
    startTransition(async () => {
      await deleteMessage(id);
    });
  };

  return (
    <div className="flex items-center gap-2 shrink-0">
      {!isRead && (
        <button
          type="button"
          onClick={handleMarkAsRead}
          disabled={isPending}
          className="text-xs font-medium px-3 py-1.5 rounded-lg text-gray-500 dark:text-[#888] hover:bg-gray-100 dark:hover:bg-white/10 transition-colors disabled:opacity-50"
        >
          Mark as read
        </button>
      )}
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="text-xs font-medium px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
