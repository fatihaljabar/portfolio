/**
 * Admin Dashboard
 */

import { Award, Briefcase, FolderKanban, GraduationCap, Mail, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ComponentType } from 'react';
import { getAdminUser } from '@/lib/auth/server';
import type { Locale } from '@/lib/i18n/config';
import { prisma } from '@/lib/prisma/client';
import { StatCard } from './stat-card';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

function formatRelativeTime(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) {
    return 'just now';
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }
  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days}d ago`;
  }
  return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
}

export default async function AdminHomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const [
    user,
    projectTotal,
    projectDrafts,
    achievementTotal,
    achievementDrafts,
    skillTotal,
    careerTotal,
    careerDrafts,
    educationTotal,
    educationDrafts,
    recentMessages,
    messageTotal,
    unreadMessageCount,
  ] = await Promise.all([
    getAdminUser(),
    prisma.project.count(),
    prisma.project.count({ where: { isPublished: false } }),
    prisma.achievement.count(),
    prisma.achievement.count({ where: { isPublished: false } }),
    prisma.skill.count(),
    prisma.career.count(),
    prisma.career.count({ where: { isPublished: false } }),
    prisma.education.count(),
    prisma.education.count({ where: { isPublished: false } }),
    prisma.message.findMany({ orderBy: { createdAt: 'desc' }, take: 3 }),
    prisma.message.count(),
    prisma.message.count({ where: { isRead: false } }),
  ]);

  const stats: {
    href: string;
    icon: ComponentType<{ size?: number; className?: string }>;
    count: number;
    label: string;
    subLabel?: string;
    subLabelUrgent?: boolean;
  }[] = [
    {
      href: `/${locale}/admin/projects`,
      icon: FolderKanban,
      count: projectTotal,
      label: 'Projects',
      subLabel: projectDrafts > 0 ? `${projectDrafts} draft` : undefined,
    },
    {
      href: `/${locale}/admin/achievements`,
      icon: Award,
      count: achievementTotal,
      label: 'Achievements',
      subLabel: achievementDrafts > 0 ? `${achievementDrafts} draft` : undefined,
    },
    {
      href: `/${locale}/admin/skills`,
      icon: Sparkles,
      count: skillTotal,
      label: 'Skills',
    },
    {
      href: `/${locale}/admin/career`,
      icon: Briefcase,
      count: careerTotal,
      label: 'Career',
      subLabel: careerDrafts > 0 ? `${careerDrafts} draft` : undefined,
    },
    {
      href: `/${locale}/admin/education`,
      icon: GraduationCap,
      count: educationTotal,
      label: 'Education',
      subLabel: educationDrafts > 0 ? `${educationDrafts} draft` : undefined,
    },
    {
      href: `/${locale}/admin/messages`,
      icon: Mail,
      count: messageTotal,
      label: 'Messages',
      subLabel: unreadMessageCount > 0 ? `${unreadMessageCount} unread` : undefined,
      subLabelUrgent: unreadMessageCount > 0,
    },
  ];

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-[#666] mb-2">
        Dashboard
      </p>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">
        Welcome back, {user?.email?.split('@')[0]}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.href} {...stat} />
        ))}
      </div>

      {recentMessages.length > 0 && (
        <div className="mt-10 max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-[#666]">
              Recent messages
            </p>
            <Link
              href={`/${locale}/admin/messages`}
              className="text-xs font-medium text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              View all
            </Link>
          </div>
          <ul className="flex flex-col gap-2">
            {recentMessages.map((message) => (
              <li key={message.id}>
                <Link
                  href={`/${locale}/admin/messages`}
                  className="flex items-start gap-3 rounded-xl border border-gray-200 dark:border-white/10 p-4 hover:border-gray-300 dark:hover:border-white/20 transition-colors"
                >
                  <span
                    className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                      message.isRead ? '' : 'bg-blue-500'
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                        {message.name}
                      </p>
                      <span className="text-xs text-gray-400 dark:text-[#666] shrink-0">
                        {formatRelativeTime(message.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-[#888] truncate">
                      {message.message}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
