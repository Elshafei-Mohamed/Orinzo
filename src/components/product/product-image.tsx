'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  onError?: () => void;
}

const PLACEHOLDER_IMAGE = '/placeholder.png';

const TRUSTED_DOMAINS = [
  'images.unsplash.com',
  'cdn.dummyjson.com',
  'picsum.photos',
];

const isTrustedDomain = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return TRUSTED_DOMAINS.some(domain => 
      parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
};

export function ProductImage({
  src,
  alt,
  fill = true,
  width,
  height,
  className,
  sizes,
  priority = false,
  onError,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
      onError?.();
    }
  }, [hasError, onError]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  if (hasError || !src) {
    return (
      <div className={cn(
        'absolute inset-0 flex flex-col items-center justify-center bg-[var(--muted)]',
        className
      )}>
        <Eye className="h-12 w-12 text-[var(--muted-foreground)] mb-2" />
        <span className="text-xs text-[var(--muted-foreground)]">Image unavailable</span>
      </div>
    );
  }

  const shouldUnoptimize = !isTrustedDomain(src);
  const imageSrc = hasError ? PLACEHOLDER_IMAGE : src;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={cn(
        'object-cover transition-opacity duration-300',
        isLoaded ? 'opacity-100' : 'opacity-0',
        className
      )}
      sizes={sizes}
      priority={priority}
      unoptimized={shouldUnoptimize}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}
