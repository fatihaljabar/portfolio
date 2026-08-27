/**
 * Error Boundary
 * Catches rendering errors within a locale route so one broken page
 * doesn't take down the rest of the site
 */

'use client';

import { TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
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
        onClick={reset}
        className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
      >
        {t('retry')}
      </button>
    </div>
  );
}
