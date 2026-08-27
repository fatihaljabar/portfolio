/**
 * About Client Component
 * Profile intro (static), plus Career and Education sections rendered
 * from DB-backed lists with per-entry expand/collapse
 */

'use client';

import { motion } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  ExternalLink,
  FileText,
  GraduationCap,
  List,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from '@/lib/i18n/navigation';

export interface CareerView {
  id: string;
  position: string;
  company: string;
  companyLogoUrl: string | null;
  employmentType: string;
  location: string;
  dateRange: string;
  duration: string;
  responsibilities: string;
  learned: string;
  impact: string;
}

export interface EducationView {
  id: string;
  university: string;
  degree: string;
  gpa: string | null;
  location: string;
  logoUrl: string | null;
  dateRange: string;
  thesis: {
    label: string;
    projectTitle: string;
    details: string;
    projectSlug: string | null;
    journalUrl: string | null;
    journalLabel: string | null;
  } | null;
}

interface AboutClientProps {
  career: CareerView[];
  education: EducationView[];
  aboutContent: string;
  bestRegards: string;
}

const iconHoverProps = {
  whileHover: { scale: 1.15, rotate: [0, -5, 5, -5, 0] },
  transition: { duration: 0.4, ease: 'easeInOut' as const },
};

const proseClasses =
  'prose prose-sm prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-accent-blue prose-strong:text-gray-900 dark:prose-strong:text-white';

function LogoBadge({ src, alt }: { src: string | null; alt: string }) {
  return (
    <div className="w-14 h-14 min-w-[56px] rounded-xl bg-gray-200 dark:bg-[#1a1a1a] overflow-hidden flex items-center justify-center border border-gray-300 dark:border-white/10">
      {src ? (
        <Image src={src} alt={alt} width={56} height={56} className="w-full h-full object-cover" />
      ) : (
        <span className="text-gray-400 dark:text-[#666] text-lg font-bold">{alt.charAt(0)}</span>
      )}
    </div>
  );
}

function CareerCard({ entry, t }: { entry: CareerView; t: ReturnType<typeof useTranslations> }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#121212] p-6 transition-all hover:border-gray-300 dark:hover:border-white/10">
      <div className="flex flex-col md:flex-row gap-5 items-start">
        <LogoBadge src={entry.companyLogoUrl} alt={entry.company} />

        <div className="flex-1 w-full">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{entry.position}</h4>
          <div className="text-gray-500 dark:text-[#888] font-medium text-sm mb-4">
            {entry.company}
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs text-gray-500 dark:text-[#888] font-medium">
            <div className="flex items-center gap-1.5 bg-gray-200 dark:bg-white/5 px-2.5 py-1 rounded-md border border-gray-300 dark:border-white/10">
              <motion.div {...iconHoverProps}>
                <Calendar className="text-accent-blue" size={12} />
              </motion.div>
              <span>{entry.dateRange}</span>
            </div>

            <span className="text-gray-400 dark:text-[#888]">•</span>
            <span className="text-gray-600 dark:text-[#999]">{entry.duration}</span>

            <span className="text-gray-400 dark:text-[#888]">•</span>
            <div className="flex items-center gap-1.5">
              <motion.div {...iconHoverProps}>
                <Briefcase className="text-gray-400 dark:text-[#666]" size={14} />
              </motion.div>
              <span>{entry.employmentType}</span>
            </div>

            <span className="text-gray-400 dark:text-[#888]">•</span>
            <div className="flex items-center gap-1.5">
              <motion.div {...iconHoverProps}>
                <MapPin className="text-gray-400 dark:text-[#666]" size={14} />
              </motion.div>
              <span>{entry.location}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer select-none group"
          >
            <motion.div
              {...iconHoverProps}
              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            >
              <List className="group-hover:text-accent-yellow" size={16} />
            </motion.div>
            <span>{isExpanded ? t('career.hide_details') : t('career.show_details')}</span>
          </button>

          {isExpanded && (
            <div className="mt-6 space-y-8 border-t border-gray-200 dark:border-white/5 pt-6 animate-fade-in">
              <div>
                <div className="text-accent-yellow text-xs font-bold tracking-widest uppercase mb-4">
                  {t('career.responsibilities_title')}
                </div>
                <div className={proseClasses}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {entry.responsibilities}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <div className="text-accent-yellow text-xs font-bold tracking-widest uppercase mb-4">
                    {t('career.learned_title')}
                  </div>
                  <div className={proseClasses}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.learned}</ReactMarkdown>
                  </div>
                </div>

                <div>
                  <div className="text-accent-yellow text-xs font-bold tracking-widest uppercase mb-4">
                    {t('career.impact_title')}
                  </div>
                  <div className={proseClasses}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.impact}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EducationCard({
  entry,
  t,
}: {
  entry: EducationView;
  t: ReturnType<typeof useTranslations>;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#121212] p-6 transition-all hover:border-gray-300 dark:hover:border-white/10">
      <div className="flex flex-col md:flex-row gap-5 items-start">
        <LogoBadge src={entry.logoUrl} alt={entry.university} />

        <div className="w-full">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">{entry.university}</h4>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600 dark:text-[#999] text-sm mt-1">
            <span>{entry.degree}</span>
            {entry.gpa && (
              <>
                <span className="hidden sm:inline text-gray-400 dark:text-[#444]">&bull;</span>
                <span className="text-gray-500 dark:text-[#ddd]">{entry.gpa}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-[#666] mt-3 font-mono">
            <span>{entry.dateRange}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-[#444]"></span>
            <span>{entry.location}</span>
          </div>

          {entry.thesis && (
            <>
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="flex items-center gap-2 text-sm text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer select-none group mt-6"
              >
                <motion.div
                  {...iconHoverProps}
                  className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                >
                  <List className="group-hover:text-accent-yellow" size={16} />
                </motion.div>
                <span>
                  {isExpanded
                    ? t('education.thesis_hide_details')
                    : t('education.thesis_show_details')}
                </span>
              </button>

              {isExpanded && (
                <div className="mt-6 space-y-4 border-t border-gray-200 dark:border-white/5 pt-6 animate-fade-in">
                  <div className="flex items-center gap-2 text-accent-yellow text-xs font-bold tracking-widest uppercase mb-1">
                    <motion.div {...iconHoverProps}>
                      <FileText size={16} />
                    </motion.div>
                    {entry.thesis.label}
                  </div>
                  <div className="text-gray-900 dark:text-white font-semibold text-sm italic">
                    {entry.thesis.projectTitle}
                  </div>
                  <div className={proseClasses}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {entry.thesis.details}
                    </ReactMarkdown>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 pt-2 text-sm">
                    {entry.thesis.projectSlug && (
                      <Link
                        href={`/projects/${entry.thesis.projectSlug}`}
                        className="inline-flex items-center gap-1.5 text-gray-900 dark:text-white hover:text-accent-yellow dark:hover:text-accent-yellow transition-colors font-medium"
                      >
                        {t('education.thesis_read_more')}
                        <ExternalLink size={14} />
                      </Link>
                    )}
                    {entry.thesis.journalUrl && (
                      <a
                        href={entry.thesis.journalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-gray-900 dark:text-white hover:text-accent-yellow dark:hover:text-accent-yellow transition-colors font-medium"
                      >
                        {entry.thesis.journalLabel}
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function AboutClient({ career, education, aboutContent, bestRegards }: AboutClientProps) {
  const t = useTranslations('about');

  return (
    <>
      {/* About Section */}
      <section id="about" className="mb-20">
        <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">{t('title')}</h2>
        <div className="text-[11px] font-bold text-gray-500 dark:text-[#888] tracking-widest mb-4 uppercase">
          {t('subtitle')}
        </div>

        <div className="h-[1px] border-t border-dashed border-gray-300 dark:border-[#333] w-full mb-8"></div>

        <div className="prose prose-neutral dark:prose-invert max-w-none prose-p:text-gray-600 dark:prose-p:text-[#999] prose-p:leading-loose prose-p:text-lg prose-strong:text-gray-900 dark:prose-strong:text-white">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{aboutContent}</ReactMarkdown>
        </div>

        <div className="mt-12">
          <div className="text-gray-500 dark:text-[#888] text-sm mb-2">{bestRegards}</div>
          <div className="font-signature text-5xl text-accent-yellow">Fatih</div>
        </div>
      </section>

      <div className="h-[1px] bg-gray-300 dark:bg-white/20 mb-20"></div>

      {/* Career Section */}
      {career.length > 0 && (
        <>
          <section id="career" className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <motion.div {...iconHoverProps}>
                <Briefcase className="text-2xl text-gray-700 dark:text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('career.title')}
              </h3>
            </div>
            <div className="text-[11px] font-bold text-gray-500 dark:text-[#888] tracking-widest mb-6 uppercase">
              {t('career.subtitle')}
            </div>

            <div className="flex flex-col gap-6">
              {career.map((entry) => (
                <CareerCard key={entry.id} entry={entry} t={t} />
              ))}
            </div>
          </section>

          <div className="h-[1px] bg-gray-300 dark:bg-white/20 mb-20"></div>
        </>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section id="education">
          <div className="flex items-center gap-3 mb-8">
            <motion.div {...iconHoverProps}>
              <GraduationCap className="text-2xl text-gray-700 dark:text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('education.title')}
            </h3>
          </div>
          <div className="text-[11px] font-bold text-gray-500 dark:text-[#888] tracking-widest mb-6 uppercase">
            {t('education.subtitle')}
          </div>

          <div className="flex flex-col gap-6">
            {education.map((entry) => (
              <EducationCard key={entry.id} entry={entry} t={t} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
