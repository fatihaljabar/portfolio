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
  const unreadCount = messages.filter((message) => !message.isRead).length;

  return (
    <div>
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-[#666] mb-2">
          {messages.length} total{unreadCount > 0 && ` · ${unreadCount} unread`}
        </p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
      </div>

      {messages.length === 0 ? (
        <p className="text-gray-500 dark:text-[#888] text-sm">No messages yet.</p>
      ) : (
        <ul className="flex flex-col gap-3 max-w-2xl">
          {messages.map((message) => (
            <li
              key={message.id}
              className={`relative rounded-2xl border p-5 lg:p-6 ${
                message.isRead
                  ? 'border-gray-200 dark:border-white/10'
                  : 'border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-white/[0.03]'
              }`}
            >
              {!message.isRead && (
                <span className="absolute top-6 -left-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-[#0a0a0a]" />
              )}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{message.name}</p>
                  <p className="text-sm text-gray-500 dark:text-[#888]">{message.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 dark:text-[#666] shrink-0 hidden sm:inline">
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
      )}
    </div>
  );
}
