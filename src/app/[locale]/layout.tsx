/**
 * Locale Layout
 * Layout for localized routes
 */

import { MainLayout } from '@/components/layout/main-layout';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
