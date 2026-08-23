/**
 * Root Layout
 * Owns <html>/<body> and ThemeProvider. Deliberately NOT parameterized by
 * [locale] — next-intl's locale switch causes the whole [locale] segment
 * subtree to remount, and if ThemeProvider lived there, every EN/ID toggle
 * would reset its theme state and flash the opposite color for a frame.
 * Living here instead, it never remounts, so no flash in either direction.
 * `lang` is synced imperatively from the [locale] segment via HtmlLangSync.
 */

import type { Metadata, Viewport } from 'next';
import { Manrope, Sacramento } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import './globals.css';

export const viewport: Viewport = {
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(
    (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, ''),
  ),
};

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const sacramento = Sacramento({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-sacramento',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Applies the persisted theme before first paint on a fresh visit. */}
        <script suppressHydrationWarning>
          {`(function(){try{var t=localStorage.getItem("portfolio-theme");if(t==="light")document.documentElement.className="light"}catch(e){}})()`}
        </script>
      </head>
      <body className={`${manrope.variable} ${sacramento.variable}`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="portfolio-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
