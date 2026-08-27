/**
 * Loading State — Project Detail
 * Mirrors title, tech stack row, hero image, and content in page.tsx
 */

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <Skeleton className="h-4 w-16 mb-8" />
      <Skeleton className="h-10 w-3/4 mb-6" />
      <div className="max-w-4xl space-y-3 mb-10">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-2/3" />
      </div>

      <div className="border-t border-dashed border-gray-300 dark:border-[#333] w-full py-6 mb-8 flex flex-wrap items-center gap-3">
        <Skeleton className="h-4 w-20" />
        {Array.from({ length: 5 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton placeholders, never reordered
          <Skeleton key={i} className="w-9 h-9 rounded-full" />
        ))}
      </div>

      <div className="flex gap-4 mb-8">
        <Skeleton className="h-10 w-28 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10">
        <Skeleton className="absolute inset-0 rounded-2xl" />
      </div>

      <div className="max-w-4xl space-y-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
      </div>
    </>
  );
}
