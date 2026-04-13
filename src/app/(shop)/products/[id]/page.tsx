'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Truck, Shield, RefreshCw, ChevronRight, Minus, Plus } from 'lucide-react';
import { useProduct, useProductsByCategory } from '@/hooks';
import { useCartStore, useWishlistStore } from '@/store';
import { Button, Badge, Rating, Skeleton, Card } from '@/components/ui';
import { ProductGrid } from '@/components/product';
import { formatPrice, calculateDiscount, cn } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const { data: product, isLoading, error } = useProduct(productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const { addItem } = useCartStore();
  const { isInWishlist, toggleItem } = useWishlistStore();
  
  const isWishlisted = product ? isInWishlist(product.id) : false;
  
  const { data: relatedProducts } = useProductsByCategory(
    product?.category || '',
    4,
    0
  );

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Skeleton className="h-96 w-full rounded-xl" />
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-12 w-1/3" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleToggleWishlist = () => {
    toggleItem(product);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-accent">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/products" className="hover:text-accent">Products</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/products?category=${product.category}`} className="hover:text-accent capitalize">
            {product.category.replace('-', ' ')}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 dark:text-dark-text truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-dark-elevated">
              <Image
                src={images[selectedImage]}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              {discount > 0 && (
                <Badge variant="error" className="absolute top-4 left-4">
                  -{discount}% OFF
                </Badge>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'relative aspect-square overflow-hidden rounded-lg border-2 transition-colors',
                      selectedImage === index
                        ? 'border-accent'
                        : 'border-transparent hover:border-gray-300'
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl font-bold">{product.title}</h1>
            </div>

            <div className="flex items-center gap-4">
              <Rating rating={product.rating} reviewCount={product.reviewCount} />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {product.reviewCount.toLocaleString()} reviews
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900 dark:text-dark-text">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="success">Save {formatPrice(product.originalPrice - product.price)}</Badge>
                </>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 dark:border-dark-border rounded-lg">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-dark-elevated transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-x border-gray-300 dark:border-dark-border py-2"
                  min="1"
                  max={product.stockCount}
                />
                <button
                  onClick={() => setQuantity(q => Math.min(product.stockCount, q + 1))}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-dark-elevated transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {product.stockCount} in stock
              </span>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                leftIcon={<ShoppingCart className="h-5 w-5" />}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleToggleWishlist}
                className={cn(isWishlisted && 'text-error border-error')}
              >
                <Heart className={cn('h-5 w-5', isWishlisted && 'fill-current')} />
              </Button>
            </div>

            <Card className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4">
                  <Truck className="h-6 w-6 text-accent" />
                  <div>
                    <p className="font-medium text-sm">Free Shipping</p>
                    <p className="text-xs text-gray-500">Orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4">
                  <Shield className="h-6 w-6 text-accent" />
                  <div>
                    <p className="font-medium text-sm">Secure Payment</p>
                    <p className="text-xs text-gray-500">100% Protected</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4">
                  <RefreshCw className="h-6 w-6 text-accent" />
                  <div>
                    <p className="font-medium text-sm">Easy Returns</p>
                    <p className="text-xs text-gray-500">30-day policy</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {relatedProducts && relatedProducts.data.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Related Products</h2>
              <Link href={`/products?category=${product.category}`}>
                <Button variant="ghost">View All</Button>
              </Link>
            </div>
            <ProductGrid products={relatedProducts.data} columns={4} />
          </section>
        )}
      </div>
    </div>
  );
}
