/**
 * Admin Project Actions
 * Create/update/delete for the admin Projects CRUD
 */

'use server';

import { revalidatePath } from 'next/cache';
import { getLocale } from 'next-intl/server';
import { z } from 'zod';
import { getAdminUser } from '@/lib/auth/server';
import { redirect } from '@/lib/i18n/navigation';
import { prisma } from '@/lib/prisma/client';

const urlField = z.string().url('Must be a valid URL').optional().or(z.literal(''));

const projectSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  content: z.string().min(1, 'Content is required'),
  imageUrl: urlField,
  githubUrl: urlField,
  demoUrl: urlField,
  techStack: z.array(z.string()),
  category: z.string().optional(),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
});

export type ProjectInput = z.infer<typeof projectSchema>;

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

  while (await prisma.project.findUnique({ where: { slug }, select: { id: true } })) {
    slug = `${base}-${counter}`;
    counter += 1;
  }

  return slug;
}

function revalidateProjectPaths() {
  revalidatePath('/[locale]/projects', 'page');
  revalidatePath('/[locale]/projects/[slug]', 'page');
  revalidatePath('/[locale]/admin/projects', 'page');
  revalidatePath('/sitemap.xml');
}

export async function createProject(data: ProjectInput) {
  const user = await getAdminUser();
  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' };
  }

  const slug = await generateUniqueSlug(parsed.data.title);

  await prisma.project.create({
    data: {
      ...parsed.data,
      slug,
      imageUrl: parsed.data.imageUrl || null,
      githubUrl: parsed.data.githubUrl || null,
      demoUrl: parsed.data.demoUrl || null,
    },
  });

  revalidateProjectPaths();
  const locale = await getLocale();
  redirect({ href: '/admin/projects', locale });
}

export async function updateProject(id: string, data: ProjectInput) {
  const user = await getAdminUser();
  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' };
  }

  await prisma.project.update({
    where: { id },
    data: {
      ...parsed.data,
      imageUrl: parsed.data.imageUrl || null,
      githubUrl: parsed.data.githubUrl || null,
      demoUrl: parsed.data.demoUrl || null,
    },
  });

  revalidateProjectPaths();
  const locale = await getLocale();
  redirect({ href: '/admin/projects', locale });
}

export async function deleteProject(id: string) {
  const user = await getAdminUser();
  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  await prisma.project.delete({ where: { id } });
  revalidateProjectPaths();
  return { success: true };
}
