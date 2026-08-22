/**
 * Locale Layout
 * Root layout for localized routes — owns <html>/<body> since the locale
 * (needed for the lang attribute) is only known inside the [locale] segment
 */

import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Manrope, Sacramento } from 'next/font/google';
import { locales } from '@/lib/i18n/config';
import { routing } from '@/lib/i18n/navigation';
import { Providers } from '@/components/providers/intl-provider';
import { MainLayout } from '@/components/layout/main-layout';
import '../globals.css';

export const viewport: Viewport = {
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL((process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '')),
};

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const sacramento = Sacramento({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-sacramento',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${sacramento.variable}`}
        suppressHydrationWarning
      >
        <Providers locale={locale} messages={messages}>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
