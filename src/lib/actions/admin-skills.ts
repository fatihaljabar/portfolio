/**
 * Admin Skill Actions
 * Create/update/delete for the admin Skills CRUD (Home page Skills section)
 */

'use server';

import { revalidatePath } from 'next/cache';
import { getLocale } from 'next-intl/server';
import { z } from 'zod';
import { getAdminUser } from '@/lib/auth/server';
import { redirect } from '@/lib/i18n/navigation';
import { prisma } from '@/lib/prisma/client';

const skillSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Color must be a hex value like #61DAFB'),
});

export type SkillInput = z.infer<typeof skillSchema>;

function revalidateSkillPaths() {
  revalidatePath('/[locale]', 'page');
  revalidatePath('/[locale]/admin/skills', 'page');
}

export async function createSkill(data: SkillInput) {
  const user = await getAdminUser();
  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = skillSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' };
  }

  await prisma.skill.create({ data: parsed.data });

  revalidateSkillPaths();
  const locale = await getLocale();
  redirect({ href: `/admin/skills?toast=${encodeURIComponent('Skill created')}`, locale });
}

export async function updateSkill(id: string, data: SkillInput) {
  const user = await getAdminUser();
  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = skillSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' };
  }

  await prisma.skill.update({ where: { id }, data: parsed.data });

  revalidateSkillPaths();
  const locale = await getLocale();
  redirect({ href: `/admin/skills?toast=${encodeURIComponent('Skill updated')}`, locale });
}

export async function deleteSkill(id: string) {
  const user = await getAdminUser();
  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  await prisma.skill.delete({ where: { id } });

  revalidateSkillPaths();
  return { success: true };
}
