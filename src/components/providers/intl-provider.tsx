/**
 * Intl Provider
 * Provides next-intl functionality to the application
 */

'use client';

import { NextIntlClientProvider } from 'next-intl';
import type { Messages } from 'next-intl';
import { ThemeProvider } from './theme-provider';

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: Messages;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
