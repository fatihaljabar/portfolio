/**
 * Auth Server Actions
 * Login and logout for the single admin user (Supabase Auth)
 */

'use server';

import { getLocale } from 'next-intl/server';
import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/auth/server';
import { redirect } from '@/lib/i18n/navigation';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export async function login(data: LoginInput) {
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Validation failed',
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    console.error('Admin login failed:', error.message);
    return { success: false, error: 'Invalid email or password' };
  }

  const locale = await getLocale();
  redirect({ href: '/admin', locale });
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();

  const locale = await getLocale();
  redirect({ href: '/admin/login', locale });
}
