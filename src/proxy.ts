/**
 * Proxy
 * Handles locale detection (next-intl), theme cookie (next-themes),
 * and session protection for /admin/* routes (Supabase Auth)
 */

import type { CookieOptions } from '@supabase/ssr';
import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { adminEmails, supabaseAnonKey, supabaseUrl } from '@/lib/auth/config';
import { locales } from '@/lib/i18n/config';
import { routing } from '@/lib/i18n/navigation';

const intlMiddleware = createMiddleware(routing);

const localePattern = locales.join('|');
const ADMIN_PATH = new RegExp(`^/(${localePattern})/admin(/|$)`);
const ADMIN_LOGIN_PATH = new RegExp(`^/(${localePattern})/admin/login(/|$)`);

export default async function proxy(request: NextRequest) {
  const response = intlMiddleware(request);

  const { pathname } = request.nextUrl;
  if (!ADMIN_PATH.test(pathname) || ADMIN_LOGIN_PATH.test(pathname)) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.email?.toLowerCase();
  if (!email || !adminEmails.has(email)) {
    const locale = pathname.split('/')[1];
    return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
  }

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
