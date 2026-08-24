/**
 * Tech Stack Icons
 * Shared icon + brand color per technology name, used by the project card
 * grid and the project detail page so both render the same real logos
 * instead of letter badges.
 */

import type { IconType } from 'react-icons';
import {
  SiHono,
  SiJupyter,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiStreamlit,
  SiTailwindcss,
  SiTensorflow,
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
  Python: { icon: SiPython, color: '#3776AB' },
  TensorFlow: { icon: SiTensorflow, color: '#FF6F00' },
  PyTorch: { icon: SiPytorch, color: '#EE4C2C' },
  'scikit-learn': { icon: SiScikitlearn, color: '#F7931E' },
  pandas: { icon: SiPandas, color: '#8B7FD6' },
  NumPy: { icon: SiNumpy, color: '#4DABCF' },
  Jupyter: { icon: SiJupyter, color: '#F37626' },
  Streamlit: { icon: SiStreamlit, color: '#FF4B4B' },
};
