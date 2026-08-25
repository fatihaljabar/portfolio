/**
 * Scrollable Filter Bar
 * Single-line, horizontally scrollable filter pills with a sliding active
 * indicator. Shows a ">" arrow at the right edge when there are more
 * filters to scroll to, instead of wrapping to multiple lines.
 */

'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ScrollableFilterBarProps {
  filters: string[];
  activeFilter: string;
  onSelect: (filter: string) => void;
  layoutId: string;
}

export function ScrollableFilterBar({ filters, activeFilter, onSelect, layoutId }: ScrollableFilterBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkOverflow = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 4);
  };

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    checkOverflow();
    // Observe the content wrapper (sized by its children), not the
    // scroll container (fixed to 100% of its parent) — the container's
    // own box never changes size, so it wouldn't fire when content grows
    // wider, e.g. once the web font finishes loading.
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  const scrollNext = () => {
    scrollRef.current?.scrollBy({ left: 160, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={checkOverflow}
        className="overflow-x-auto no-scrollbar scroll-smooth"
      >
        <div ref={contentRef} className="flex flex-nowrap gap-1.5 w-fit">
          {filters.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => onSelect(filter)}
                className={`relative shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-[#888] hover:text-gray-700 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId={layoutId}
                    className="absolute inset-0 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{filter}</span>
              </button>
            );
          })}
        </div>
      </div>
      {canScrollRight && (
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Show more filters"
          className="absolute right-0 top-0 bottom-0 flex items-center pl-6 bg-gradient-to-l from-white dark:from-[#0a0a0a] from-60% to-transparent pointer-events-none"
        >
          <span className="pointer-events-auto flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-[#888]">
            <ChevronRight size={14} />
          </span>
        </button>
      )}
    </div>
  );
}
