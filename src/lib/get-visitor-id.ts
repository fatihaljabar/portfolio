/**
 * Visitor Identifier
 * Real IP behind the Hostinger proxy (x-forwarded-for / x-real-ip) in
 * production. Locally, or anywhere those headers are absent, falls back to
 * a per-browser cookie so different dev visitors aren't merged into one
 * 'unknown' bucket. Must be called from a Server Action or Route Handler —
 * the cookie fallback writes a cookie.
 */

import { randomUUID } from 'node:crypto';
import { cookies, headers } from 'next/headers';

const VISITOR_COOKIE = 'visitor_id';

export async function getVisitorId(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = headersList.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  const cookieStore = await cookies();
  const existing = cookieStore.get(VISITOR_COOKIE)?.value;
  if (existing) {
    return existing;
  }

  const generated = randomUUID();
  cookieStore.set(VISITOR_COOKIE, generated, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  });
  return generated;
}
