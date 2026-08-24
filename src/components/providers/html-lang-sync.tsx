/**
 * Html Lang Sync
 * Keeps <html lang> matching the active locale without [locale] owning
 * <html> itself — see src/app/layout.tsx for why that ownership was moved.
 */

'use client';

import { useEffect } from 'react';

export function HtmlLangSync({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
