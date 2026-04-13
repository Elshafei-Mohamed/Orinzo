'use client';

import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '@/store';
import { ProductCard } from '@/components/product';
import { Button } from '@/components/ui';

export default function WishlistPage() {
  const { items } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-6 rounded-full bg-gray-100 dark:bg-dark-elevated p-8 inline-flex">
            <Heart className="h-16 w-16 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Your wishlist is empty</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Save items you love by clicking the heart icon on any product. 
            They&apos;ll appear here so you can easily find them later.
          </p>
          <Link href="/products">
            <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold mb-2">Wishlist</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {items.length} {items.length === 1 ? 'item' : 'items'} saved
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <ProductCard key={item.product.id} product={item.product} />
          ))}
        </div>
      </div>
    </div>
  );
}
