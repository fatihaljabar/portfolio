/**
 * Error Boundary — Admin
 * Catches rendering errors within the protected admin dashboard so one
 * broken page doesn't take down the sidebar/shell around it.
 *
 * Uses `retry`, not `reset`: reset() only clears the client-side error
 * state and re-renders without re-fetching, so if the original error was
 * a failed database query (e.g. a Prisma call during a cold Hostinger
 * process), clicking it hits the exact same stale failure again. retry()
 * (stable since Next.js 16.3) actually re-fetches and re-renders the
 * segment, which is what "Try again" should mean for a data error.
 */

'use client';

import { TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function AdminErrorBoundary({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const t = useTranslations('common');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <TriangleAlert className="text-gray-300 dark:text-[#333] mb-4" size={64} />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('error')}</h2>
      <p className="text-gray-500 dark:text-[#888] text-sm max-w-md mb-8">
        {t('error_description')}
      </p>
      <button
        type="button"
        onClick={retry}
        className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
      >
        {t('retry')}
      </button>
    </div>
  );
}
