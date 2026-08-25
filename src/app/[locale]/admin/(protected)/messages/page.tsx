/**
 * Admin Messages Inbox
 * Contact form submissions — newest first, mark as read, delete
 */

import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma/client';
import { MessageActions } from './message-actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Messages',
  robots: { index: false, follow: false },
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export default async function AdminMessagesPage() {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } });

  if (messages.length === 0) {
    return <p className="text-gray-500 dark:text-[#888] text-sm">No messages yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-3 max-w-3xl">
      {messages.map((message) => (
        <li
          key={message.id}
          className={`rounded-2xl border p-4 lg:p-6 ${
            message.isRead
              ? 'border-gray-200 dark:border-white/10'
              : 'border-gray-900 dark:border-white/40 bg-gray-50 dark:bg-white/5'
          }`}
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="font-bold text-gray-900 dark:text-white">{message.name}</p>
              <p className="text-sm text-gray-500 dark:text-[#888]">{message.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 dark:text-[#666] shrink-0">
                {dateFormatter.format(message.createdAt)}
              </span>
              <MessageActions id={message.id} isRead={message.isRead} />
            </div>
          </div>
          <p className="text-sm text-gray-700 dark:text-[#ccc] whitespace-pre-wrap">
            {message.message}
          </p>
        </li>
      ))}
    </ul>
  );
}
