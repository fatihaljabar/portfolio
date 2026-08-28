/**
 * Visitor Identifier
 * Real IP behind the Hostinger proxy (x-forwarded-for / x-real-ip) in
 * production. Locally, or anywhere those headers are absent, falls back to
 * a per-browser cookie so different dev visitors aren't merged into one
 * 'unknown' bucket. Must be called from a Server Action or Route Handler —
 * the cookie fallback writes a cookie.
 *
 * x-forwarded-for is client-suppliable, but our own reverse proxy appends
 * the real peer as the LAST entry (it never rewrites earlier ones) — so the
 * last hop is the one hop we can trust, not the first. Each candidate is
 * validated as an actual IP literal before use, so a header that fails to
 * parse falls through to the cookie instead of storing an arbitrary string.
 */

import { randomUUID } from 'node:crypto';
import { isIP } from 'node:net';
import { cookies, headers } from 'next/headers';

const VISITOR_COOKIE = 'visitor_id';

export async function getVisitorId(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  if (forwardedFor) {
    const hops = forwardedFor.split(',').map((hop) => hop.trim());
    const lastHop = hops[hops.length - 1];
    if (lastHop && isIP(lastHop)) {
      return lastHop;
    }
  }

  const realIp = headersList.get('x-real-ip');
  if (realIp && isIP(realIp)) {
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
