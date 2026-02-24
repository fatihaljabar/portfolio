/**
 * About Page
 * Profile, Career, and Education sections
 */

'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import {
  Briefcase,
  GraduationCap,
  CheckCircle,
  List,
  Lightbulb,
  Rocket,
  Trophy,
  TrendingUp,
  Users,
  Check,
  Calendar,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const iconHoverProps = {
  whileHover: { scale: 1.15, rotate: [0, -5, 5, -5, 0] },
  transition: { duration: 0.4, ease: 'easeInOut' as const },
};

export default function AboutPage() {
  const t = useTranslations('about');
  const [isCareerExpanded, setIsCareerExpanded] = useState(false);

  const toggleCareerDetails = () => {
    setIsCareerExpanded((prev) => !prev);
  };

  return (
    <>
      {/* About Section */}
      <section id="about" className="mb-20">
        <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">{t('title')}</h2>
        <div className="text-[11px] font-bold text-gray-500 dark:text-[#555] tracking-widest mb-4 uppercase">
          {t('subtitle')}
        </div>

        <div className="h-[1px] border-t border-dashed border-gray-300 dark:border-[#333] w-full mb-8"></div>

        <div
          className="space-y-6 text-gray-600 dark:text-[#999] leading-loose text-lg"
          dangerouslySetInnerHTML={{
            __html: t.raw('content').replace('{location}', `<strong>${t('location')}</strong>`),
          }}
        />

        <div className="mt-12">
          <div className="text-gray-500 dark:text-[#888] text-sm mb-2">{t('best_regards')}</div>
          <div className="font-signature text-5xl text-accent-yellow">Fatih</div>
        </div>
      </section>

      <div className="h-[1px] bg-gray-300 dark:bg-white/20 mb-20"></div>

      {/* Career Section */}
      <section id="career" className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <motion.div {...iconHoverProps}>
            <Briefcase className="text-2xl text-gray-700 dark:text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('career.title')}</h3>
        </div>
        <div className="text-[11px] font-bold text-gray-500 dark:text-[#555] tracking-widest mb-6 uppercase">
          {t('career.subtitle')}
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#121212] p-6 transition-all hover:border-gray-300 dark:hover:border-white/10">
          <div className="flex flex-col md:flex-row gap-5 items-start">
            <div className="w-14 h-14 min-w-[56px] rounded-xl bg-gray-200 dark:bg-[#1a1a1a] overflow-hidden flex items-center justify-center border border-gray-300 dark:border-white/10">
              <Image src="/img/dicodinglogo.jpeg" alt="Dicoding" width={56} height={56} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 w-full">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{t('career.position')}</h4>
              <div className="text-gray-500 dark:text-[#888] font-medium text-sm mb-4">{t('career.company')}</div>

              <div className="flex flex-wrap items-center gap-3 mb-6 text-xs text-gray-500 dark:text-[#888] font-medium">
                <div className="flex items-center gap-1.5 bg-gray-200 dark:bg-white/5 px-2.5 py-1 rounded-md border border-gray-300 dark:border-white/10">
                  <motion.div {...iconHoverProps}>
                    <Calendar className="text-accent-blue" size={12} />
                  </motion.div>
                  <span>{t('career.duration')}</span>
                </div>

                <span className="text-gray-400 dark:text-[#555]">•</span>
                <span className="text-gray-600 dark:text-[#999]">{t('career.length')}</span>

                <span className="text-gray-400 dark:text-[#555]">•</span>
                <div className="flex items-center gap-1.5">
                  <motion.div {...iconHoverProps}>
                    <Briefcase className="text-gray-400 dark:text-[#666]" size={14} />
                  </motion.div>
                  <span>{t('career.employment_type')}</span>
                </div>

                <span className="text-gray-400 dark:text-[#555]">•</span>
                <div className="flex items-center gap-1.5">
                  <motion.div {...iconHoverProps}>
                    <MapPin className="text-gray-400 dark:text-[#666]" size={14} />
                  </motion.div>
                  <span>{t('career.location')}</span>
                </div>
              </div>

              <button
                onClick={toggleCareerDetails}
                className="flex items-center gap-2 text-sm text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer select-none group"
              >
                <motion.div
                  {...iconHoverProps}
                  className={`transition-transform duration-300 ${isCareerExpanded ? 'rotate-180' : ''}`}
                >
                  <List className={`group-hover:text-accent-yellow`} size={16} />
                </motion.div>
                <span>{isCareerExpanded ? t('career.hide_details') : t('career.show_details')}</span>
              </button>

              <div className={`mt-6 space-y-8 border-t border-gray-200 dark:border-white/5 pt-6 animate-fade-in ${isCareerExpanded ? '' : 'hidden'}`}>
                <div>
                  <div className="flex items-center gap-2 text-accent-yellow text-xs font-bold tracking-widest uppercase mb-4">
                    <motion.div {...iconHoverProps}>
                      <List size={16} />
                    </motion.div>
                    {t('career.responsibilities.title')}
                  </div>
                  <ul className="space-y-3 text-gray-600 dark:text-[#999] text-sm leading-relaxed">
                    <li className="flex items-start gap-3">
                      <motion.div {...iconHoverProps}>
                        <CheckCircle className="text-accent-blue mt-0.5 shrink-0" size={16} />
                      </motion.div>
                      <span dangerouslySetInnerHTML={{ __html: t.raw('career.responsibilities.item_1').replace('{project}', '<strong>S-TIX</strong>') }} />
                    </li>
                    <li className="flex items-start gap-3">
                      <motion.div {...iconHoverProps}>
                        <CheckCircle className="text-accent-blue mt-0.5 shrink-0" size={16} />
                      </motion.div>
                      <span dangerouslySetInnerHTML={{ __html: t.raw('career.responsibilities.item_2').replace('{tech1}', '<strong>React.js</strong>').replace('{tech2}', '<strong>Tailwind CSS</strong>') }} />
                    </li>
                    <li className="flex items-start gap-3">
                      <motion.div {...iconHoverProps}>
                        <CheckCircle className="text-accent-blue mt-0.5 shrink-0" size={16} />
                      </motion.div>
                      <span dangerouslySetInnerHTML={{ __html: t.raw('career.responsibilities.item_3').replace('{tech}', '<strong>Node.js, Express.js, and MongoDB</strong>') }} />
                    </li>
                    <li className="flex items-start gap-3">
                      <motion.div {...iconHoverProps}>
                        <CheckCircle className="text-accent-blue mt-0.5 shrink-0" size={16} />
                      </motion.div>
                      <span>{t('career.responsibilities.item_4')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <motion.div {...iconHoverProps}>
                        <CheckCircle className="text-accent-blue mt-0.5 shrink-0" size={16} />
                      </motion.div>
                      <span>{t('career.responsibilities.item_5')}</span>
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div>
                    <div className="flex items-center gap-2 text-accent-yellow text-xs font-bold tracking-widest uppercase mb-4">
                      <motion.div {...iconHoverProps}>
                        <Lightbulb size={16} />
                      </motion.div>
                      {t('career.learned.title')}
                    </div>
                    <ul className="space-y-3 text-gray-600 dark:text-[#999] text-sm leading-relaxed">
                      <li className="flex items-start gap-3">
                        <motion.div {...iconHoverProps}>
                          <Check className="text-green-500 mt-0.5 shrink-0" size={14} />
                        </motion.div>
                        <span>{t('career.learned.item_1')}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <motion.div {...iconHoverProps}>
                          <Check className="text-green-500 mt-0.5 shrink-0" size={14} />
                        </motion.div>
                        <span>{t('career.learned.item_2')}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <motion.div {...iconHoverProps}>
                          <Check className="text-green-500 mt-0.5 shrink-0" size={14} />
                        </motion.div>
                        <span>{t('career.learned.item_3')}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-accent-yellow text-xs font-bold tracking-widest uppercase mb-4">
                      <motion.div {...iconHoverProps}>
                        <Rocket size={16} />
                      </motion.div>
                      {t('career.impact.title')}
                    </div>
                    <ul className="space-y-3 text-gray-600 dark:text-[#999] text-sm leading-relaxed">
                      <li className="flex items-start gap-3">
                        <motion.div {...iconHoverProps}>
                          <Trophy className="text-orange-500 mt-0.5 shrink-0" size={16} />
                        </motion.div>
                        <span dangerouslySetInnerHTML={{ __html: t.raw('career.impact.item_1').replace('{award}', '<strong>Best Capstone Project</strong>') }} />
                      </li>
                      <li className="flex items-start gap-3">
                        <motion.div {...iconHoverProps}>
                          <TrendingUp className="text-blue-500 mt-0.5 shrink-0" size={16} />
                        </motion.div>
                        <span dangerouslySetInnerHTML={{ __html: t.raw('career.impact.item_2').replace('{link}', '<a href="https://s-ticket.online/" target="_blank" class="text-gray-900 dark:text-white hover:underline decoration-accent-yellow underline-offset-4">s-ticket.online</a>') }} />
                      </li>
                      <li className="flex items-start gap-3">
                        <motion.div {...iconHoverProps}>
                          <Users className="text-purple-500 mt-0.5 shrink-0" size={16} />
                        </motion.div>
                        <span>{t('career.impact.item_3')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-[1px] bg-gray-300 dark:bg-white/20 mb-20"></div>

      {/* Education Section */}
      <section id="education" className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <motion.div {...iconHoverProps}>
            <GraduationCap className="text-2xl text-gray-700 dark:text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('education.title')}</h3>
        </div>
        <div className="text-[11px] font-bold text-gray-500 dark:text-[#555] tracking-widest mb-6 uppercase">
          {t('education.subtitle')}
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#121212] p-6 transition-all hover:border-gray-300 dark:hover:border-white/10">
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <div className="w-14 h-14 min-w-[56px] rounded-xl bg-gray-200 dark:bg-[#1a1a1a] overflow-hidden flex items-center justify-center border border-gray-300 dark:border-white/10">
              <Image src="/img/univ.jpeg" alt="Untag Surabaya" width={56} height={56} className="w-full h-full object-cover" />
            </div>

            <div className="w-full">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">{t('education.university')}</h4>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600 dark:text-[#999] text-sm mt-1">
                <span>{t('education.degree')}</span>
                <span className="hidden sm:inline text-gray-400 dark:text-[#444]">&bull;</span>
                <span className="text-gray-500 dark:text-[#ddd]">{t('education.gpa')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-[#666] mt-3 font-mono">
                <span>{t('education.period')}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-[#444]"></span>
                <span>{t('education.location')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
