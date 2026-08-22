/**
 * SEO Metadata Helper
 * Builds a consistent Metadata object (title, description, OpenGraph,
 * Twitter card, hreflang alternates) for every locale route
 */

import type { Metadata } from 'next';
import { locales, type Locale } from '@/lib/i18n/config';

const siteUrl = (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '');
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Portfolio';

interface BuildMetadataOptions {
  locale: Locale;
  /** Path after the locale segment, e.g. '/about'. Empty string for home. */
  path: string;
  title: string;
  description: string;
}

export function buildMetadata({ locale, path, title, description }: BuildMetadataOptions): Metadata {
  const fullTitle = `${title} — ${siteName}`;
  const url = `${siteUrl}/${locale}${path}`;

  const languages: Record<string, string> = { 'x-default': `${siteUrl}/en${path}` };
  for (const loc of locales) {
    languages[loc] = `${siteUrl}/${loc}${path}`;
  }

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      locale,
      type: 'website',
      images: ['/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}
