/**
 * New Skill
 */

import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { createSkill } from '@/lib/actions/admin-skills';
import type { Locale } from '@/lib/i18n/config';
import { prisma } from '@/lib/prisma/client';
import { SkillForm } from '../skill-form';

export const metadata: Metadata = {
  title: 'New Skill',
  robots: { index: false, follow: false },
};

export default async function NewSkillPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const categories = await prisma.skill.findMany({
    select: { category: true },
    distinct: ['category'],
    orderBy: { category: 'asc' },
  });
  const existingCategories = categories.map((c) => c.category);

  return (
    <div>
      <Link
        href={`/${locale}/admin/skills`}
        className="inline-flex items-center gap-2 text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white transition-colors mb-6 text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Skills
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">New Skill</h1>
      <SkillForm
        action={createSkill}
        submitLabel="Create Skill"
        existingCategories={existingCategories}
      />
    </div>
  );
}
