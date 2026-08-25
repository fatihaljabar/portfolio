/**
 * Admin Dashboard
 * Placeholder home — CRUD pages land in later M2 tasks.
 */

import type { Metadata } from 'next';
import { getAdminUser } from '@/lib/auth/server';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default async function AdminHomePage() {
  const user = await getAdminUser();

  return <p className="text-gray-900 dark:text-white">Logged in as {user?.email}</p>;
}
