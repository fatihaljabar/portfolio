/**
 * Admin Skills List
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { prisma } from '@/lib/prisma/client';
import { getTechIcon } from '@/lib/tech-icon';
import { ToastFromSearchParams } from '../toast-from-search-params';
import { DeleteSkillButton } from './delete-skill-button';
import { SkillBadgePreview } from './skill-badge-preview';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Skills',
  robots: { index: false, follow: false },
};

export default async function AdminSkillsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const skills = await prisma.skill.findMany({
    orderBy: [{ category: 'asc' }, { createdAt: 'asc' }],
  });

  const categories = new Map<string, typeof skills>();
  for (const skill of skills) {
    const group = categories.get(skill.category) ?? [];
    group.push(skill);
    categories.set(skill.category, group);
  }

  return (
    <div>
      <Suspense fallback={null}>
        <ToastFromSearchParams />
      </Suspense>
      <div className="flex items-start justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-[#666] mb-2">
            {skills.length} total
          </p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Skills</h1>
        </div>
        <Link
          href={`/${locale}/admin/skills/new`}
          className="shrink-0 bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          New Skill
        </Link>
      </div>

      {skills.length === 0 ? (
        <p className="text-gray-500 dark:text-[#888] text-sm">No skills yet.</p>
      ) : (
        <div className="flex flex-col gap-10">
          {[...categories.entries()].map(([category, group]) => (
            <div key={category}>
              <p className="text-[11px] font-bold text-gray-400 dark:text-[#666] tracking-widest uppercase mb-4">
                {category}
              </p>
              <ul className="flex flex-col">
                {group.map((skill, index) => (
                  <li
                    key={skill.id}
                    className={`flex items-center gap-4 py-4 ${
                      index !== 0 ? 'border-t border-gray-200 dark:border-white/10' : ''
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <SkillBadgePreview
                        name={skill.name}
                        color={skill.color}
                        icon={getTechIcon(skill.name)}
                      />
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <Link
                        href={`/${locale}/admin/skills/${skill.id}/edit`}
                        className="text-xs font-medium px-3 py-2 rounded-lg text-gray-500 dark:text-[#888] hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                      >
                        Edit
                      </Link>
                      <DeleteSkillButton id={skill.id} name={skill.name} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
