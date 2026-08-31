/**
 * Structured Data (JSON-LD) Builders
 * Plain schema.org objects, built from the same data already fetched for
 * each page. Nothing here is invented — every field traces back to a real
 * Prisma column or a link that's already rendered elsewhere on the site.
 */

import type { Locale } from '@/lib/i18n/config';

const siteUrl = (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '');
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Portfolio';

// Same accounts already linked from the sidebar and Contact page.
const SOCIAL_LINKS = [
  'https://www.instagram.com/fatihaljabar/',
  'https://www.linkedin.com/in/fatihaljabar/',
  'https://github.com/fatihaljabar',
  'https://www.tiktok.com/@fatihaljabarr',
];

export function buildPersonSchema({
  locale,
  jobTitle,
  description,
  photoUrl,
}: {
  locale: Locale;
  jobTitle: string;
  description: string;
  photoUrl: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteName,
    url: `${siteUrl}/${locale}`,
    jobTitle,
    description,
    ...(photoUrl ? { image: photoUrl } : {}),
    sameAs: SOCIAL_LINKS,
  };
}

export function buildWebSiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: `${siteUrl}/${locale}`,
  };
}

export function buildProfilePageSchema({
  locale,
  jobTitle,
  photoUrl,
  universities,
}: {
  locale: Locale;
  jobTitle: string;
  photoUrl: string | null;
  universities: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: siteName,
      url: `${siteUrl}/${locale}/about`,
      jobTitle,
      ...(photoUrl ? { image: photoUrl } : {}),
      sameAs: SOCIAL_LINKS,
      alumniOf: universities.map((name) => ({
        '@type': 'EducationalOrganization',
        name,
      })),
    },
  };
}

export function buildProjectSchema({
  locale,
  slug,
  name,
  description,
  imageUrl,
  githubUrl,
  demoUrl,
  techStack,
}: {
  locale: Locale;
  slug: string;
  name: string;
  description: string;
  imageUrl: string | null;
  githubUrl: string | null;
  demoUrl: string | null;
  techStack: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    url: `${siteUrl}/${locale}/projects/${slug}`,
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(githubUrl ? { codeRepository: githubUrl } : {}),
    ...(demoUrl ? { sameAs: demoUrl } : {}),
    keywords: techStack.join(', '),
    author: {
      '@type': 'Person',
      name: siteName,
      url: `${siteUrl}/${locale}`,
    },
  };
}

export function buildBreadcrumbSchema({
  locale,
  items,
}: {
  locale: Locale;
  items: { name: string; path: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}/${locale}${item.path}`,
    })),
  };
}
