/**
 * Loading State — Contact
 * Mirrors the header, social cards, and form in contact-client.tsx
 */

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <div className="mb-10">
        <Skeleton className="h-10 w-36 mb-4" />
        <Skeleton className="h-4 w-full max-w-lg" />
      </div>

      <div className="h-[1px] border-t border-dashed border-gray-300 dark:border-[#333] w-full mb-10"></div>

      <Skeleton className="h-3 w-32 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        <Skeleton className="md:col-span-2 h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
      </div>

      <Skeleton className="h-3 w-40 mb-6" />
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-12 rounded-xl" />
          <Skeleton className="h-12 rounded-xl" />
        </div>
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-12 w-40 rounded-xl" />
      </div>
    </>
  );
}
