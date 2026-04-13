'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const sizes = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

function Rating({
  rating,
  reviewCount,
  size = 'md',
  showCount = true,
  interactive = false,
  onChange,
}: RatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn(
              'fill-[var(--rating)] text-[var(--rating)]',
              sizes[size],
              interactive && 'cursor-pointer transition-transform hover:scale-110'
            )}
            onClick={() => handleClick(i)}
          />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className={cn('text-[var(--muted-foreground)]', sizes[size])} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className={cn('fill-[var(--rating)] text-[var(--rating)]', sizes[size])} />
            </div>
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn(
              'text-[var(--muted-foreground)]',
              sizes[size],
              interactive && 'cursor-pointer transition-transform hover:scale-110'
            )}
            onClick={() => handleClick(fullStars + (hasHalfStar ? 1 : 0) + i)}
          />
        ))}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="text-sm text-[var(--muted-foreground)] ml-1">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}

export { Rating };
