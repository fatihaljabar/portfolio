/**
 * Admin Achievement Actions
 * Create/update/delete for the admin Achievements CRUD
 */

'use server';

import { AchievementType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { getLocale } from 'next-intl/server';
import { z } from 'zod';
import { deleteStorageImage } from '@/lib/actions/upload';
import { getAdminUser } from '@/lib/auth/server';
import { redirect } from '@/lib/i18n/navigation';
import { prisma } from '@/lib/prisma/client';

const urlField = z.string().url('Must be a valid URL').optional().or(z.literal(''));

const achievementSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().optional(),
  issuer: z.string().min(2, 'Issuer must be at least 2 characters'),
  certificateNumber: z.string().optional(),
  credentialUrl: urlField,
  imageUrl: urlField,
  issuedDate: z.string().min(1, 'Issued date is required'),
  type: z.enum(AchievementType),
  category: z.string().optional(),
  isPublished: z.boolean(),
});

export type AchievementInput = z.infer<typeof achievementSchema>;

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function generateUniqueSlug(title: string) {
  const base = slugify(title);
  let slug = base;
  let counter = 2;

  while (await prisma.achievement.findUnique({ where: { slug }, select: { id: true } })) {
    slug = `${base}-${counter}`;
    counter += 1;
  }

  return slug;
}

function revalidateAchievementPaths() {
  revalidatePath('/[locale]/achievements', 'page');
  revalidatePath('/[locale]/admin/achievements', 'page');
}

export async function createAchievement(data: AchievementInput) {
  const user = await getAdminUser();
  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = achievementSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' };
  }

  const slug = await generateUniqueSlug(parsed.data.title);

  await prisma.achievement.create({
    data: {
      ...parsed.data,
      slug,
      issuedDate: new Date(parsed.data.issuedDate),
      credentialUrl: parsed.data.credentialUrl || null,
      imageUrl: parsed.data.imageUrl || null,
    },
  });

  revalidateAchievementPaths();
  const locale = await getLocale();
  redirect({ href: '/admin/achievements', locale });
}

export async function updateAchievement(id: string, data: AchievementInput) {
  const user = await getAdminUser();
  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = achievementSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' };
  }

  const existing = await prisma.achievement.findUnique({
    where: { id },
    select: { imageUrl: true },
  });
  const newImageUrl = parsed.data.imageUrl || null;

  await prisma.achievement.update({
    where: { id },
    data: {
      ...parsed.data,
      issuedDate: new Date(parsed.data.issuedDate),
      credentialUrl: parsed.data.credentialUrl || null,
      imageUrl: newImageUrl,
    },
  });

  if (existing?.imageUrl && existing.imageUrl !== newImageUrl) {
    await deleteStorageImage(existing.imageUrl);
  }

  revalidateAchievementPaths();
  const locale = await getLocale();
  redirect({ href: '/admin/achievements', locale });
}

export async function deleteAchievement(id: string) {
  const user = await getAdminUser();
  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  const achievement = await prisma.achievement.findUnique({
    where: { id },
    select: { imageUrl: true },
  });
  await prisma.achievement.delete({ where: { id } });

  if (achievement?.imageUrl) {
    await deleteStorageImage(achievement.imageUrl);
  }

  revalidateAchievementPaths();
  return { success: true };
}
