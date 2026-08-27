/**
 * Searchable Tech Icons
 * Lazy-loads the simple-icons brand library (plus the small fallback set)
 * into a flat, searchable list. Shared by any admin combobox that lets
 * an admin pick a tech/brand icon by name (tech stack, skills, ...).
 */

'use client';

import { ensureContrast, TECH_ICON_FALLBACKS, type TechIconResult } from '@/lib/tech-icon-data';

export interface SearchableTechIcon {
  name: string;
  result: TechIconResult;
}

let cachedEntries: SearchableTechIcon[] | null = null;
let loadPromise: Promise<SearchableTechIcon[]> | null = null;

export function getCachedSearchableTechIcons(): SearchableTechIcon[] | null {
  return cachedEntries;
}

export async function loadSearchableTechIcons(): Promise<SearchableTechIcon[]> {
  if (cachedEntries) {
    return cachedEntries;
  }
  if (!loadPromise) {
    loadPromise = import('simple-icons').then((mod) => {
      const entries: SearchableTechIcon[] = [];
      const seen = new Set<string>();

      for (const icon of Object.values(mod)) {
        if (
          icon &&
          typeof icon === 'object' &&
          'title' in icon &&
          'path' in icon &&
          'hex' in icon
        ) {
          const title = icon.title as string;
          if (seen.has(title)) continue;
          seen.add(title);
          entries.push({
            name: title,
            result: {
              kind: 'svg',
              path: icon.path as string,
              color: ensureContrast(`#${icon.hex as string}`),
            },
          });
        }
      }

      for (const [name, fallback] of Object.entries(TECH_ICON_FALLBACKS)) {
        entries.push({
          name,
          result: {
            kind: 'fallback',
            iconName: fallback.iconName,
            color: ensureContrast(fallback.hex),
          },
        });
      }

      cachedEntries = entries;
      return entries;
    });
  }
  return loadPromise;
}
