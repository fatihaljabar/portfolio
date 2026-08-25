/**
 * Home Page
 * Landing page with intro and skills sections
 */

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MapPin, Code } from 'lucide-react';
import { SkillsGrid } from '@/components/sections/skills-grid';
import { buildMetadata } from '@/lib/seo/metadata';
import type { Locale } from '@/lib/i18n/config';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const description = t('description').replace('{techStack}', t('tech_stack_list'));
  return buildMetadata({ locale, path: '', title: t('tagline'), description });
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  return (
    <>
      {/* Intro Section */}
      <section className="mb-20">
        <div className="text-[11px] font-bold text-gray-500 dark:text-[#888] tracking-widest mb-6 uppercase">
          {t('intro')}
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
          {t('greeting')}
        </h2>
        <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-[#888] text-sm mb-10">
          <div className="flex items-center gap-2">
            <MapPin className="text-gray-700 dark:text-white" size={16} /> {t('based_in')}
          </div>
        </div>
        <p
          className="text-lg text-gray-600 dark:text-[#999] leading-relaxed max-w-3xl"
          dangerouslySetInnerHTML={{
            __html: t.raw('description').replace('{techStack}', `<span class="text-gray-900 dark:text-white font-medium">${t('tech_stack_list')}</span>`),
          }}
        />
      </section>

      <div className="h-[1px] bg-gray-300 dark:bg-white/20 mb-20"></div>

      {/* Skills Section */}
      <section id="skills">
        <div className="flex items-center gap-3 mb-10">
          <Code className="text-3xl text-gray-700 dark:text-white" size={24} />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Skills</h3>
        </div>

        <SkillsGrid />
      </section>
    </>
  );
}
