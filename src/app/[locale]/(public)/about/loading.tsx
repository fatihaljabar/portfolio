/**
 * Loading State — About
 * Mirrors the header + Career/Education card layout in about-client.tsx
 */

import { Skeleton } from '@/components/ui/skeleton';

function EntryCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#121212] p-6">
      <div className="flex flex-col md:flex-row gap-5 items-start">
        <Skeleton className="w-14 h-14 min-w-[56px] rounded-xl" />
        <div className="flex-1 w-full space-y-4">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-full max-w-sm" />
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
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="h-[1px] border-t border-dashed border-gray-300 dark:border-[#333] w-full mb-10"></div>

      <section className="mb-16">
        <Skeleton className="h-3 w-14 mb-4" />
        <Skeleton className="h-6 w-24 mb-2" />
        <Skeleton className="h-4 w-56 mb-8" />
        <div className="space-y-4">
          <EntryCardSkeleton />
        </div>
      </section>

      <section>
        <Skeleton className="h-3 w-14 mb-4" />
        <Skeleton className="h-6 w-28 mb-2" />
        <Skeleton className="h-4 w-56 mb-8" />
        <div className="space-y-4">
          <EntryCardSkeleton />
        </div>
      </section>
    </>
  );
}
