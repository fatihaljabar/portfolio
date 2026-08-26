/**
 * Public Layout
 * Wraps every public page with the portfolio sidebar/floating-nav chrome.
 * Admin routes live outside this group and don't get this chrome.
 */

import { MainLayout } from '@/components/layout/main-layout';
import { getSiteProfile } from '@/lib/site-profile';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const profile = await getSiteProfile();

  return <MainLayout photoUrl={profile?.photoUrl ?? null}>{children}</MainLayout>;
}
