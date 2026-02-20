/**
 * Floating Navigation Component
 * Bottom floating navigation bar with tooltips
 */

'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '@/lib/i18n/navigation';
import { useState, useEffect } from 'react';
import {
  Home,
  User,
  Award,
  Folder,
  Mail,
  Heart,
} from 'lucide-react';
import { toggleLove, hasLoved, getLoveCount } from '@/lib/actions/love';

interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  label: string;
}

export function FloatingNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isLoved, setIsLoved] = useState(false);
  const [loveCount, setLoveCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Check love status on mount
  useEffect(() => {
    const checkLoveStatus = async () => {
      const [loved, count] = await Promise.all([hasLoved(), getLoveCount()]);
      setIsLoved(loved);
      setLoveCount(count);
    };
    checkLoveStatus();
  }, []);

  const navItems: NavItem[] = [
    { href: '/', icon: Home, label: t('home') },
    { href: '/about', icon: User, label: t('about') },
    { href: '/achievements', icon: Award, label: t('achievements') },
    { href: '/projects', icon: Folder, label: t('projects') },
    { href: '/contact', icon: Mail, label: t('contact') },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === `/${pathname.split('/')[1]}`;
    }
    return pathname.includes(href);
  };

  const handleLoveClick = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const result = await toggleLove();
      if (result.success) {
        setIsLoved(result.isLoved);
        if (result.totalLoves !== undefined) {
          setLoveCount(result.totalLoves);
        }
      }
    } catch (error) {
      console.error('Failed to toggle love:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-0 lg:left-[380px] right-0 z-50 flex justify-center pointer-events-none">
      <nav className="flex items-center gap-1.5 bg-[#121212]/90 backdrop-blur-xl border border-white/10 px-2 py-1.5 rounded-full shadow-2xl pointer-events-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative p-2.5 transition-all duration-300 ${
                active
                  ? 'text-white ring-white/20 bg-transparent'
                  : 'text-[#888] hover:text-white hover:ring-white/20 hover:bg-transparent'
              }`}
            >
              <Icon className="text-xl" size={20} />
              <span className="absolute bottom-[125%] left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white px-2.5 py-1 rounded-md text-[11px] font-medium border border-white/10 shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:-translate-y-1 transition-all duration-200 pointer-events-none">
                {item.label}
              </span>
            </Link>
          );
        })}

        <div className="w-[1px] h-4 bg-white/10 mx-0.5"></div>

        {/* Love/Support Button */}
        <button
          onClick={handleLoveClick}
          disabled={isLoading}
          className="group relative p-2.5 text-[#888] transition-all duration-300 hover:text-white hover:ring-white/20 hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`${t('support')} (${loveCount})`}
        >
          <div className="relative">
            <Heart
              className={`text-xl transition-all ${isLoved ? 'text-red-500 fill-red-500 scale-110' : ''}`}
              size={20}
              fill={isLoved ? 'currentColor' : 'none'}
            />
            {loveCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-yellow text-black text-[9px] font-bold px-1 rounded-full min-w-[14px] text-center">
                {loveCount}
              </span>
            )}
          </div>
          <span className="absolute bottom-[125%] left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white px-2.5 py-1 rounded-md text-[11px] font-medium border border-white/10 shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:-translate-y-1 transition-all duration-200 pointer-events-none">
            {t('support')} ({loveCount})
          </span>
        </button>
      </nav>
    </div>
  );
}
