/**
 * Edit Education Entry
 */

import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { updateEducation } from '@/lib/actions/admin-education';
import type { Locale } from '@/lib/i18n/config';
import { prisma } from '@/lib/prisma/client';
import { EducationForm } from '../../education-form';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Edit Education Entry',
  robots: { index: false, follow: false },
};

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  const education = await prisma.education.findUnique({ where: { id } });

  if (!education) {
    notFound();
  }

  const boundUpdateEducation = updateEducation.bind(null, education.id);

  return (
    <div>
      <Link
        href={`/${locale}/admin/education`}
        className="inline-flex items-center gap-2 text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white transition-colors mb-6 text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Education
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">
        Edit Education Entry
      </h1>
      <EducationForm
        action={boundUpdateEducation}
        submitLabel="Save Changes"
        defaultValues={{
          university: education.university,
          degreeEn: education.degreeEn,
          degreeId: education.degreeId,
          gpaEn: education.gpaEn ?? '',
          gpaId: education.gpaId ?? '',
          location: education.location,
          logoUrl: education.logoUrl ?? '',
          startDate: education.startDate.toISOString().slice(0, 10),
          endDate: education.endDate ? education.endDate.toISOString().slice(0, 10) : '',
          thesisLabelEn: education.thesisLabelEn ?? '',
          thesisLabelId: education.thesisLabelId ?? '',
          thesisProjectTitleEn: education.thesisProjectTitleEn ?? '',
          thesisProjectTitleId: education.thesisProjectTitleId ?? '',
          thesisDetailsEn: education.thesisDetailsEn ?? '',
          thesisDetailsId: education.thesisDetailsId ?? '',
          thesisProjectSlug: education.thesisProjectSlug ?? '',
          thesisJournalUrl: education.thesisJournalUrl ?? '',
          thesisJournalLabelEn: education.thesisJournalLabelEn ?? '',
          thesisJournalLabelId: education.thesisJournalLabelId ?? '',
          isPublished: education.isPublished,
        }}
      />
    </div>
  );
}
