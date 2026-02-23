/**
 * Intl Provider
 * Provides next-intl and theme functionality to the application
 */

'use client';

import { NextIntlClientProvider } from 'next-intl';
import type { Messages } from 'next-intl';
import { ThemeProvider } from '@/components/providers/theme-provider';

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: Messages;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Jakarta">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        storageKey="portfolio-theme"
      >
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
