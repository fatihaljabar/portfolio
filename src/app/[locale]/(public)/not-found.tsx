/**
 * Not Found Page
 * Shown when a route inside [locale] doesn't resolve (e.g. an unknown project slug)
 *
 * Next.js doesn't pass the [locale] route param to not-found.tsx. Reading
 * the locale any other way here — including next-intl's own Link/
 * getTranslations, which resolve it via request-scoped dynamic APIs when
 * no static param is available — forces the entire route tree out of
 * static rendering. Since this is a low-traffic page, it shows both
 * languages and uses a plain <a> instead, rather than paying that cost.
 */

import { SearchX } from 'lucide-react';
import en from '@/messages/en.json';
import id from '@/messages/id.json';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <SearchX className="text-gray-300 dark:text-[#333] mb-4" size={64} />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {en.common.not_found} / {id.common.not_found}
      </h2>
      <p className="text-gray-500 dark:text-[#888] text-sm max-w-md mb-8">
        {en.common.not_found_description}
        <br />
        {id.common.not_found_description}
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
      >
        {en.common.back_home} / {id.common.back_home}
      </a>
    </div>
  );
}
