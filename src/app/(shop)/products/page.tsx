'use client';

import { useState, Suspense, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Loader2, Search, X } from 'lucide-react';
import { useInfiniteProducts } from '@/hooks';
import { ProductGrid, ProductFilters } from '@/components/product';
import { Button, Select, SkeletonProductGrid } from '@/components/ui';
import { SORT_OPTIONS, CATEGORIES, getCategoryBySlug } from '@/lib/constants';

const CATEGORY_OPTIONS = CATEGORIES.map(c => ({ slug: c.slug, name: c.name }));

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const prevSortByRef = useRef<string>('popular');

  const searchQuery = searchParams.get('search') || searchParams.get('q') || '';
  
  const [sortBy, setSortBy] = useState(() => {
    const urlSort = searchParams.get('sort');
    return urlSort || 'popular';
  });

  const filters = useMemo(() => ({
    category: searchParams.get('category') || undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    minRating: searchParams.get('minRating') ? Number(searchParams.get('minRating')) : undefined,
    query: searchQuery || undefined,
  }), [searchParams, searchQuery]);

  const queryFilters = useMemo(() => ({
    ...filters,
    sortBy: sortBy as 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'newest',
  }), [filters, sortBy]);

  const limit = 12;
  const { 
    data, 
    isLoading, 
    isError, 
    isFetchingNextPage, 
    hasNextPage,
    fetchNextPage,
    refetch 
  } = useInfiniteProducts(limit, queryFilters);

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

  const currentCategory = filters.category ? getCategoryBySlug(filters.category) : null;

  const handleFilterChange = useCallback((newFilters: { category?: string; minPrice?: number; maxPrice?: number; minRating?: number }) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.minPrice) params.set('minPrice', String(newFilters.minPrice));
    if (newFilters.maxPrice) params.set('maxPrice', String(newFilters.maxPrice));
    if (newFilters.minRating) params.set('minRating', String(newFilters.minRating));
    if (sortBy && sortBy !== 'popular') params.set('sort', sortBy);
    
    router.push(`/products?${params.toString()}`, { scroll: false });
  }, [router, sortBy, searchQuery]);

  const handleSortChange = useCallback((newSortBy: string) => {
    if (newSortBy === prevSortByRef.current) return;
    prevSortByRef.current = newSortBy;
    setSortBy(newSortBy);
    
    const params = new URLSearchParams(searchParams.toString());
    if (newSortBy && newSortBy !== 'popular') {
      params.set('sort', newSortBy);
    } else {
      params.delete('sort');
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const handleClearSearch = useCallback(() => {
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.minPrice) params.set('minPrice', String(filters.minPrice));
    if (filters.maxPrice) params.set('maxPrice', String(filters.maxPrice));
    if (filters.minRating) params.set('minRating', String(filters.minRating));
    if (sortBy && sortBy !== 'popular') params.set('sort', sortBy);
    
    router.push(`/products${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false });
  }, [router, filters, sortBy]);

  const pageTitle = useMemo(() => {
    if (searchQuery) return `Search: "${searchQuery}"`;
    if (currentCategory) return currentCategory.name;
    return 'All Products';
  }, [searchQuery, currentCategory]);

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-6">
          <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
          <ChevronRight className="h-4 w-4" />
          {searchQuery ? (
            <>
              <Link href="/products" className="hover:text-[var(--accent)]">Products</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-[var(--card-foreground)]">Search</span>
            </>
          ) : (
            <span className="text-[var(--card-foreground)]">
              {currentCategory?.name || 'All Products'}
            </span>
          )}
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          <ProductFilters
            filters={{ ...filters, category: filters.category }}
            onFilterChange={handleFilterChange}
            categories={CATEGORY_OPTIONS}
          />

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-[var(--foreground)]">
                  {pageTitle}
                </h1>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">
                  {isLoading ? (
                    'Searching...'
                  ) : (
                    <>
                      {total} {total === 1 ? 'product' : 'products'} found
                      {searchQuery && ` for "${searchQuery}"`}
                    </>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Clear search
                  </button>
                )}
                <Select
                  options={SORT_OPTIONS}
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-48"
                />
              </div>
            </div>

            {isLoading ? (
              <SkeletonProductGrid count={8} />
            ) : (
              <>
                {products.length > 0 ? (
                  <ProductGrid
                    products={products}
                    isError={isError}
                    onRetry={() => refetch()}
                    columns={3}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 rounded-full bg-[var(--muted)] flex items-center justify-center mb-6">
                      <Search className="h-10 w-10 text-[var(--muted-foreground)]" />
                    </div>
                    <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
                      {searchQuery ? `No results for "${searchQuery}"` : 'No products found'}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] mb-6 max-w-md">
                      {searchQuery 
                        ? 'Try different keywords or check your spelling. You can also browse our categories below.'
                        : 'Try adjusting your filters or search criteria to find what you\'re looking for.'
                      }
                    </p>
                    {searchQuery ? (
                      <div className="flex gap-3">
                        <Button variant="outline" onClick={handleClearSearch}>
                          Clear Search
                        </Button>
                        <Link href="/products">
                          <Button>Browse All Products</Button>
                        </Link>
                      </div>
                    ) : (
                      <Button variant="outline" onClick={() => handleFilterChange({})}>
                        Clear Filters
                      </Button>
                    )}
                  </div>
                )}
                
                {hasNextPage && products.length > 0 && (
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
