/**
 * New Career Entry
 */

import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { createCareer } from '@/lib/actions/admin-career';
import type { Locale } from '@/lib/i18n/config';
import { CareerForm } from '../career-form';

export const metadata: Metadata = {
  title: 'New Career Entry',
  robots: { index: false, follow: false },
};

export default async function NewCareerPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return (
    <div>
      <Link
        href={`/${locale}/admin/career`}
        className="inline-flex items-center gap-2 text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white transition-colors mb-6 text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Career
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">New Career Entry</h1>
      <CareerForm action={createCareer} submitLabel="Create Career Entry" />
    </div>
  );
}
