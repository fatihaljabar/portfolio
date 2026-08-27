/**
 * Site Profile Lookup
 * Wrapped in React's cache() so the layout and a page that both need the
 * singleton profile in the same request share one query instead of two.
 */

import { cache } from 'react';
import { prisma } from '@/lib/prisma/client';

export const getSiteProfile = cache(() =>
  prisma.siteProfile.findUnique({ where: { id: 'singleton' } }),
);
