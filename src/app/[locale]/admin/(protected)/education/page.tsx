/**
 * Admin Education List
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { Badge } from '@/components/ui/badge';
import { formatDateRange } from '@/lib/format-date-range';
import type { Locale } from '@/lib/i18n/config';
import { prisma } from '@/lib/prisma/client';
import { ToastFromSearchParams } from '../toast-from-search-params';
import { DeleteEducationButton } from './delete-education-button';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Education',
  robots: { index: false, follow: false },
};

export default async function AdminEducationPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const entries = await prisma.education.findMany({ orderBy: { startDate: 'desc' } });

  return (
    <div>
      <Suspense fallback={null}>
        <ToastFromSearchParams />
      </Suspense>
      <div className="flex items-start justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-[#666] mb-2">
            {entries.length} total
          </p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h1>
        </div>
        <Link
          href={`/${locale}/admin/education/new`}
          className="shrink-0 bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          New Education
        </Link>
      </div>

      {entries.length === 0 ? (
        <p className="text-gray-500 dark:text-[#888] text-sm">No education entries yet.</p>
      ) : (
        <ul className="flex flex-col">
          {entries.map((entry, index) => (
            <li
              key={entry.id}
              className={`flex items-center gap-4 py-4 ${
                index !== 0 ? 'border-t border-gray-200 dark:border-white/10' : ''
              }`}
            >
              <div className="shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                {entry.logoUrl ? (
                  <Image
                    src={entry.logoUrl}
                    alt=""
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-300 dark:text-[#444] text-xs font-bold">
                    {entry.university.charAt(0)}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-gray-900 dark:text-white truncate">
                    {entry.university}
                  </p>
                  {!entry.isPublished && (
                    <Badge variant="destructive" className="text-[10px]">
                      Draft
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-[#888] truncate">
                  {entry.degreeEn} · {formatDateRange(entry.startDate, entry.endDate, locale)}
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <Link
                  href={`/${locale}/admin/education/${entry.id}/edit`}
                  className="text-xs font-medium px-3 py-2 rounded-lg text-gray-500 dark:text-[#888] hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                >
                  Edit
                </Link>
                <DeleteEducationButton id={entry.id} university={entry.university} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
