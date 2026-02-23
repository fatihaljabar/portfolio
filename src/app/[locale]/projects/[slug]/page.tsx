/**
 * Project Detail Page
 * Detailed view of a single project
 */

import { getTranslations } from 'next-intl/server';
import { ArrowLeft, Box, ExternalLink, Github } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma/client';

const techColors: Record<string, { color: string; bg: string; border: string }> = {
  TypeScript: { color: 'text-[#3178C6]', bg: 'bg-[#3178C6]/10', border: 'border-[#3178C6]/20' },
  React: { color: 'text-[#61DAFB]', bg: 'bg-[#61DAFB]/10', border: 'border-[#61DAFB]/20' },
  Tailwind: { color: 'text-[#06B6D4]', bg: 'bg-[#06B6D4]/10', border: 'border-[#06B6D4]/20' },
  'Next.js': { color: 'text-gray-900 dark:text-white', bg: 'bg-gray-200 dark:bg-white/10', border: 'border-gray-300 dark:border-white/20' },
  Go: { color: 'text-[#00ADD8]', bg: 'bg-[#00ADD8]/10', border: 'border-[#00ADD8]/20' },
  Docker: { color: 'text-[#2496ED]', bg: 'bg-[#2496ED]/10', border: 'border-[#2496ED]/20' },
  Flutter: { color: 'text-[#02569B]', bg: 'bg-[#02569B]/10', border: 'border-[#02569B]/20' },
  Dart: { color: 'text-[#0175C2]', bg: 'bg-[#0175C2]/10', border: 'border-[#0175C2]/20' },
  Vue: { color: 'text-[#4FC08D]', bg: 'bg-[#4FC08D]/10', border: 'border-[#4FC08D]/20' },
  Laravel: { color: 'text-[#FF2D20]', bg: 'bg-[#FF2D20]/10', border: 'border-[#FF2D20]/20' },
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = await getTranslations('project_detail');
  const { slug } = await params;

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
        <ArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-300" size={16} />
        {t('back')}
      </Link>

      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">{project.title}</h2>

      <p className="text-gray-600 dark:text-[#888] leading-loose text-lg mb-10 max-w-4xl">{project.description}</p>

      <div className="border-t border-dashed border-gray-300 dark:border-[#333] w-full py-6 mb-8 flex items-center gap-4">
        <span className="text-gray-900 dark:text-white font-bold text-sm">{t('tech_stack')} :</span>
        <div className="flex gap-3">
          {project.techStack?.map((tech, index) => {
            const style = techColors[tech] || { color: 'text-gray-900 dark:text-white', bg: 'bg-gray-200 dark:bg-white/10', border: 'border-gray-300 dark:border-white/20' };
            return (
              <div
                key={index}
                className={`w-8 h-8 rounded-full ${style.bg} flex items-center justify-center border ${style.border}`}
                title={tech}
              >
                <Box className={style.color} size={16} />
              </div>
            );
          })}
        </div>
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
        <div className="mt-12 prose prose-invert max-w-none">
          <div className="text-gray-700 dark:text-[#ccc] leading-relaxed whitespace-pre-line">{project.content}</div>
        </div>
      )}
    </>
  );
}
