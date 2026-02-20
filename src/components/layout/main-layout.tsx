/**
 * Main Layout Component
 * Wraps page content with sidebar and floating navigation
 */

import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { FloatingNav } from './floating-nav';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="max-w-[1300px] mx-auto min-h-screen flex flex-col lg:flex-row border-x border-white/5 shadow-2xl bg-[#0a0a0a]">
      <Sidebar />
      <main className="flex-1 w-full p-8 lg:p-20 pb-40 cursor-gray-dot">{children}</main>
      <FloatingNav />
    </div>
  );
}
