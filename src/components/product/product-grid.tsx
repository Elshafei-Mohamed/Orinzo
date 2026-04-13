'use client';

import { Search, RefreshCw } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from './product-card';
import { SkeletonProductGrid } from '@/components/ui';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ProductGrid({
  products,
  isLoading,
  isError,
  onRetry,
  columns = 4,
  className,
}: ProductGridProps) {
  if (isLoading) {
    return <SkeletonProductGrid count={8} />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border border-[var(--border)] bg-[var(--card)] p-8">
        <div className="mb-4 rounded-full bg-[var(--muted)] p-6">
          <RefreshCw className="h-12 w-12 text-[var(--muted-foreground)]" />
        </div>
        <h3 className="text-lg font-medium text-[var(--card-foreground)] mb-2">
          Something went wrong
        </h3>
        <p className="text-sm text-[var(--muted-foreground)] mb-6 max-w-md">
          We couldn&apos;t load the products. Please check your connection and try again.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff9900] text-white rounded-lg hover:bg-[#e68a00] transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        )}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border border-[var(--border)] bg-[var(--card)] p-8">
        <div className="mb-4 rounded-full bg-[var(--muted)] p-6">
          <Search className="h-12 w-12 text-[var(--muted-foreground)]" />
        </div>
        <h3 className="text-lg font-medium text-[var(--card-foreground)] mb-2">
          No products found
        </h3>
        <p className="text-sm text-[var(--muted-foreground)] max-w-md">
          Try adjusting your search or filter criteria to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 ${className || ''}`}>
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
