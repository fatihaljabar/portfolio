'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import React from 'react';
import type { Locale } from '@/lib/i18n/config';
import { usePathname, useRouter } from '@/lib/i18n/navigation';

const localeNames: Record<Locale, string> = {
  en: 'English',
  id: 'Indonesia',
};

export function LocaleToggle() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center lg:justify-start gap-0 lg:gap-2 bg-transparent lg:bg-gray-100 dark:lg:bg-[#151515] h-11 w-11 lg:h-8 lg:w-auto lg:px-3 rounded-full border border-transparent lg:border-gray-200 dark:lg:border-white/5 opacity-50">
        <Globe size={16} className="text-gray-400 dark:text-[#666]" />
        <div className="hidden lg:block w-9 h-5 rounded-full bg-gray-300 dark:bg-[#333]" />
      </div>
    );
  }

  const nextLocale: Locale = locale === 'en' ? 'id' : 'en';

  const handleClick = () => {
    if (isPending) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- pathname is a template like "/projects/[slug]"; params fills in the dynamic segments
        { pathname, params },
        { locale: nextLocale, scroll: false },
      );
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={`Switch to ${localeNames[nextLocale]}`}
      className="flex items-center justify-center lg:justify-start gap-0 lg:gap-2 bg-transparent lg:bg-gray-100 dark:lg:bg-[#151515] hover:bg-transparent lg:hover:bg-gray-200 dark:lg:hover:bg-[#1a1a1a] h-11 w-11 lg:h-8 lg:w-auto lg:px-3 rounded-full border border-transparent lg:border-gray-200 dark:lg:border-white/5 text-gray-600 dark:text-[#ccc] hover:text-gray-900 dark:hover:text-white transition-colors duration-200 overflow-hidden disabled:opacity-60 disabled:cursor-wait shrink-0"
    >
      <Globe size={16} className="shrink-0" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={locale}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="hidden lg:inline text-xs font-medium uppercase"
        >
          {locale}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
