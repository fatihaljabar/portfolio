/**
 * Protected Admin Layout
 * Shell for every authenticated /admin page. proxy.ts already redirects
 * unauthenticated visitors for the UX, but middleware alone isn't a
 * security boundary (a matcher edit or framework regression would have
 * no second line of defense), so this layout re-checks the session too.
 */

import { getLocale } from 'next-intl/server';
import { getAdminUser } from '@/lib/auth/server';
import { redirect } from '@/lib/i18n/navigation';
import { prisma } from '@/lib/prisma/client';
import { AdminSidebar } from './admin-sidebar';
import { ToastProvider } from './toast-provider';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminUser();
  if (!user) {
    const locale = await getLocale();
    redirect({ href: '/admin/login', locale });
  }

  const unreadMessageCount = await prisma.message.count({ where: { isRead: false } });

  return (
    <ToastProvider>
      <div className="min-h-dvh bg-white dark:bg-[#0a0a0a]">
        <AdminSidebar unreadMessageCount={unreadMessageCount} />
        <main className="lg:pl-60 pb-16 lg:pb-0">
          <div className="mx-auto max-w-5xl p-6 lg:p-10">{children}</div>
        </main>
      </div>
    </ToastProvider>
  );
}
