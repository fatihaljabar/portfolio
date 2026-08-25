/**
 * Admin Login Page
 */

import { LayoutDashboard } from 'lucide-react';
import type { Metadata } from 'next';
import { LoginForm } from './login-form';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-8 p-8 bg-white dark:bg-[#0a0a0a]">
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black">
          <LayoutDashboard size={20} />
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
      </div>
      <LoginForm />
    </div>
  );
}
