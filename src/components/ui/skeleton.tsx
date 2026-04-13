'use client';

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  shimmer?: boolean;
}

function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  shimmer = true,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-[var(--muted)]',
        shimmer && 'animate-shimmer',
        variant === 'circular' && 'rounded-full',
        variant === 'rectangular' && 'rounded-lg',
        variant === 'text' && 'rounded h-4',
        className
      )}
      style={{
        width,
        height: variant === 'text' ? undefined : height,
        ...style,
      }}
      {...props}
    />
  );
}

function SkeletonCard() {
  return (
    <div className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
      <Skeleton className="h-48 w-full" />
      <div className="space-y-2">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
        <Skeleton variant="text" className="w-1/4" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  );
}

function SkeletonProductGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonProductGrid };
