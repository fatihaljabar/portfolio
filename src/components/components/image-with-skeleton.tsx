/**
 * Image With Skeleton
 * Wraps next/image with a pulse placeholder shown until the image
 * actually finishes loading, instead of a blank gap or layout jump.
 * Drop-in replacement for <Image> — parent must be `relative`.
 */

'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function ImageWithSkeleton({ className, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // A cached image can finish loading before this component's onLoad
  // listener attaches, so the native load event never fires — check
  // .complete directly once mounted to cover that case.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
      <Image
        {...props}
        ref={imgRef}
        className={cn(
          className,
          'transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />
    </>
  );
}
