/**
 * Protected Admin Layout
 * Shell for every authenticated /admin page. Session is already
 * guaranteed by proxy.ts before this renders.
 */

import { prisma } from '@/lib/prisma/client';
import { AdminSidebar } from './admin-sidebar';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const unreadMessageCount = await prisma.message.count({ where: { isRead: false } });

  return (
    <div className="min-h-dvh bg-white dark:bg-[#0a0a0a]">
      <AdminSidebar unreadMessageCount={unreadMessageCount} />
      <main className="lg:pl-60 pb-16 lg:pb-0">
        <div className="mx-auto max-w-5xl p-6 lg:p-10">{children}</div>
      </main>
    </div>
  );
}
