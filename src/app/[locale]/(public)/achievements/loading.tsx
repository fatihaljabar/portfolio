/**
 * Loading State — Achievements
 * Mirrors the header, filters, and card grid in achievements-client.tsx
 */

import { Skeleton } from '@/components/ui/skeleton';

function CardSkeleton() {
  return (
    <div className="flex flex-col bg-gray-100 dark:bg-[#121212] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden">
      <Skeleton className="w-full aspect-[16/10] rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <>
      <div className="mb-10">
        <Skeleton className="h-10 w-56 mb-4" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="h-[1px] border-t border-dashed border-gray-300 dark:border-[#333] w-full mb-10"></div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Skeleton className="flex-1 h-12 rounded-xl" />
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-12 w-full sm:w-40 rounded-xl" />
          <Skeleton className="h-12 w-full sm:w-40 rounded-xl" />
        </div>
      </div>

      <Skeleton className="h-4 w-24 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton placeholders, never reordered
          <CardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
