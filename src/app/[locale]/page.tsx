/**
 * Home Page
 * Landing page with intro and skills sections
 */

import { useTranslations } from 'next-intl';
import { MapPin, Code } from 'lucide-react';
import { SkillsGrid } from '@/components/sections/skills-grid';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <>
      {/* Intro Section */}
      <section className="mb-20">
        <div className="text-[11px] font-bold text-[#555] tracking-widest mb-6 uppercase">
          {t('intro')}
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
          {t('greeting')}
        </h2>
        <div className="flex flex-wrap items-center gap-6 text-[#888] text-sm mb-10">
          <div className="flex items-center gap-2">
            <MapPin className="text-white" size={16} /> {t('based_in')}
          </div>
          <div className="w-1 h-1 bg-[#444] rounded-full"></div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-medium">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            {t('remote')}
          </div>
        </div>
        <p
          className="text-lg text-[#999] leading-relaxed max-w-3xl"
          dangerouslySetInnerHTML={{
            __html: t.raw('description').replace('{techStack}', `<span class="text-white font-medium">${t('tech_stack_list')}</span>`),
          }}
        />
      </section>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20"></div>

      {/* Skills Section */}
      <section id="skills" className="mb-20">
        <div className="flex items-center gap-3 mb-10">
          <Code className="text-3xl text-white" size={24} />
          <h3 className="text-xl font-bold text-white">Skills</h3>
          <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs text-[#888] font-mono">My Arsenal</span>
          </div>
        </div>

        <SkillsGrid />
      </section>
    </>
  );
}
