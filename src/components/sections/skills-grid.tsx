/**
 * Skills Grid Component
 * Categorized skill badges — icon + label always visible (no hover-only
 * reveal, works identically on touch, mouse, and keyboard)
 */

import type { IconType } from 'react-icons';
import { Braces } from 'lucide-react';
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiCss,
  SiHtml5,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiRadixui,
  SiShadcnui,
  SiFramer,
  SiReactquery,
  SiVite,
  SiReactrouter,
  SiVuedotjs,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiHono,
  SiPrisma,
  SiDrizzle,
  SiZod,
  SiGoogle,
  SiResend,
  SiPostgresql,
  SiMysql,
  SiMariadb,
  SiMongodb,
  SiSupabase,
  SiVercel,
  SiCloudflare,
  SiTensorflow,
  SiKeras,
  SiPytorch,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiStreamlit,
  SiJupyter,
  SiGit,
  SiGithub,
  SiJest,
  SiEslint,
  SiBiome,
  SiPostman,
  SiFigma,
  SiClaude,
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
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#CA8A04' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss, color: '#1572B6' },
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
      { name: 'Framer Motion', icon: SiFramer, color: '#0055FF' },
      { name: 'Zustand', icon: Braces, color: '#A3A3A3' },
      { name: 'TanStack Query', icon: SiReactquery, color: '#FF4154' },
      { name: 'Recharts', icon: Braces, color: '#A3A3A3' },
      { name: 'Vite', icon: SiVite, color: '#646CFF' },
      { name: 'React Router', icon: SiReactrouter, color: '#CA4245' },
      { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
      { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
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
      { name: 'Auth.js', icon: Braces, color: '#A3A3A3' },
      { name: 'Zod', icon: SiZod, color: '#3E67B1' },
      { name: 'Google Identity', icon: SiGoogle, color: '#4285F4' },
      { name: 'aws4fetch', icon: Braces, color: '#A3A3A3' },
      { name: 'Resend', icon: SiResend, color: '#A3A3A3' },
    ],
  },
  {
    label: 'Databases & Infra',
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'MariaDB', icon: SiMariadb, color: '#003545' },
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
      { name: 'Keras', icon: SiKeras, color: '#D00000' },
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
      { name: 'Jest', icon: SiJest, color: '#C21325' },
      { name: 'Playwright', icon: Braces, color: '#A3A3A3' },
      { name: 'ESLint', icon: SiEslint, color: '#4B32C3' },
      { name: 'Biome', icon: SiBiome, color: '#60A5FA' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
      { name: 'Claude Code', icon: SiClaude, color: '#D97757' },
      { name: 'Codex', icon: Braces, color: '#A3A3A3' },
    ],
  },
];

export function SkillsGrid() {
  return (
    <div className="flex flex-col gap-8">
      {skillCategories.map((category) => (
        <div key={category.label}>
          <div className="text-[11px] font-bold text-gray-500 dark:text-[#555] tracking-widest mb-3 uppercase">
            {category.label}
          </div>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <span
                  key={skill.name}
                  className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium"
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
          </div>
        </div>
      ))}
    </div>
  );
}
