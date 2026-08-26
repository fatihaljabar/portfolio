/**
 * Admin Site Profile Action
 * Update for the singleton profile record behind Home's intro and About's
 * intro (photo, greeting, based-in, intro paragraph, about paragraph,
 * sign-off) — no create/delete, there is always exactly one row.
 */

'use server';

import { revalidatePath } from 'next/cache';
import { getLocale } from 'next-intl/server';
import { z } from 'zod';
import { getAdminUser } from '@/lib/auth/server';
import { redirect } from '@/lib/i18n/navigation';
import { prisma } from '@/lib/prisma/client';

const urlField = z.string().url('Must be a valid URL').optional().or(z.literal(''));

const profileSchema = z.object({
  photoUrl: urlField,
  greetingEn: z.string().min(1, 'English greeting is required'),
  greetingId: z.string().min(1, 'Indonesian greeting is required'),
  basedInEn: z.string().min(1, 'English "based in" text is required'),
  basedInId: z.string().min(1, 'Indonesian "based in" text is required'),
  introEn: z.string().min(1, 'English intro is required'),
  introId: z.string().min(1, 'Indonesian intro is required'),
  aboutContentEn: z.string().min(1, 'English about content is required'),
  aboutContentId: z.string().min(1, 'Indonesian about content is required'),
  bestRegardsEn: z.string().min(1, 'English sign-off is required'),
  bestRegardsId: z.string().min(1, 'Indonesian sign-off is required'),
});

export type ProfileInput = z.infer<typeof profileSchema>;

export async function updateSiteProfile(data: ProfileInput) {
  const user = await getAdminUser();
  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = profileSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' };
  }

  await prisma.siteProfile.upsert({
    where: { id: 'singleton' },
    create: { id: 'singleton', ...parsed.data, photoUrl: parsed.data.photoUrl || null },
    update: { ...parsed.data, photoUrl: parsed.data.photoUrl || null },
  });

  revalidatePath('/[locale]', 'page');
  revalidatePath('/[locale]/about', 'page');
  revalidatePath('/[locale]/admin/profile', 'page');

  const locale = await getLocale();
  redirect({ href: `/admin/profile?toast=${encodeURIComponent('Profile updated')}`, locale });
}
