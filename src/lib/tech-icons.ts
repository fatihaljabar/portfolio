/**
 * Tech Stack Icons
 * Shared icon + brand color per technology name, used by the project card
 * grid and the project detail page so both render the same real logos
 * instead of letter badges.
 */

import { CreditCard, PawPrint, ScanText, TestTube } from 'lucide-react';
import type { IconType } from 'react-icons';
import {
  SiCloudflare,
  SiFramer,
  SiHono,
  SiJupyter,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPrisma,
  SiPython,
  SiPytorch,
  SiReact,
  SiReactrouter,
  SiResend,
  SiScikitlearn,
  SiStreamlit,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiVite,
  SiVuedotjs,
} from 'react-icons/si';

export const techIcons: Record<string, { icon: IconType; color: string }> = {
  'Vue.js': { icon: SiVuedotjs, color: '#4FC08D' },
  TypeScript: { icon: SiTypescript, color: '#3E80CA' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  Hono: { icon: SiHono, color: '#E36002' },
  MySQL: { icon: SiMysql, color: '#5283A8' },
  React: { icon: SiReact, color: '#61DAFB' },
  Vite: { icon: SiVite, color: '#646CFF' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Next.js': { icon: SiNextdotjs, color: '#A3A3A3' },
  Python: { icon: SiPython, color: '#4982B3' },
  TensorFlow: { icon: SiTensorflow, color: '#FF6F00' },
  PyTorch: { icon: SiPytorch, color: '#EE4C2C' },
  'scikit-learn': { icon: SiScikitlearn, color: '#F7931E' },
  pandas: { icon: SiPandas, color: '#8B7FD6' },
  NumPy: { icon: SiNumpy, color: '#4DABCF' },
  Jupyter: { icon: SiJupyter, color: '#F37626' },
  Streamlit: { icon: SiStreamlit, color: '#FF4B4B' },
  Prisma: { icon: SiPrisma, color: '#A3A3A3' },
  Supabase: { icon: SiSupabase, color: '#3FCF8E' },
  'Framer Motion': { icon: SiFramer, color: '#2F74FF' },
  Zustand: { icon: PawPrint, color: '#A3A3A3' },
  Midtrans: { icon: CreditCard, color: '#00AAE4' },
  'Cloudflare R2': { icon: SiCloudflare, color: '#F38020' },
  Resend: { icon: SiResend, color: '#A3A3A3' },
  // No official logo exists for these — representative icons instead.
  Playwright: { icon: TestTube, color: '#A3A3A3' },
  'Tesseract.js': { icon: ScanText, color: '#A3A3A3' },
  'React Router': { icon: SiReactrouter, color: '#CF5558' },
};
