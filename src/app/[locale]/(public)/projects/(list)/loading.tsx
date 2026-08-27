/**
 * Loading State — Projects
 * Mirrors the header, filter bar, and card grid in projects-client.tsx
 */

import { Skeleton } from '@/components/ui/skeleton';

function CardSkeleton() {
  return (
    <div className="flex flex-col bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden">
      <Skeleton className="w-full aspect-video rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <>
      <div className="mb-10">
        <Skeleton className="h-10 w-40 mb-4" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="h-[1px] border-t border-dashed border-gray-300 dark:border-[#333] w-full mb-8"></div>

      <div className="flex gap-2 mb-8">
        <Skeleton className="h-8 w-16 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-28 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton placeholders, never reordered
          <CardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
