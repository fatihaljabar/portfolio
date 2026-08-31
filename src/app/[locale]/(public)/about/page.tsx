/**
 * About Page
 * Server wrapper — fetches Career/Education from the DB, resolves the
 * locale-specific fields, carries metadata, renders the interactive UI
 */

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { JsonLd } from '@/components/components/json-ld';
import { formatDateRange, formatDuration } from '@/lib/format-date-range';
import type { Locale } from '@/lib/i18n/config';
import { prisma } from '@/lib/prisma/client';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildProfilePageSchema } from '@/lib/seo/structured-data';
import { getSiteProfile } from '@/lib/site-profile';
import { AboutClient, type CareerView, type EducationView } from './about-client';

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

  const [careerEntries, educationEntries, profile, tHome] = await Promise.all([
    prisma.career.findMany({ where: { isPublished: true }, orderBy: { startDate: 'desc' } }),
    prisma.education.findMany({ where: { isPublished: true }, orderBy: { startDate: 'desc' } }),
    getSiteProfile(),
    getTranslations('home'),
  ]);
  const aboutContent = (locale === 'id' ? profile?.aboutContentId : profile?.aboutContentEn) ?? '';
  const bestRegards = (locale === 'id' ? profile?.bestRegardsId : profile?.bestRegardsEn) ?? '';

  const career: CareerView[] = careerEntries.map((entry) => ({
    id: entry.id,
    position: locale === 'id' ? entry.positionId : entry.positionEn,
    company: entry.company,
    companyLogoUrl: entry.companyLogoUrl,
    employmentType: locale === 'id' ? entry.employmentTypeId : entry.employmentTypeEn,
    location: entry.location,
    dateRange: formatDateRange(entry.startDate, entry.endDate, locale),
    duration: formatDuration(entry.startDate, entry.endDate, locale),
    responsibilities: locale === 'id' ? entry.responsibilitiesId : entry.responsibilitiesEn,
    learned: locale === 'id' ? entry.learnedId : entry.learnedEn,
    impact: locale === 'id' ? entry.impactId : entry.impactEn,
  }));

  const education: EducationView[] = educationEntries.map((entry) => {
    const hasThesis = Boolean(
      locale === 'id' ? entry.thesisProjectTitleId : entry.thesisProjectTitleEn,
    );
    return {
      id: entry.id,
      university: entry.university,
      degree: locale === 'id' ? entry.degreeId : entry.degreeEn,
      gpa: (locale === 'id' ? entry.gpaId : entry.gpaEn) ?? null,
      location: entry.location,
      logoUrl: entry.logoUrl,
      dateRange: formatDateRange(entry.startDate, entry.endDate, locale),
      thesis: hasThesis
        ? {
            label: (locale === 'id' ? entry.thesisLabelId : entry.thesisLabelEn) ?? '',
            projectTitle:
              (locale === 'id' ? entry.thesisProjectTitleId : entry.thesisProjectTitleEn) ?? '',
            details: (locale === 'id' ? entry.thesisDetailsId : entry.thesisDetailsEn) ?? '',
            projectSlug: entry.thesisProjectSlug,
            journalUrl: entry.thesisJournalUrl,
            journalLabel:
              (locale === 'id' ? entry.thesisJournalLabelId : entry.thesisJournalLabelEn) ?? null,
          }
        : null,
    };
  });

  const profilePageSchema = buildProfilePageSchema({
    locale,
    jobTitle: tHome('tagline'),
    photoUrl: profile?.photoUrl ?? null,
    universities: educationEntries.map((entry) => entry.university),
  });

  return (
    <>
      <JsonLd data={profilePageSchema} />
      <AboutClient
        career={career}
        education={education}
        aboutContent={aboutContent}
        bestRegards={bestRegards}
      />
    </>
  );
}
