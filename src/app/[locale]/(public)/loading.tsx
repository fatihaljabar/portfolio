/**
 * Loading State — Home
 * Mirrors the intro + skills layout in page.tsx
 */

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <section className="mb-20">
        <Skeleton className="h-3 w-16 mb-6" />
        <Skeleton className="h-10 lg:h-12 w-full max-w-md mb-6" />
        <Skeleton className="h-4 w-40 mb-10" />
        <div className="max-w-3xl space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
        </div>
      </section>

      <div className="h-[1px] bg-gray-300 dark:bg-white/20 mb-20"></div>

      <section>
        <div className="flex items-center gap-3 mb-10">
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 24 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton placeholders, never reordered
            <Skeleton key={i} className="h-8 w-24 rounded-lg" />
          ))}
        </div>
      </section>
    </>
  );
}
