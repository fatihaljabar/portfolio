/**
 * Tech Stack Icons
 * Shared icon + brand color per technology name, used by the project card
 * grid and the project detail page so both render the same real logos
 * instead of letter badges.
 */

import { ScanText, TestTube } from 'lucide-react';
import type { IconType } from 'react-icons';
import {
  SiCloudflare,
  SiHono,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiResend,
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
  'Cloudflare R2': { icon: SiCloudflare, color: '#F38020' },
  Resend: { icon: SiResend, color: '#A3A3A3' },
  // No official logo exists for these — representative icons instead.
  Playwright: { icon: TestTube, color: '#A3A3A3' },
  'Tesseract.js': { icon: ScanText, color: '#A3A3A3' },
};
