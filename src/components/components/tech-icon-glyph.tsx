/**
 * Tech Icon Glyph
 * Renders a resolved TechIconResult (brand SVG path or a fallback lucide
 * icon). No hooks, no browser APIs — safe in both Server and Client
 * Components. Falls back to the tech name's first letter when unresolved.
 */

import {
  BarChart3,
  CreditCard,
  KeyRound,
  PawPrint,
  ScanText,
  TestTube,
  Webhook,
} from 'lucide-react';
import { BsOpenai } from 'react-icons/bs';
import type { FallbackIconName, TechIconResult } from '@/lib/tech-icon-data';

const FALLBACK_ICONS: Record<FallbackIconName, typeof PawPrint | typeof BsOpenai> = {
  PawPrint,
  CreditCard,
  TestTube,
  ScanText,
  KeyRound,
  Webhook,
  BarChart3,
  OpenAI: BsOpenai,
};

interface TechIconGlyphProps {
  result: TechIconResult | null;
  name: string;
  size?: number;
}

export function TechIconGlyph({ result, name, size = 16 }: TechIconGlyphProps) {
  if (!result) {
    return (
      <span className="text-gray-900 dark:text-white text-xs font-bold" aria-hidden="true">
        {name.charAt(0)}
      </span>
    );
  }

  if (result.kind === 'fallback') {
    const Icon = FALLBACK_ICONS[result.iconName];
    return <Icon size={size} style={{ color: result.color }} aria-hidden="true" />;
  }

  return (
    <svg
      role="img"
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={result.color}
    >
      <path d={result.path} />
    </svg>
  );
}
