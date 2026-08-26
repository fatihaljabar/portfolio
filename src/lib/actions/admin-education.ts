/**
 * Admin Education Actions
 * Create/update/delete for the admin Education CRUD
 */

'use server';

import { revalidatePath } from 'next/cache';
import { getLocale } from 'next-intl/server';
import { z } from 'zod';
import { deleteStorageImage } from '@/lib/actions/upload';
import { getAdminUser } from '@/lib/auth/server';
import { redirect } from '@/lib/i18n/navigation';
import { prisma } from '@/lib/prisma/client';

const urlField = z.string().url('Must be a valid URL').optional().or(z.literal(''));
const optionalText = z.string().optional().or(z.literal(''));

const educationSchema = z.object({
  university: z.string().min(2, 'University is required'),
  degreeEn: z.string().min(2, 'Degree (EN) is required'),
  degreeId: z.string().min(2, 'Degree (ID) is required'),
  gpaEn: optionalText,
  gpaId: optionalText,
  location: z.string().min(1, 'Location is required'),
  logoUrl: urlField,
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  thesisLabelEn: optionalText,
  thesisLabelId: optionalText,
  thesisProjectTitleEn: optionalText,
  thesisProjectTitleId: optionalText,
  thesisDetailsEn: optionalText,
  thesisDetailsId: optionalText,
  thesisProjectSlug: optionalText,
  thesisJournalUrl: urlField,
  thesisJournalLabelEn: optionalText,
  thesisJournalLabelId: optionalText,
  isPublished: z.boolean(),
});

export type EducationInput = z.infer<typeof educationSchema>;

function revalidateEducationPaths() {
  revalidatePath('/[locale]/about', 'page');
  revalidatePath('/[locale]/admin/education', 'page');
}

function nullifyOptional(data: EducationInput) {
  return {
    ...data,
    logoUrl: data.logoUrl || null,
    gpaEn: data.gpaEn || null,
    gpaId: data.gpaId || null,
    thesisLabelEn: data.thesisLabelEn || null,
    thesisLabelId: data.thesisLabelId || null,
    thesisProjectTitleEn: data.thesisProjectTitleEn || null,
    thesisProjectTitleId: data.thesisProjectTitleId || null,
    thesisDetailsEn: data.thesisDetailsEn || null,
    thesisDetailsId: data.thesisDetailsId || null,
    thesisProjectSlug: data.thesisProjectSlug || null,
    thesisJournalUrl: data.thesisJournalUrl || null,
    thesisJournalLabelEn: data.thesisJournalLabelEn || null,
    thesisJournalLabelId: data.thesisJournalLabelId || null,
    startDate: new Date(data.startDate),
    endDate: data.endDate ? new Date(data.endDate) : null,
  };
}

export async function createEducation(data: EducationInput) {
  const user = await getAdminUser();
  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = educationSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' };
  }

  await prisma.education.create({ data: nullifyOptional(parsed.data) });

  revalidateEducationPaths();
  const locale = await getLocale();
  redirect({
    href: `/admin/education?toast=${encodeURIComponent('Education entry created')}`,
    locale,
  });
}

export async function updateEducation(id: string, data: EducationInput) {
  const user = await getAdminUser();
  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = educationSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' };
  }

  const existing = await prisma.education.findUnique({ where: { id }, select: { logoUrl: true } });
  const nextData = nullifyOptional(parsed.data);

  await prisma.education.update({ where: { id }, data: nextData });

  if (existing?.logoUrl && existing.logoUrl !== nextData.logoUrl) {
    await deleteStorageImage(existing.logoUrl);
  }

  revalidateEducationPaths();
  const locale = await getLocale();
  redirect({
    href: `/admin/education?toast=${encodeURIComponent('Education entry updated')}`,
    locale,
  });
}

export async function deleteEducation(id: string) {
  const user = await getAdminUser();
  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  const education = await prisma.education.findUnique({ where: { id }, select: { logoUrl: true } });
  await prisma.education.delete({ where: { id } });

  if (education?.logoUrl) {
    await deleteStorageImage(education.logoUrl);
  }

  revalidateEducationPaths();
  return { success: true };
}
