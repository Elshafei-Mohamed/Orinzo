'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useProductsByCategory } from '@/hooks';
import { ProductGrid, ProductFilters } from '@/components/product';
import { SkeletonProductGrid, Select, Button } from '@/components/ui';
import { SORT_OPTIONS, CATEGORIES } from '@/lib/constants';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('popular');
  const limit = 12;

  const { data, isLoading } = useProductsByCategory(slug, limit, (page - 1) * limit);

  const category = CATEGORIES.find(c => c.slug === slug) || { name: slug.replace('-', ' '), slug };

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-accent">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 dark:text-dark-text capitalize">
            {category.name.replace('-', ' ')}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          <ProductFilters
            filters={{ category: slug }}
            onFilterChange={() => {}}
            categories={CATEGORIES.map(c => ({ slug: c.slug, name: c.name }))}
          />

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold capitalize">{category.name.replace('-', ' ')}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {data?.total || 0} products
                </p>
              </div>
              <Select
                options={SORT_OPTIONS}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-48"
              />
            </div>

            {isLoading ? (
              <SkeletonProductGrid count={8} />
            ) : (
              <ProductGrid products={data?.data || []} columns={3} />
            )}

            {data && data.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="px-4 text-sm">
                  Page {page} of {data.totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                  disabled={page === data.totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
