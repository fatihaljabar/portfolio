/**
 * Tooltip
 * Minimal CSS-only label shown above its child on hover/keyboard focus.
 * No JS positioning: the label wraps within a max width instead of
 * forcing one line, so it stays clear of the viewport edge without
 * needing per-instance placement logic.
 */

interface TooltipProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ label, children, className }: TooltipProps) {
  return (
    <span className={`group/tooltip relative inline-flex ${className ?? ''}`}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-[140px] -translate-x-1/2 text-center rounded-md bg-gray-900 dark:bg-white px-2 py-1 text-[11px] font-medium leading-tight text-white dark:text-black opacity-0 shadow-lg transition-opacity duration-150 group-hover/tooltip:opacity-100 group-focus-visible/tooltip:opacity-100"
      >
        {label}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-white" />
      </span>
    </span>
  );
}
