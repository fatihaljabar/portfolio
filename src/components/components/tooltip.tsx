/**
 * Tooltip
 * Label shown above its child on hover/keyboard focus, portaled to
 * document.body. Plain CSS positioning isn't enough here: several
 * ancestors (hover-lifted cards, animated grids) apply a transform,
 * which creates a new stacking context and traps any z-index inside it
 * — that's what let the tooltip render behind the floating nav despite
 * a higher z-index. A portal escapes that entirely.
 */

'use client';

import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ label, children, className }: TooltipProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const [visible, setVisible] = useState(false);

  const show = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({ top: rect.top - 8, left: rect.left + rect.width / 2 });
    setVisible(true);
  };

  const hide = () => setVisible(false);

  return (
    <span
      ref={triggerRef}
      role="note"
      className={`relative inline-flex ${className ?? ''}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {coords &&
        createPortal(
          <span
            role="tooltip"
            style={{ top: coords.top, left: coords.left }}
            className={`pointer-events-none fixed z-[100] w-max max-w-[140px] -translate-x-1/2 -translate-y-full text-center rounded-md bg-gray-900 dark:bg-white px-2 py-1 text-[11px] font-medium leading-tight text-white dark:text-black shadow-lg transition-opacity duration-150 ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {label}
            <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-white" />
          </span>,
          document.body,
        )}
    </span>
  );
}
