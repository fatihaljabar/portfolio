/**
 * Scroll To Top Button
 * Appears once the reader has scrolled past the hero, for long project docs
 */

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          aria-label="Back to top"
          className="fixed bottom-[max(6rem,calc(env(safe-area-inset-bottom)+5rem))] right-6 lg:right-10 z-40 flex items-center justify-center w-11 h-11 rounded-full bg-gray-100/90 dark:bg-[#121212]/90 backdrop-blur-xl border border-gray-300 dark:border-white/10 text-gray-500 dark:text-[#888] shadow-lg hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-white/20 transition-colors"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
