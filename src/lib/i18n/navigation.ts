/**
 * next-intl Navigation Configuration
 * Configured for localized routing with [locale] segment
 */

import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { defaultLocale, locales } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  // Visitors always land on defaultLocale (EN) first, not whatever their
  // browser's Accept-Language header prefers. Once on the site, switching
  // language still works normally — this only affects the first hit to a
  // path with no locale segment.
  localeDetection: false,
});

export type Locale = (typeof locales)[number];

// Lightweight wrapper around Next.js built-in navigation
// that automatically applies the locale segment to all URLs
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
