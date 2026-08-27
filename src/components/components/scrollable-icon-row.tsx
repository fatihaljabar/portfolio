/**
 * Scrollable Icon Row
 * Single-line, horizontally scrollable row for a fixed-width set of
 * icons (e.g. tech stack badges) that can outgrow their container.
 * Shows a ">" affordance at the right edge when there's more to scroll
 * to, instead of clipping or wrapping. Mirrors ScrollableFilterBar's
 * pattern, minus the active-filter state this doesn't need.
 */

'use client';

import { ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface ScrollableIconRowProps {
  children: React.ReactNode;
  fadeClassName?: string;
}

export function ScrollableIconRow({ children, fadeClassName }: ScrollableIconRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkOverflow = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 4);
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(content);
    return () => observer.disconnect();
  }, [checkOverflow]);

  const scrollNext = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollRef.current?.scrollBy({ left: 100, behavior: 'smooth' });
  };

  return (
    <div className="relative min-w-0">
      <div
        ref={scrollRef}
        onScroll={checkOverflow}
        className="overflow-x-auto no-scrollbar scroll-smooth"
      >
        <div ref={contentRef} className="flex flex-nowrap items-center gap-3 w-fit">
          {children}
        </div>
      </div>
      {canScrollRight && (
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Show more technologies"
          className={`absolute right-0 top-0 bottom-0 flex items-center pl-6 bg-gradient-to-l from-60% to-transparent pointer-events-none ${fadeClassName ?? 'from-gray-50 dark:from-[#121212]'}`}
        >
          <span className="pointer-events-auto flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-[#888] shrink-0">
            <ChevronRight size={14} />
          </span>
        </button>
      )}
    </div>
  );
}
