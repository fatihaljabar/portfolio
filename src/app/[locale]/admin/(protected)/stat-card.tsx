/**
 * Stat Card
 * Dashboard tile linking to a content section, with its total count and
 * an optional secondary status (draft count, unread count)
 */

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { ComponentType } from 'react';

interface StatCardProps {
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  count: number;
  label: string;
  subLabel?: string;
  subLabelUrgent?: boolean;
}

export function StatCard({
  href,
  icon: Icon,
  count,
  label,
  subLabel,
  subLabelUrgent,
}: StatCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 p-6 hover:border-gray-300 dark:hover:border-white/20 transition-colors"
    >
      <Icon className="absolute -right-3 -bottom-3 text-[100px] text-gray-500/5 rotate-12" />
      <div className="relative flex items-start justify-between mb-8">
        <Icon className="text-gray-900 dark:text-white" size={20} />
        <ArrowUpRight
          className="text-gray-300 dark:text-[#444] group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
          size={16}
        />
      </div>
      <p className="relative text-3xl font-bold text-gray-900 dark:text-white">{count}</p>
      <p className="relative text-sm text-gray-500 dark:text-[#888] mt-1">
        {label}
        {subLabel && (
          <span className={subLabelUrgent ? 'text-blue-500' : 'text-gray-400 dark:text-[#666]'}>
            {' '}
            · {subLabel}
          </span>
        )}
      </p>
    </Link>
  );
}
