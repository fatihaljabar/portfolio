/**
 * Main Layout Component
 * Wraps page content with sidebar and floating navigation
 */

import type { ReactNode } from 'react';
import { FloatingNav } from './floating-nav';
import { Sidebar } from './sidebar';

interface MainLayoutProps {
  children: ReactNode;
  photoUrl: string | null;
}

export function MainLayout({ children, photoUrl }: MainLayoutProps) {
  return (
    <div className="max-w-[1300px] mx-auto min-h-screen flex flex-col lg:flex-row border-x border-black/5 dark:border-white/5 shadow-2xl bg-white dark:bg-[#0a0a0a]">
      <Sidebar photoUrl={photoUrl} />
      <main className="flex-1 min-w-0 w-full pt-8 px-8 lg:pt-20 lg:px-20 pb-28 cursor-gray-dot">
        {children}
      </main>
      <FloatingNav />
    </div>
  );
}
