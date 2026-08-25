/**
 * Tech Icon Glyph
 * Renders a resolved TechIconResult (brand SVG path or a fallback lucide
 * icon). No hooks, no browser APIs — safe in both Server and Client
 * Components. Falls back to the tech name's first letter when unresolved.
 */

import { CreditCard, PawPrint, ScanText, TestTube } from 'lucide-react';
import type { FallbackIconName, TechIconResult } from '@/lib/tech-icon-data';

const FALLBACK_ICONS: Record<FallbackIconName, typeof PawPrint> = {
  PawPrint,
  CreditCard,
  TestTube,
  ScanText,
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
