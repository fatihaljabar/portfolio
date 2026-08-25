/**
 * Protected Admin Layout
 * Shell for every authenticated /admin page. Session is already
 * guaranteed by proxy.ts before this renders.
 */

import { AdminNav } from './admin-nav';

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-white dark:bg-[#0a0a0a]">
      <AdminNav />
      <main className="flex-1 p-4 lg:p-8">{children}</main>
    </div>
  );
}
