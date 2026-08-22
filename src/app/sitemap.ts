import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';
import { prisma } from '@/lib/prisma/client';

const siteUrl = (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '');

const staticPaths = ['', '/about', '/achievements', '/projects', '/contact'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await prisma.project.findMany({ select: { slug: true, updatedAt: true } });

  const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
    })),
  );

  const projectEntries: MetadataRoute.Sitemap = projects.flatMap((project) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}/projects/${project.slug}`,
      lastModified: project.updatedAt,
    })),
  );

  return [...staticEntries, ...projectEntries];
}
