'use client';

import { useState, Suspense, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useInfiniteProducts } from '@/hooks';
import { ProductGrid, ProductFilters } from '@/components/product';
import { Button, Select, SkeletonProductGrid } from '@/components/ui';
import { SORT_OPTIONS, CATEGORIES, getCategoryBySlug } from '@/lib/constants';

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'popular');
  const filters = {
    category: searchParams.get('category') || undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    minRating: searchParams.get('minRating') ? Number(searchParams.get('minRating')) : undefined,
  };

  const limit = 12;
  const { 
    data, 
    isLoading, 
    isError, 
    isFetchingNextPage, 
    hasNextPage,
    fetchNextPage,
    refetch 
  } = useInfiniteProducts(limit, {
    category: filters.category,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    minRating: filters.minRating,
    sortBy: sortBy as 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'newest',
  });

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );
    
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const products = data?.pages.flatMap(page => page.data) || [];
  const total = data?.pages[0]?.total || 0;

  const categories = CATEGORIES.map(c => ({ slug: c.slug, name: c.name }));
  const currentCategory = filters.category ? getCategoryBySlug(filters.category) : null;

  const handleFilterChange = (newFilters: { category?: string; minPrice?: number; maxPrice?: number; minRating?: number }) => {
    const params = new URLSearchParams();
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.minPrice) params.set('minPrice', String(newFilters.minPrice));
    if (newFilters.maxPrice) params.set('maxPrice', String(newFilters.maxPrice));
    if (newFilters.minRating) params.set('minRating', String(newFilters.minRating));
    if (sortBy && sortBy !== 'popular') params.set('sort', sortBy);
    
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-6">
          <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[var(--card-foreground)]">
            {currentCategory?.name || 'All Products'}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            categories={categories}
          />

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-[var(--foreground)]">
                  {currentCategory?.name || 'All Products'}
                </h1>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">
                  {total} products
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Select
                  options={SORT_OPTIONS}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-48"
                />
              </div>
            </div>

            {isLoading ? (
              <SkeletonProductGrid count={8} />
            ) : (
              <>
                <ProductGrid
                  products={products}
                  isError={isError}
                  onRetry={() => refetch()}
                  columns={3}
                />
                
                {hasNextPage && (
                  <div 
                    ref={loadMoreRef} 
                    className="flex justify-center py-8"
                  >
                    {isFetchingNextPage && (
                      <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="text-sm">Loading more...</span>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {!isLoading && products.length === 0 && !isError && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--muted)] flex items-center justify-center mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
                  No products found
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <Button variant="outline" onClick={() => handleFilterChange({})}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SkeletonProductGrid count={8} />
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
