/**
 * Admin Login Page
 */

import type { Metadata } from 'next';
import { LoginForm } from './login-form';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-8 p-8 bg-white dark:bg-[#0a0a0a]">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
      <LoginForm />
    </div>
  );
}
