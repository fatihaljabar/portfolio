/**
 * Admin Home
 * Placeholder landing page — real shell/nav lands in a later M2 task.
 * Reaching this page at all proves the proxy session gate works.
 */

import type { Metadata } from 'next';
import { logout } from '@/lib/actions/auth';
import { getAdminUser } from '@/lib/auth/server';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default async function AdminHomePage() {
  const user = await getAdminUser();

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-6 p-8 bg-white dark:bg-[#0a0a0a]">
      <p className="text-gray-900 dark:text-white">Logged in as {user?.email}</p>
      <form action={logout}>
        <button
          type="submit"
          className="bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200"
        >
          Log out
        </button>
      </form>
    </div>
  );
}
