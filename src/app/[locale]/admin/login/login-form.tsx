/**
 * Admin Login Form
 * Client component: calls the login Server Action, shows validation/auth errors
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/lib/actions/auth';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await login({ email, password });

    if (result && !result.success) {
      setError(result.error);
      setIsSubmitting(false);
    }
    // On success, login() redirects server-side — no client state update needed.
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
          className="bg-gray-100 dark:bg-[#151515] border-gray-300 dark:border-white/10"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="bg-gray-100 dark:bg-[#151515] border-gray-300 dark:border-white/10"
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-sm py-6 hover:bg-gray-800 dark:hover:bg-gray-200"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
}
