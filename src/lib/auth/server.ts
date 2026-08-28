/**
 * Supabase Server Client
 * For use in Server Components and Server Actions (App Router)
 */

import type { CookieOptions } from '@supabase/ssr';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { adminEmails, supabaseAnonKey, supabaseServiceRoleKey, supabaseUrl } from './config';

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component — the proxy middleware refreshes the session instead.
        }
      },
    },
  });
}

/**
 * Service-role Supabase client — bypasses RLS entirely. Only call this from
 * code that has already checked `getAdminUser()`; it carries no session or
 * user-scoped authorization of its own. Never import this into client code.
 */
export function createSupabaseServiceClient() {
  return createClient(supabaseUrl, supabaseServiceRoleKey);
}

/**
 * Returns the authenticated user only if their email is on the admin
 * allowlist. A valid Supabase session alone is not authorization — this
 * project has no role table, so any account that can sign in to the
 * Supabase project would otherwise pass. Every admin Server Action and
 * proxy.ts route through this.
 */
export async function getAdminUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const email = user?.email?.toLowerCase();
  return email && adminEmails.has(email) ? user : null;
}
