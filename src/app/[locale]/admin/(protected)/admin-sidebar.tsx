/**
 * Admin Sidebar
 * Fixed left rail on desktop (lg+); on mobile/tablet, a slim top bar
 * (wordmark + log out) plus a fixed bottom tab bar for the four
 * destinations — session action and navigation stay visually separate.
 */

'use client';

import {
  Award,
  Briefcase,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Mail,
  Sparkles,
  UserCircle,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { logout } from '@/lib/actions/auth';

const navItems = [
  { path: 'admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: 'admin/profile', label: 'Profile', icon: UserCircle },
  { path: 'admin/projects', label: 'Projects', icon: FolderKanban },
  { path: 'admin/achievements', label: 'Achievements', icon: Award },
  { path: 'admin/skills', label: 'Skills', icon: Sparkles },
  { path: 'admin/career', label: 'Career', icon: Briefcase },
  { path: 'admin/education', label: 'Education', icon: GraduationCap },
  { path: 'admin/messages', label: 'Messages', icon: Mail },
];

export function AdminSidebar({ unreadMessageCount }: { unreadMessageCount: number }) {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const items = navItems.map((item) => {
    const href = `/${locale}/${item.path}`;
    return {
      ...item,
      href,
      isActive: pathname === href,
      badgeCount: item.path === 'admin/messages' ? unreadMessageCount : 0,
    };
  });

  return (
    <>
      {/* Mobile / tablet — slim top bar */}
      <header className="lg:hidden sticky top-0 z-20 flex items-center justify-between h-14 px-4 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a]">
        <span className="font-bold text-sm text-gray-900 dark:text-white">Admin</span>
        <form action={logout}>
          <button
            type="submit"
            aria-label="Log out"
            className="flex items-center justify-center w-11 h-11 -mr-2 rounded-xl text-gray-500 dark:text-[#888] hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <LogOut size={18} />
          </button>
        </form>
      </header>

      {/* Mobile / tablet — fixed bottom tab bar */}
      <nav className="lg:hidden fixed inset-x-0 bottom-0 z-20 flex items-stretch justify-around border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.href}
              aria-label={
                item.badgeCount > 0 ? `${item.label} (${item.badgeCount} unread)` : item.label
              }
              className={`relative flex flex-1 items-center justify-center h-14 transition-colors ${
                item.isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-[#666]'
              }`}
            >
              <Icon size={22} />
              {item.badgeCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute top-2.5 right-1/2 translate-x-3 h-4 min-w-[16px] px-1 py-0 text-[9px] leading-none items-center justify-center"
                >
                  {item.badgeCount}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Desktop — fixed left sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-60 border-r border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a]">
        <div className="h-16 flex items-center px-6">
          <span className="font-bold text-gray-900 dark:text-white">Admin</span>
        </div>

        <nav className="flex-1 flex flex-col gap-1 px-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  item.isActive
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                    : 'text-gray-500 dark:text-[#888] hover:bg-gray-100 dark:hover:bg-white/10'
                }`}
              >
                <Icon size={18} />
                <span className="flex-1">{item.label}</span>
                {item.badgeCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="h-5 min-w-[20px] px-1 justify-center text-[10px]"
                  >
                    {item.badgeCount}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-200 dark:border-white/10">
          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 dark:text-[#888] hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <LogOut size={18} />
              Log out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
