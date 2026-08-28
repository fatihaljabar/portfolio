/**
 * Projects Client Component
 * Client-side rendering with Framer Motion animations
 */

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Folder } from 'lucide-react';
import { useState } from 'react';
import { ImageWithSkeleton } from '@/components/components/image-with-skeleton';
import { ScrollableFilterBar } from '@/components/components/scrollable-filter-bar';
import { ScrollableIconRow } from '@/components/components/scrollable-icon-row';
import { TechIconGlyph } from '@/components/components/tech-icon-glyph';
import { Tooltip } from '@/components/components/tooltip';
import { Link } from '@/lib/i18n/navigation';
import type { TechIconResult } from '@/lib/tech-icon-data';

const hoverColors: Record<string, string> = {
  'Vue.js': 'hover:text-[#4FC08D]',
  TypeScript: 'hover:text-[#3178C6]',
  'Tailwind CSS': 'hover:text-[#06B6D4]',
  Hono: 'hover:text-[#E36002]',
  MySQL: 'hover:text-[#4479A1]',
  React: 'hover:text-[#61DAFB]',
  Vite: 'hover:text-[#646CFF]',
  'Node.js': 'hover:text-[#339933]',
  'Next.js': 'hover:text-accent-yellow',
  default: 'hover:text-gray-900 dark:hover:text-white',
};

const iconHoverProps = {
  whileHover: { scale: 1.15, rotate: [0, -5, 5, -5, 0] },
  transition: { duration: 0.4, ease: 'easeInOut' as const },
};

interface Project {
  slug: string;
  title: string;
  description: string;
  imageUrl: string | null;
  isFeatured: boolean;
  techStack: string[] | null;
  category: string | null;
}

interface Translations {
  title: string;
  subtitle: string;
  featured: string;
  view_project: string;
  no_projects: string;
  all: string;
}

interface ProjectsClientProps {
  projects: Project[];
  translations: Translations;
  techIconMap: Record<string, TechIconResult | null>;
}

export function ProjectsClient({ projects, translations: t, techIconMap }: ProjectsClientProps) {
  const categories = [...new Set(projects.map((p) => p.category).filter((c): c is string => !!c))];
  const filters = [t.all, ...categories];
  const [activeFilter, setActiveFilter] = useState(t.all);

  const filteredProjects =
    activeFilter === t.all ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <div className="mb-10">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t.title}</h2>
        <p className="text-gray-500 dark:text-[#888] text-sm max-w-2xl leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <div className="h-[1px] border-t border-dashed border-gray-300 dark:border-[#333] w-full mb-8"></div>

      {categories.length > 0 && (
        <div className="mb-8">
          <ScrollableFilterBar
            filters={filters}
            activeFilter={activeFilter}
            onSelect={setActiveFilter}
            layoutId="project-filter-pill"
          />
        </div>
      )}

      {filteredProjects.length === 0 ? (
        <div className="text-center py-20">
          <motion.div
            {...iconHoverProps}
            className="mx-auto text-gray-300 dark:text-[#333] mb-4 w-fit"
          >
            <Folder size={48} />
          </motion.div>
          <p className="text-gray-400 dark:text-[#888]">{t.no_projects}</p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredProjects.map((project, index) => {
              const firstTech = project.techStack?.[0] || 'default';
              const hoverColor = hoverColors[firstTech] || hoverColors.default;

              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  aria-label={`${t.view_project}: ${project.title}`}
                  className={`group relative flex flex-col bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ${
                    project.isFeatured
                      ? 'hover:border-accent-yellow/30 hover:shadow-accent-yellow/5'
                      : 'hover:border-accent-blue/30 hover:shadow-accent-blue/5'
                  }`}
                >
                  {project.isFeatured && (
                    <div className="absolute top-4 left-4 z-30 bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                      {t.featured}
                    </div>
                  )}

                  <div className="relative w-full aspect-video bg-gray-200 dark:bg-[#0a0a0a] overflow-hidden">
                    {project.imageUrl ? (
                      <ImageWithSkeleton
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1299px) 50vw, 368px"
                        loading={index < 2 ? 'eager' : 'lazy'}
                        className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div {...iconHoverProps} className="text-gray-300 dark:text-[#333]">
                          <Folder size={48} />
                        </motion.div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#121212] via-transparent to-transparent opacity-80" />

                    <span
                      aria-hidden="true"
                      className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm border border-black/5 dark:border-white/10 text-gray-700 dark:text-white opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out shadow-sm"
                    >
                      <ArrowUpRight size={14} />
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div
                      className="mb-3"
                      style={{
                        minHeight: '64px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <h3
                        className={`text-xl font-bold text-gray-900 dark:text-white ${hoverColor} transition-colors duration-300 leading-snug line-clamp-2`}
                      >
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-gray-500 dark:text-[#888] text-sm leading-relaxed mb-6 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="mt-auto">
                      <ScrollableIconRow>
                        {project.techStack?.map((tech) => (
                          <Tooltip key={tech} label={tech} className="shrink-0">
                            <div className="w-8 h-8 flex items-center justify-center">
                              <TechIconGlyph
                                result={techIconMap[tech] ?? null}
                                name={tech}
                                size={20}
                              />
                            </div>
                          </Tooltip>
                        ))}
                      </ScrollableIconRow>
                    </div>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
