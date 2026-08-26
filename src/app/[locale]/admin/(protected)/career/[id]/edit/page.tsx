/**
 * Edit Career Entry
 */

import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { updateCareer } from '@/lib/actions/admin-career';
import type { Locale } from '@/lib/i18n/config';
import { prisma } from '@/lib/prisma/client';
import { CareerForm } from '../../career-form';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Edit Career Entry',
  robots: { index: false, follow: false },
};

export default async function EditCareerPage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  const career = await prisma.career.findUnique({ where: { id } });

  if (!career) {
    notFound();
  }

  const boundUpdateCareer = updateCareer.bind(null, career.id);

  return (
    <div>
      <Link
        href={`/${locale}/admin/career`}
        className="inline-flex items-center gap-2 text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white transition-colors mb-6 text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Career
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">Edit Career Entry</h1>
      <CareerForm
        action={boundUpdateCareer}
        submitLabel="Save Changes"
        defaultValues={{
          positionEn: career.positionEn,
          positionId: career.positionId,
          company: career.company,
          companyLogoUrl: career.companyLogoUrl ?? '',
          employmentTypeEn: career.employmentTypeEn,
          employmentTypeId: career.employmentTypeId,
          location: career.location,
          startDate: career.startDate.toISOString().slice(0, 10),
          endDate: career.endDate ? career.endDate.toISOString().slice(0, 10) : '',
          responsibilitiesEn: career.responsibilitiesEn,
          responsibilitiesId: career.responsibilitiesId,
          learnedEn: career.learnedEn,
          learnedId: career.learnedId,
          impactEn: career.impactEn,
          impactId: career.impactId,
          isPublished: career.isPublished,
        }}
      />
    </div>
  );
}
