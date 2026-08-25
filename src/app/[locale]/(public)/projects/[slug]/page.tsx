/**
 * Project Detail Page
 * Detailed view of a single project
 */

import { ArrowLeft, Box, ExternalLink, Github } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Locale } from '@/lib/i18n/config';
import { Link } from '@/lib/i18n/navigation';
import { prisma } from '@/lib/prisma/client';
import { buildMetadata } from '@/lib/seo/metadata';
import { techIcons } from '@/lib/tech-icons';
import { ScrollToTopButton } from './scroll-to-top-button';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = await prisma.project.findUnique({
    where: { slug },
    select: { title: true, description: true },
  });

  if (!project) {
    return buildMetadata({
      locale,
      path: `/projects/${slug}`,
      title: 'Project',
      description: '',
    });
  }

  return buildMetadata({
    locale,
    path: `/projects/${slug}`,
    title: project.title,
    description: project.description,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('project_detail');

  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    notFound();
  }

  return (
    <>
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white transition-colors mb-8 group font-medium text-sm"
      >
        <ArrowLeft
          className="text-lg group-hover:-translate-x-1 transition-transform duration-300"
          size={16}
        />
        {t('back')}
      </Link>

      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
        {project.title}
      </h2>

      <p className="text-gray-600 dark:text-[#888] leading-loose text-lg mb-10 max-w-4xl">
        {project.description}
      </p>

      <div className="border-t border-dashed border-gray-300 dark:border-[#333] w-full py-6 mb-8 flex flex-wrap items-center gap-3">
        <span className="text-gray-900 dark:text-white font-bold text-sm">{t('tech_stack')} :</span>
        {project.techStack?.map((tech) => {
          const TechIcon = techIcons[tech]?.icon;
          const color = techIcons[tech]?.color ?? '#A3A3A3';
          return (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium"
              style={{ color, borderColor: `${color}33`, backgroundColor: `${color}14` }}
            >
              {TechIcon ? (
                <TechIcon size={14} className="shrink-0" aria-hidden="true" />
              ) : (
                <Box size={14} className="shrink-0" aria-hidden="true" />
              )}
              {tech}
            </span>
          );
        })}
      </div>

      {/* Action Links */}
      {(project.githubUrl || project.demoUrl) && (
        <div className="flex gap-4 mb-8">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-300 dark:border-white/10 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-300 dark:hover:bg-white dark:hover:text-black transition-all"
            >
              <Github size={16} /> GitHub
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent-yellow text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400 transition-all"
            >
              <ExternalLink size={16} /> {t('live_demo')}
            </a>
          )}
        </div>
      )}

      {project.imageUrl ? (
        <div className="w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 bg-gray-100 dark:bg-[#0d2d2a] relative group shadow-2xl">
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </div>
      ) : (
        <div className="w-full rounded-2xl border border-dashed border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-[#0a0a0a] flex items-center justify-center aspect-video">
          <Box className="text-gray-300 dark:text-[#333]" size={64} />
        </div>
      )}

      {/* Full Content */}
      {project.content && (
        <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-accent-blue prose-code:before:content-none prose-code:after:content-none prose-code:bg-gray-100 dark:prose-code:bg-white/5 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-pre:bg-gray-100 dark:prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-white/5 prose-img:rounded-xl prose-img:border prose-img:border-gray-200 dark:prose-img:border-white/5">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
        </div>
      )}

      <ScrollToTopButton />
    </>
  );
}
