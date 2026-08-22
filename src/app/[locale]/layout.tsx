/**
 * Locale Layout
 * Root layout for localized routes — owns <html>/<body> since the locale
 * (needed for the lang attribute) is only known inside the [locale] segment
 */

import type { Metadata, Viewport } from 'next';
import { Manrope, Sacramento } from 'next/font/google';
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
  const validLocale = locale || 'en';

  // Import messages directly based on locale
  const messages = (await import(`@/messages/${validLocale}.json`)).default;

  return (
    <html lang={validLocale} suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${sacramento.variable}`}
        suppressHydrationWarning
      >
        <Providers locale={validLocale} messages={messages}>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
