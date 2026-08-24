/**
 * Tech Stack Icons
 * Shared icon + brand color per technology name, used by the project card
 * grid and the project detail page so both render the same real logos
 * instead of letter badges.
 */

import { CreditCard, PawPrint } from 'lucide-react';
import type { IconType } from 'react-icons';
import {
  SiFramer,
  SiHono,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPrisma,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVuedotjs,
} from 'react-icons/si';

export const techIcons: Record<string, { icon: IconType; color: string }> = {
  'Vue.js': { icon: SiVuedotjs, color: '#4FC08D' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  Hono: { icon: SiHono, color: '#E36002' },
  MySQL: { icon: SiMysql, color: '#4479A1' },
  React: { icon: SiReact, color: '#61DAFB' },
  Vite: { icon: SiVite, color: '#646CFF' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Next.js': { icon: SiNextdotjs, color: '#A3A3A3' },
  Prisma: { icon: SiPrisma, color: '#A3A3A3' },
  Supabase: { icon: SiSupabase, color: '#3FCF8E' },
  'Framer Motion': { icon: SiFramer, color: '#0055FF' },
  Zustand: { icon: PawPrint, color: '#A3A3A3' },
  Midtrans: { icon: CreditCard, color: '#00AAE4' },
};
