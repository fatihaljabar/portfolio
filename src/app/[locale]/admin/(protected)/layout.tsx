/**
 * Protected Admin Layout
 * Shell for every authenticated /admin page. Session is already
 * guaranteed by proxy.ts before this renders.
 */

import { prisma } from '@/lib/prisma/client';
import { AdminNav } from './admin-nav';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const unreadMessageCount = await prisma.message.count({ where: { isRead: false } });

  return (
    <div className="min-h-dvh flex flex-col bg-white dark:bg-[#0a0a0a]">
      <AdminNav unreadMessageCount={unreadMessageCount} />
      <main className="flex-1 p-4 lg:p-8">{children}</main>
    </div>
  );
}
