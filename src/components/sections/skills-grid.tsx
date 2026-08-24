/**
 * Skills Grid Component
 * Flat skill badges — icon + label always visible (no hover-only reveal,
 * works identically on touch, mouse, and keyboard) — filterable by category
 * with a sliding-pill filter bar
 */

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, KeyRound, PawPrint, TestTube, Webhook } from 'lucide-react';
import { useState } from 'react';
import type { IconType } from 'react-icons';
import { BsOpenai } from 'react-icons/bs';
import {
  SiBiome,
  SiBootstrap,
  SiClaude,
  SiCloudflare,
  SiCss,
  SiDrizzle,
  SiEslint,
  SiExpress,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiGoogle,
  SiHono,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiJupyter,
  SiKeras,
  SiMariadb,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPython,
  SiPytorch,
  SiRadixui,
  SiReact,
  SiReactquery,
  SiReactrouter,
  SiResend,
  SiScikitlearn,
  SiShadcnui,
  SiStreamlit,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVuedotjs,
  SiZod,
} from 'react-icons/si';

interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

const skillCategories: { label: string; skills: Skill[] }[] = [
  {
    label: 'Languages',
    skills: [
      { name: 'TypeScript', icon: SiTypescript, color: '#3E80CA' },
      { name: 'JavaScript', icon: SiJavascript, color: '#CA8A04' },
      { name: 'Python', icon: SiPython, color: '#4982B3' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss, color: '#3183BF' },
    ],
  },
  {
    label: 'Front-End',
    skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#A3A3A3' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Radix UI', icon: SiRadixui, color: '#A3A3A3' },
      { name: 'shadcn/ui', icon: SiShadcnui, color: '#A3A3A3' },
      { name: 'Framer Motion', icon: SiFramer, color: '#2F74FF' },
      { name: 'Zustand', icon: PawPrint, color: '#A3A3A3' },
      { name: 'TanStack Query', icon: SiReactquery, color: '#FF4154' },
      { name: 'Recharts', icon: BarChart3, color: '#A3A3A3' },
      { name: 'Vite', icon: SiVite, color: '#646CFF' },
      { name: 'React Router', icon: SiReactrouter, color: '#CF5558' },
      { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
      { name: 'Bootstrap', icon: SiBootstrap, color: '#8E6DBF' },
    ],
  },
  {
    label: 'Back-End',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express', icon: SiExpress, color: '#A3A3A3' },
      { name: 'Hono', icon: SiHono, color: '#E36002' },
      { name: 'Prisma', icon: SiPrisma, color: '#A3A3A3' },
      { name: 'Drizzle ORM', icon: SiDrizzle, color: '#65A30D' },
      { name: 'Auth.js', icon: KeyRound, color: '#A3A3A3' },
      { name: 'Zod', icon: SiZod, color: '#5A7DBC' },
      { name: 'Google Identity', icon: SiGoogle, color: '#4285F4' },
      { name: 'aws4fetch', icon: Webhook, color: '#A3A3A3' },
      { name: 'Resend', icon: SiResend, color: '#A3A3A3' },
    ],
  },
  {
    label: 'Databases & Infra',
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#5377E4' },
      { name: 'MySQL', icon: SiMysql, color: '#5283A8' },
      { name: 'MariaDB', icon: SiMariadb, color: '#4FA8C7' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Supabase', icon: SiSupabase, color: '#3FCF8E' },
      { name: 'Vercel', icon: SiVercel, color: '#A3A3A3' },
      { name: 'Cloudflare R2', icon: SiCloudflare, color: '#F38020' },
    ],
  },
  {
    label: 'Machine Learning',
    skills: [
      { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
      { name: 'Keras', icon: SiKeras, color: '#DD4545' },
      { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
      { name: 'scikit-learn', icon: SiScikitlearn, color: '#F7931E' },
      { name: 'pandas', icon: SiPandas, color: '#8B7FD6' },
      { name: 'NumPy', icon: SiNumpy, color: '#4DABCF' },
      { name: 'Streamlit', icon: SiStreamlit, color: '#FF4B4B' },
      { name: 'Jupyter', icon: SiJupyter, color: '#F37626' },
    ],
  },
  {
    label: 'Testing & Tooling',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#A3A3A3' },
      { name: 'Jest', icon: SiJest, color: '#D2505D' },
      { name: 'Playwright', icon: TestTube, color: '#A3A3A3' },
      { name: 'ESLint', icon: SiEslint, color: '#7F6DD4' },
      { name: 'Biome', icon: SiBiome, color: '#60A5FA' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
      { name: 'Claude Code', icon: SiClaude, color: '#D97757' },
      { name: 'Codex', icon: BsOpenai, color: '#A3A3A3' },
    ],
  },
];

const filters = ['All', ...skillCategories.map((c) => c.label)];

export function SkillsGrid() {
  const [activeFilter, setActiveFilter] = useState('All');

  const visibleSkills = (
    activeFilter === 'All'
      ? skillCategories
      : skillCategories.filter((c) => c.label === activeFilter)
  ).flatMap((c) => c.skills);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-1.5">
        {filters.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
                isActive
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-[#888] hover:text-gray-700 dark:hover:text-white'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="skill-filter-pill"
                  className="absolute inset-0 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{filter}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="flex flex-wrap gap-2"
        >
          {visibleSkills.map((skill) => {
            const Icon = skill.icon;
            return (
              <span
                key={skill.name}
                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium cursor-default transition-all duration-200 ease-out hover:scale-[1.06] hover:-translate-y-0.5 hover:brightness-125"
                style={{
                  color: skill.color,
                  borderColor: `${skill.color}33`,
                  backgroundColor: `${skill.color}14`,
                }}
              >
                <Icon size={14} className="shrink-0" aria-hidden="true" />
                {skill.name}
              </span>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
