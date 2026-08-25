/**
 * Loading State
 * Shown while a route segment's data is being fetched
 */

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="animate-spin text-gray-400 dark:text-[#666]" size={32} />
    </div>
  );
}
