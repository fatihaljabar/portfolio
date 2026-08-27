/**
 * Tech Icon Resolution (server-only)
 * Looks up a tech stack name against the simple-icons brand library and
 * returns a contrast-safe color. Never import this from a 'use client'
 * file — it pulls in the full simple-icons package (~5MB), which is fine
 * for server-side rendering but must not ship to the browser.
 */

import * as simpleIcons from 'simple-icons';
import {
  ensureContrast,
  TECH_ICON_ALIASES,
  TECH_ICON_FALLBACKS,
  type TechIconResult,
} from './tech-icon-data';

export type { TechIconResult };

const iconsByTitle = new Map<string, { path: string; hex: string }>();
for (const icon of Object.values(simpleIcons)) {
  if (icon && typeof icon === 'object' && 'title' in icon && 'path' in icon && 'hex' in icon) {
    iconsByTitle.set((icon.title as string).toLowerCase(), {
      path: icon.path as string,
      hex: icon.hex as string,
    });
  }
}

export function getTechIcon(name: string): TechIconResult | null {
  const canonicalName = TECH_ICON_ALIASES[name] ?? name;
  const simpleIcon = iconsByTitle.get(canonicalName.toLowerCase());
  if (simpleIcon) {
    return { kind: 'svg', path: simpleIcon.path, color: ensureContrast(`#${simpleIcon.hex}`) };
  }

  const fallback = TECH_ICON_FALLBACKS[name];
  if (fallback) {
    return { kind: 'fallback', iconName: fallback.iconName, color: ensureContrast(fallback.hex) };
  }

  return null;
}
