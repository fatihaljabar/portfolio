/**
 * About Page
 * Server wrapper — carries metadata, renders the interactive client UI
 */

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import type { Locale } from '@/lib/i18n/config';
import { AboutClient } from './about-client';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  return buildMetadata({ locale, path: '/about', title: t('title'), description: t('subtitle') });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutClient />;
}
