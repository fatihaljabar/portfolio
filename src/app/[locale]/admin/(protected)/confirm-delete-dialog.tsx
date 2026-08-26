/**
 * Confirm Delete Dialog
 * Minimal alert dialog for destructive admin actions, replacing
 * window.confirm() with something that matches the admin's design
 */

'use client';

import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ConfirmDeleteDialogProps {
  itemLabel: string;
  itemName: string;
  onConfirm: () => void;
  isPending: boolean;
}

export function ConfirmDeleteDialog({
  itemLabel,
  itemName,
  onConfirm,
  isPending,
}: ConfirmDeleteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-xs font-medium px-3 py-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
        >
          Delete
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-sm rounded-2xl border-gray-200 dark:border-white/10 bg-white dark:bg-[#121212] p-6">
        <DialogHeader className="items-center text-center gap-3 sm:text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <DialogTitle className="text-gray-900 dark:text-white">Delete {itemLabel}?</DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-[#888]">
            <span className="font-medium text-gray-700 dark:text-[#ccc]">
              &ldquo;{itemName}&rdquo;
            </span>{' '}
            will be permanently removed. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-2 gap-2 sm:justify-center">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 rounded-xl border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-[#ccc] hover:bg-gray-100 dark:hover:bg-white/5 transition-colors sm:flex-none"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={() => {
              setIsOpen(false);
              onConfirm();
            }}
            className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-600 transition-colors disabled:opacity-50 sm:flex-none"
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
