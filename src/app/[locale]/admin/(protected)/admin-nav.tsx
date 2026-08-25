/**
 * Admin Nav
 * Top bar for the protected admin shell. Icon-only on mobile (44x44px
 * touch targets), icon+label from lg — same bare-icon/chip pattern the
 * public sidebar uses for its own toggles.
 */

'use client';

import { Award, FolderKanban, LayoutDashboard, LogOut, Mail } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/actions/auth';

const navItems = [
  { path: 'admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: 'admin/projects', label: 'Projects', icon: FolderKanban },
  { path: 'admin/achievements', label: 'Achievements', icon: Award },
  { path: 'admin/messages', label: 'Messages', icon: Mail },
];

export function AdminNav() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  return (
    <nav className="flex items-center justify-between gap-2 px-4 lg:px-8 py-3 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a]">
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const href = `/${locale}/${item.path}`;
          const isActive = pathname === href;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={href}
              aria-label={item.label}
              className={`shrink-0 flex items-center gap-2 w-11 h-11 lg:w-auto lg:h-auto justify-center lg:px-4 lg:py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                  : 'text-gray-500 dark:text-[#888] hover:bg-gray-100 dark:hover:bg-white/10'
              }`}
            >
              <Icon size={18} />
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <form action={logout}>
        <button
          type="submit"
          aria-label="Log out"
          className="shrink-0 flex items-center gap-2 w-11 h-11 lg:w-auto lg:h-auto justify-center lg:px-4 lg:py-2 rounded-xl text-sm font-medium text-gray-500 dark:text-[#888] hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
        >
          <LogOut size={18} />
          <span className="hidden lg:inline">Log out</span>
        </button>
      </form>
    </nav>
  );
}
