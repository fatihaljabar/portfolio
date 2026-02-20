/**
 * Projects Page
 * Showcase of projects with filtering
 */

'use client';

import { useTranslations } from 'next-intl';
import { Folder, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data - will be replaced with Supabase fetch
const mockProjects = [
  {
    slug: 'fatihaljabar-my-id',
    title: 'fatihaljabar.my.id',
    description: 'Personal website & portfolio, built from scratch using Next.js, TypeScript, Tailwind CSS with a focus on performance and accessibility.',
    imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop',
    isFeatured: true,
    techStack: ['TypeScript', 'React', 'Tailwind', 'Next.js'],
    techColors: ['text-[#3178C6]', 'text-[#61DAFB]', 'text-[#06B6D4]', 'text-white'],
    hoverColor: 'hover:text-accent-yellow',
  },
  {
    slug: 'presence-system',
    title: 'Presence System',
    description: 'A custom-built attendance tracking backend developed for internal company management with high security standards.',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    isFeatured: false,
    techStack: ['Go', 'Docker'],
    techColors: ['text-[#00ADD8]', 'text-[#2496ED]'],
    hoverColor: 'hover:text-cyan-400',
  },
  {
    slug: 'berbagi-link',
    title: 'Berbagi.link',
    description: 'Mini-website platform for online businesses. Optimized for performance but lacks initial mobile responsiveness.',
    imageUrl: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=800&auto=format&fit=crop',
    isFeatured: false,
    techStack: ['Flutter', 'Dart'],
    techColors: ['text-[#02569B]', 'text-[#0175C2]'],
    hoverColor: 'hover:text-blue-400',
  },
  {
    slug: 'robust',
    title: 'Robust',
    description: 'A comprehensive fitness platform designed to help users achieve their health goals with personalized plans.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    isFeatured: false,
    techStack: ['Vue', 'Laravel'],
    techColors: ['text-[#4FC08D]', 'text-[#FF2D20]'],
    hoverColor: 'hover:text-green-400',
  },
];

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

export default function ProjectsPage() {
  const t = useTranslations('projects');

  return (
    <>
      <div className="mb-10">
        <h2 className="text-4xl font-bold mb-4 text-white">{t('title')}</h2>
        <p className="text-[#888] text-sm max-w-2xl leading-relaxed">{t('subtitle')}</p>
      </div>

      <div className="h-[1px] border-t border-dashed border-[#333] w-full mb-10"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockProjects.map((project) => (
          <div
            key={project.slug}
            className={`group relative rounded-3xl bg-[#121212] overflow-hidden ${project.isFeatured ? 'hover:shadow-[0_0_40px_-10px_rgba(255,215,0,0.1)]' : ''} transition-all duration-500`}
          >
            {project.isFeatured && (
              <div className="absolute top-5 left-5 z-30 bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                {t('featured')}
              </div>
            )}

            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/20 to-transparent z-10"></div>
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Link
                  href={`/projects/${project.slug}`}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
                >
                  {t('view_project')} <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            <div className="p-8 pt-0 relative z-20">
              <div className="flex justify-between items-end mb-3">
                <h3 className={`text-2xl font-bold text-white group-hover:${project.hoverColor} transition-colors duration-300`}>
                  {project.title}
                </h3>
                <ArrowUpRight className="text-2xl text-[#333] group-hover:text-white transition-colors duration-300" size={24} />
              </div>

              <p className="text-[#888] text-sm leading-relaxed mb-6 line-clamp-2">{project.description}</p>

              <div className="w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent mb-5"></div>

              <div className="flex items-center gap-3">
                {project.techStack.map((tech, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full bg-[#1a1a1a] border border-white/5 flex items-center justify-center ${project.techColors[index]} text-xs font-bold`}
                    title={tech}
                  >
                    {techIcons[tech] || tech.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
