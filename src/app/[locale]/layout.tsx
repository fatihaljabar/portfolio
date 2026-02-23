/**
 * Locale Layout
 * Layout for localized routes - handles i18n providers
 */

import { routing } from '@/lib/i18n/navigation';
import { Providers } from '@/components/providers/intl-provider';
import { MainLayout } from '@/components/layout/main-layout';

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
    <Providers locale={validLocale} messages={messages}>
      <MainLayout>{children}</MainLayout>
    </Providers>
  );
}
