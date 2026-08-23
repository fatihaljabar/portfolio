/**
 * Locale Layout
 * Provides next-intl context and locale-dependent content. Does NOT own
 * <html>/<body> — see src/app/layout.tsx for why that lives higher up.
 */

import { notFound } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { HtmlLangSync } from '@/components/providers/html-lang-sync';
import { Providers } from '@/components/providers/intl-provider';
import { locales } from '@/lib/i18n/config';
import { routing } from '@/lib/i18n/navigation';

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
    <Providers locale={locale} messages={messages}>
      <HtmlLangSync locale={locale} />
      <MainLayout>{children}</MainLayout>
    </Providers>
  );
}
