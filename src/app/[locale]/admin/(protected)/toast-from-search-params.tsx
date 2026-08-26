/**
 * Toast From Search Params
 * Fires a toast once on mount if the URL carries a `?toast=` message
 * (set by a Server Action redirect after create/update), then strips
 * the param so refreshing or navigating back doesn't replay it
 */

'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { useToast } from './toast-provider';

export function ToastFromSearchParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();
  const message = searchParams.get('toast');
  const shownMessageRef = useRef<string | null>(null);

  useEffect(() => {
    if (message && shownMessageRef.current !== message) {
      shownMessageRef.current = message;
      showToast(message);
      router.replace(pathname, { scroll: false });
    }
  }, [message, pathname, router, showToast]);

  return null;
}
