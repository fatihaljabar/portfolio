/**
 * Home Page
 * Landing page with intro and skills sections
 */

import { Code, MapPin } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { type SkillCategoryView, SkillsGrid } from '@/components/sections/skills-grid';
import type { Locale } from '@/lib/i18n/config';
import { prisma } from '@/lib/prisma/client';
import { buildMetadata } from '@/lib/seo/metadata';
import { getSiteProfile } from '@/lib/site-profile';
import { getTechIcon } from '@/lib/tech-icon';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const profile = await getSiteProfile();
  const rawIntro = (locale === 'id' ? profile?.introId : profile?.introEn) ?? '';
  const description = rawIntro.replace(/\*\*/g, '');
  return buildMetadata({ locale, path: '', title: t('tagline'), description });
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const profile = await getSiteProfile();
  const greeting = (locale === 'id' ? profile?.greetingId : profile?.greetingEn) ?? '';
  const basedIn = (locale === 'id' ? profile?.basedInId : profile?.basedInEn) ?? '';
  const intro = (locale === 'id' ? profile?.introId : profile?.introEn) ?? '';

  const skills = await prisma.skill.findMany({
    orderBy: { createdAt: 'asc' },
  });
  const skillCategories: SkillCategoryView[] = [];
  for (const skill of skills) {
    let group = skillCategories.find((c) => c.label === skill.category);
    if (!group) {
      group = { label: skill.category, skills: [] };
      skillCategories.push(group);
    }
    const icon = getTechIcon(skill.name);
    group.skills.push({
      name: skill.name,
      color: skill.color,
      icon: icon ? { ...icon, color: skill.color } : null,
    });
  }

  return (
    <>
      {/* Intro Section */}
      <section className="mb-20">
        <div className="text-[11px] font-bold text-gray-500 dark:text-[#888] tracking-widest mb-6 uppercase">
          {t('intro')}
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
          {greeting}
        </h2>
        <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-[#888] text-sm mb-10">
          <div className="flex items-center gap-2">
            <MapPin className="text-gray-700 dark:text-white" size={16} /> {basedIn}
          </div>
        </div>
        <div className="prose prose-neutral dark:prose-invert max-w-3xl prose-p:text-lg prose-p:leading-relaxed prose-p:text-gray-600 dark:prose-p:text-[#999] prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-medium">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{intro}</ReactMarkdown>
        </div>
      </section>

      <div className="h-[1px] bg-gray-300 dark:bg-white/20 mb-20"></div>

      {/* Skills Section */}
      <section id="skills">
        <div className="flex items-center gap-3 mb-10">
          <Code className="text-3xl text-gray-700 dark:text-white" size={24} />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Skills</h3>
        </div>

        <SkillsGrid categories={skillCategories} />
      </section>
    </>
  );
}
