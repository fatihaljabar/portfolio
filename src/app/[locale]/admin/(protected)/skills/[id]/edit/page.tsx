/**
 * Edit Skill
 */

import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { updateSkill } from '@/lib/actions/admin-skills';
import type { Locale } from '@/lib/i18n/config';
import { prisma } from '@/lib/prisma/client';
import { getTechIcon } from '@/lib/tech-icon';
import { SkillForm } from '../../skill-form';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Edit Skill',
  robots: { index: false, follow: false },
};

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  const skill = await prisma.skill.findUnique({ where: { id } });

  if (!skill) {
    notFound();
  }

  const boundUpdateSkill = updateSkill.bind(null, skill.id);

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
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">Edit Skill</h1>
      <SkillForm
        action={boundUpdateSkill}
        submitLabel="Save Changes"
        existingCategories={existingCategories}
        initialIcon={getTechIcon(skill.name)}
        defaultValues={{
          name: skill.name,
          category: skill.category,
          color: skill.color,
        }}
      />
    </div>
  );
}
