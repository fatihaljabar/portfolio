/**
 * Public Layout
 * Wraps every public page with the portfolio sidebar/floating-nav chrome.
 * Admin routes live outside this group and don't get this chrome.
 */

import { MainLayout } from '@/components/layout/main-layout';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
