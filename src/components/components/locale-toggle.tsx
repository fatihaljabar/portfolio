'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';
import { locales, type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LocaleToggle() {
  const locale = useLocale() as Locale;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    // Update URL with new locale
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(`/${locale}`, '').replace(/^\//, '') || '';
    window.location.href = `/${newLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`;
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#151515] p-1.5 rounded-full border border-gray-200 dark:border-white/5 opacity-50">
        <Globe size={16} className="text-gray-400 dark:text-[#666]" />
        <div className="w-9 h-5 rounded-full bg-gray-300 dark:bg-[#333]" />
      </div>
    );
  }

  const localeNames: Record<Locale, string> = {
    en: 'English',
    id: 'Indonesia',
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 bg-gray-100 dark:bg-[#151515] hover:bg-gray-200 dark:hover:bg-[#1a1a1a] h-8 px-3 rounded-full border border-gray-200 dark:border-white/5 text-gray-600 dark:text-[#ccc] hover:text-gray-900 dark:hover:text-white transition-colors relative z-50"
        >
          <Globe size={16} className="text-gray-600 dark:text-white" />
          <span className="text-xs font-medium">
            {localeNames[locale]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-auto min-w-32 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-white/10 z-[100]">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={`text-gray-600 dark:text-[#ccc] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 focus:text-gray-900 dark:focus:text-white cursor-pointer py-2 px-3 flex items-center gap-2 ${
              locale === loc ? 'bg-gray-100 dark:bg-white/5' : ''
            }`}
          >
            <Globe className="h-4 w-4 shrink-0" />
            <span className="text-xs font-medium">{localeNames[loc]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
