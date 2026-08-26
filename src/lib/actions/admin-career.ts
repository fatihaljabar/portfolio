/**
 * Admin Career Actions
 * Create/update/delete for the admin Career CRUD
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

const careerSchema = z.object({
  positionEn: z.string().min(2, 'Position (EN) is required'),
  positionId: z.string().min(2, 'Position (ID) is required'),
  company: z.string().min(2, 'Company is required'),
  companyLogoUrl: urlField,
  employmentTypeEn: z.string().min(1, 'Employment type (EN) is required'),
  employmentTypeId: z.string().min(1, 'Employment type (ID) is required'),
  location: z.string().min(1, 'Location is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  responsibilitiesEn: z.string().min(1, 'Responsibilities (EN) is required'),
  responsibilitiesId: z.string().min(1, 'Responsibilities (ID) is required'),
  learnedEn: z.string().min(1, 'What I learned (EN) is required'),
  learnedId: z.string().min(1, 'What I learned (ID) is required'),
  impactEn: z.string().min(1, 'Impact (EN) is required'),
  impactId: z.string().min(1, 'Impact (ID) is required'),
  isPublished: z.boolean(),
});

export type CareerInput = z.infer<typeof careerSchema>;

function revalidateCareerPaths() {
  revalidatePath('/[locale]/about', 'page');
  revalidatePath('/[locale]/admin/career', 'page');
}

export async function createCareer(data: CareerInput) {
  const user = await getAdminUser();
  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = careerSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' };
  }

  await prisma.career.create({
    data: {
      ...parsed.data,
      companyLogoUrl: parsed.data.companyLogoUrl || null,
      startDate: new Date(parsed.data.startDate),
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
    },
  });

  revalidateCareerPaths();
  const locale = await getLocale();
  redirect({ href: `/admin/career?toast=${encodeURIComponent('Career entry created')}`, locale });
}

export async function updateCareer(id: string, data: CareerInput) {
  const user = await getAdminUser();
  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = careerSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' };
  }

  const existing = await prisma.career.findUnique({
    where: { id },
    select: { companyLogoUrl: true },
  });
  const newLogoUrl = parsed.data.companyLogoUrl || null;

  await prisma.career.update({
    where: { id },
    data: {
      ...parsed.data,
      companyLogoUrl: newLogoUrl,
      startDate: new Date(parsed.data.startDate),
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
    },
  });

  if (existing?.companyLogoUrl && existing.companyLogoUrl !== newLogoUrl) {
    await deleteStorageImage(existing.companyLogoUrl);
  }

  revalidateCareerPaths();
  const locale = await getLocale();
  redirect({ href: `/admin/career?toast=${encodeURIComponent('Career entry updated')}`, locale });
}

export async function deleteCareer(id: string) {
  const user = await getAdminUser();
  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  const career = await prisma.career.findUnique({
    where: { id },
    select: { companyLogoUrl: true },
  });
  await prisma.career.delete({ where: { id } });

  if (career?.companyLogoUrl) {
    await deleteStorageImage(career.companyLogoUrl);
  }

  revalidateCareerPaths();
  return { success: true };
}
