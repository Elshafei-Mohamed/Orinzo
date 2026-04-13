'use client';

import { useQuery, useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { SearchFilters } from '@/types';

export function useProducts(
  limit = 20,
  skip = 0,
  filters?: SearchFilters
) {
  return useQuery({
    queryKey: ['products', { limit, skip, filters }],
    queryFn: () => apiService.getProducts(limit, skip, filters),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useInfiniteProducts(limit = 12, filters?: SearchFilters) {
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', { limit, filters }],
    queryFn: ({ pageParam = 0 }) => apiService.getProducts(limit, pageParam, filters),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextSkip = allPages.length * limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => apiService.getProduct(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
}

export function useProductsByCategory(
  category: string,
  limit = 20,
  skip = 0
) {
  return useQuery({
    queryKey: ['products', 'category', category, { limit, skip }],
    queryFn: () => apiService.getProductsByCategory(category, limit, skip),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useSearchProducts(query: string, limit = 20, skip = 0) {
  return useQuery({
    queryKey: ['products', 'search', query, { limit, skip }],
    queryFn: () => apiService.searchProducts(query, limit, skip),
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => apiService.getCategories(),
    staleTime: 60 * 60 * 1000,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => apiService.getProducts(8, 0, { sortBy: 'rating' }),
    staleTime: 5 * 60 * 1000,
  });
}

export function useNewArrivals() {
  return useQuery({
    queryKey: ['products', 'new'],
    queryFn: () => apiService.getProducts(8, 0, { sortBy: 'newest' }),
    staleTime: 5 * 60 * 1000,
  });
}
