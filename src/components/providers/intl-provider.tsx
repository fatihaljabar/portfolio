/**
 * Intl Provider
 * Provides next-intl functionality to the application
 */

'use client';

import type { Messages } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: Messages;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Jakarta">
      {children}
    </NextIntlClientProvider>
  );
}
