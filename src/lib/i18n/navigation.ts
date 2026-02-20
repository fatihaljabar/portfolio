/**
 * next-intl Navigation Configuration
 * Configured for localized routing with [locale] segment
 */

import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export type Locale = (typeof locales)[number];

// Lightweight wrapper around Next.js built-in navigation
// that automatically applies the locale segment to all URLs
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
