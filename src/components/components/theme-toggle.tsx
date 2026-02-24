'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = resolvedTheme || theme;

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#151515] p-1.5 rounded-full border border-gray-200 dark:border-white/5 opacity-50">
        <Moon size={16} className="text-gray-400 dark:text-[#666]" />
        <div className="w-9 h-5 rounded-full bg-gray-300 dark:bg-[#333]" />
      </div>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 bg-gray-100 dark:bg-[#151515] hover:bg-gray-200 dark:hover:bg-[#1a1a1a] h-8 px-3 rounded-full border border-gray-200 dark:border-white/5 text-gray-600 dark:text-[#ccc] hover:text-gray-900 dark:hover:text-white transition-colors relative z-50 overflow-hidden"
        >
          <motion.div
            key={currentTheme}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{
                rotate: currentTheme === 'dark' ? [0, 10, -10, 10, 0] : [0, -10, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            >
              {currentTheme === 'dark' ? (
                <Moon size={16} className="text-gray-600 dark:text-white" />
              ) : (
                <Sun size={16} className="text-accent-yellow" />
              )}
            </motion.div>
          </motion.div>
          <span className="text-xs font-medium">
            {currentTheme === 'dark' ? 'Dark' : 'Light'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-auto min-w-32 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-white/10 z-[100]">
        <DropdownMenuItem
          onSelect={() => setTheme('light')}
          className="text-gray-600 dark:text-[#ccc] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 focus:text-gray-900 dark:focus:text-white cursor-pointer py-2 px-3 flex items-center gap-2"
        >
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Sun className="h-4 w-4 shrink-0" />
          </motion.div>
          <span className="text-xs font-medium">Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => setTheme('dark')}
          className="text-gray-600 dark:text-[#ccc] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 focus:text-gray-900 dark:focus:text-white cursor-pointer py-2 px-3 flex items-center gap-2"
        >
          <motion.div
            whileHover={{ rotate: -15, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Moon className="h-4 w-4 shrink-0" />
          </motion.div>
          <span className="text-xs font-medium">Dark</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
