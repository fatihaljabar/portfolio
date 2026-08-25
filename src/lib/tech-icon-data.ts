/**
 * Tech Icon Data
 * Pure data + color math — no `simple-icons` import here on purpose, so
 * this stays safe to import from client components without shipping the
 * ~5MB icon library to the browser. `tech-icon.ts` (server-only) is where
 * `simple-icons` actually gets loaded.
 */

export type FallbackIconName = 'PawPrint' | 'CreditCard' | 'TestTube' | 'ScanText';

export type TechIconResult =
  | { kind: 'svg'; path: string; color: string }
  | { kind: 'fallback'; iconName: FallbackIconName; color: string };

/** simple-icons has no exact title match for these — alias to the closest brand icon it does have. */
export const TECH_ICON_ALIASES: Record<string, string> = {
  'Framer Motion': 'Framer',
  'Cloudflare R2': 'Cloudflare',
};

/** No official brand icon exists in simple-icons for these — representative icons instead. */
export const TECH_ICON_FALLBACKS: Record<string, { iconName: FallbackIconName; hex: string }> = {
  Zustand: { iconName: 'PawPrint', hex: '#A3A3A3' },
  Midtrans: { iconName: 'CreditCard', hex: '#00AAE4' },
  Playwright: { iconName: 'TestTube', hex: '#A3A3A3' },
  'Tesseract.js': { iconName: 'ScanText', hex: '#A3A3A3' },
};

const PAGE_BACKGROUND = '#0a0a0a';
/** Icon-only badges are graphical objects, not text — WCAG 1.4.11 floor is 3:1. Small margin above it. */
const MIN_CONTRAST_RATIO = 3.3;

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  return [
    Number.parseInt(clean.slice(0, 2), 16),
    Number.parseInt(clean.slice(2, 4), 16),
    Number.parseInt(clean.slice(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.round(Math.min(255, Math.max(0, n)))
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hexA: string, hexB: string): number {
  const lumA = relativeLuminance(hexToRgb(hexA));
  const lumB = relativeLuminance(hexToRgb(hexB));
  const [lighter, darker] = lumA > lumB ? [lumA, lumB] : [lumB, lumA];
  return (lighter + 0.05) / (darker + 0.05);
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

/**
 * Lightens (or darkens) a color in HSL space, in small steps, until it
 * passes contrast against the page background — checked against the final
 * ROUNDED hex each step, not the pre-rounding float (rounding can drop the
 * ratio just under the target otherwise).
 */
export function ensureContrast(
  hex: string,
  background: string = PAGE_BACKGROUND,
  minRatio: number = MIN_CONTRAST_RATIO,
): string {
  if (contrastRatio(hex, background) >= minRatio) {
    return hex;
  }

  const [h, s, initialL] = rgbToHsl(...hexToRgb(hex));
  const bgIsDark = relativeLuminance(hexToRgb(background)) < 0.5;
  const direction = bgIsDark ? 1 : -1;

  let bestHex = hex;
  for (let step = 1; step <= 50; step++) {
    const l = Math.min(1, Math.max(0, initialL + direction * step * 0.02));
    bestHex = rgbToHex(...hslToRgb(h, s, l));
    if (contrastRatio(bestHex, background) >= minRatio) {
      break;
    }
  }
  return bestHex;
}
