/**
 * New Education
 */

import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { createEducation } from '@/lib/actions/admin-education';
import type { Locale } from '@/lib/i18n/config';
import { EducationForm } from '../education-form';

export const metadata: Metadata = {
  title: 'New Education',
  robots: { index: false, follow: false },
};

export default async function NewEducationPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <Link
        href={`/${locale}/admin/education`}
        className="inline-flex items-center gap-2 text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white transition-colors mb-6 text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Education
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">New Education</h1>
      <EducationForm action={createEducation} submitLabel="Create Education" />
    </div>
  );
}
