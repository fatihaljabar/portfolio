'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center lg:justify-start gap-0 lg:gap-2 bg-gray-100 dark:bg-[#151515] h-11 w-11 lg:h-8 lg:w-auto lg:px-3 rounded-full border border-gray-200 dark:border-white/5 opacity-50">
        <Moon size={16} className="text-gray-400 dark:text-[#666]" />
        <div className="hidden lg:block w-9 h-5 rounded-full bg-gray-300 dark:bg-[#333]" />
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="flex items-center justify-center lg:justify-start gap-0 lg:gap-2 bg-gray-100 dark:bg-[#151515] hover:bg-gray-200 dark:hover:bg-[#1a1a1a] h-11 w-11 lg:h-8 lg:w-auto lg:px-3 rounded-full border border-gray-200 dark:border-white/5 text-gray-600 dark:text-[#ccc] hover:text-gray-900 dark:hover:text-white transition-colors duration-200 overflow-hidden shrink-0"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'dark' : 'light'}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="flex items-center justify-center shrink-0"
        >
          {isDark ? <Moon size={16} /> : <Sun size={16} className="text-accent-yellow" />}
        </motion.span>
      </AnimatePresence>
      <span className="hidden lg:inline text-xs font-medium">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
}
