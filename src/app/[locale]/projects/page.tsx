/**
 * Projects Page
 * Showcase of projects with filtering
 */

import { getTranslations } from 'next-intl/server';
import { Folder, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/lib/i18n/navigation';
import { prisma } from '@/lib/prisma/client';
import { FramerIcon } from '@/components/components/framer-icon';

const techIcons: Record<string, string> = {
  TypeScript: 'TS',
  React: 'atom',
  Tailwind: 'wind',
  'Next.js': 'N',
  Go: 'GO',
  Docker: 'cube',
  Flutter: 'code',
  Dart: 'Dt',
  Vue: 'V',
  Laravel: 'code',
};

const techColors: Record<string, string> = {
  TypeScript: 'text-[#3178C6]',
  React: 'text-[#61DAFB]',
  Tailwind: 'text-[#06B6D4]',
  'Next.js': 'text-gray-900 dark:text-white',
  Go: 'text-[#00ADD8]',
  Docker: 'text-[#2496ED]',
  Flutter: 'text-[#02569B]',
  Dart: 'text-[#0175C2]',
  Vue: 'text-[#4FC08D]',
  Laravel: 'text-[#FF2D20]',
};

const hoverColors: Record<string, string> = {
  'Next.js': 'hover:text-accent-yellow',
  Go: 'hover:text-cyan-400',
  Flutter: 'hover:text-blue-400',
  Vue: 'hover:text-green-400',
  default: 'hover:text-gray-900 dark:hover:text-white',
};

export default async function ProjectsPage() {
  const t = await getTranslations('projects');

  // Fetch projects directly from Prisma
  const projects = await prisma.project.findMany({
    orderBy: [{ isFeatured: 'desc' }, { publishedAt: 'desc' }],
    select: {
      slug: true,
      title: true,
      description: true,
      imageUrl: true,
      isFeatured: true,
      techStack: true,
    },
  });

  return (
    <>
      <div className="mb-10">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h2>
        <p className="text-gray-500 dark:text-[#888] text-sm max-w-2xl leading-relaxed">{t('subtitle')}</p>
      </div>

      <div className="h-[1px] border-t border-dashed border-gray-300 dark:border-[#333] w-full mb-10"></div>

      {projects.length === 0 ? (
        <div className="text-center py-20">
          <FramerIcon icon={Folder} size={48} className="mx-auto text-gray-300 dark:text-[#333] mb-4" />
          <p className="text-gray-400 dark:text-[#888]">{t('no_projects')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const firstTech = project.techStack?.[0] || 'default';
            const hoverColor = hoverColors[firstTech] || hoverColors.default;

            return (
              <div
                key={project.slug}
                className={`group relative rounded-3xl bg-gray-50 dark:bg-[#121212] overflow-hidden ${project.isFeatured ? 'hover:shadow-[0_0_40px_-10px_rgba(255,215,0,0.1)]' : ''} transition-all duration-500`}
              >
                {project.isFeatured && (
                  <div className="absolute top-5 left-5 z-30 bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                    {t('featured')}
                  </div>
                )}

                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#121212] via-gray-50/80 dark:via-[#121212]/20 to-transparent z-10"></div>
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-[#1a1a1a] flex items-center justify-center">
                      <FramerIcon icon={Folder} size={48} className="text-gray-300 dark:text-[#333]" />
                    </div>
                  )}

                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="flex items-center gap-2 bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 text-gray-900 dark:text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
                    >
                      {t('view_project')} <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="p-8 pt-0 relative z-20">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1" style={{ minHeight: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <h3 className={`text-2xl font-bold text-gray-900 dark:text-white ${hoverColor} transition-colors duration-300 leading-snug line-clamp-2`}>
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-500 dark:text-[#888] text-sm leading-relaxed mb-6 line-clamp-2">{project.description}</p>

                  <div className="w-full h-[1px] bg-gradient-to-r from-gray-200 dark:from-white/10 to-transparent mb-5"></div>

                  <div className="flex items-center gap-3">
                    {project.techStack?.map((tech, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-full bg-gray-200 dark:bg-[#1a1a1a] border border-gray-300 dark:border-white/5 flex items-center justify-center ${techColors[tech] || 'text-gray-900 dark:text-white'} text-xs font-bold`}
                        title={tech}
                      >
                        {techIcons[tech] || tech.charAt(0)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
