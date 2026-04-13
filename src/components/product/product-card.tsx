'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Eye, Check } from 'lucide-react';
import { cn, formatPrice, calculateDiscount } from '@/lib/utils';
import { Product } from '@/types';
import { Badge, Rating, useToast } from '@/components/ui';
import { useCartStore, useWishlistStore } from '@/store';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  const { addItem } = useCartStore();
  const { isInWishlist, toggleItem } = useWishlistStore();
  const { addToast } = useToast();
  
  const isWishlisted = isInWishlist(product.id);
  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAdding) return;
    
    setIsAdding(true);
    addItem(product);
    addToast('success', `${product.title.substring(0, 30)}... added to cart`);
    
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    addToast(
      isWishlisted ? 'info' : 'success',
      isWishlisted ? 'Removed from wishlist' : 'Added to wishlist'
    );
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className={cn(
        'group relative flex flex-col rounded-xl border border-[var(--border)]',
        'bg-[var(--card)] transition-all duration-200',
        'hover:shadow-lg hover:-translate-y-1 hover:border-[var(--ring)]',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-xl bg-[var(--muted)]">
        {!imageError ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className={cn(
              'object-cover transition-transform duration-300',
              isHovered && 'scale-105'
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--muted-foreground)]">
            <Eye className="h-12 w-12 mb-2" />
            <span className="text-xs">Image unavailable</span>
          </div>
        )}
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <Badge variant="error" size="sm">
              -{discount}%
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="default" size="sm">
              Out of Stock
            </Badge>
          )}
        </div>

        <div
          className={cn(
            'absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-200',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        >
          <button
            onClick={handleToggleWishlist}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full bg-[var(--card)] shadow-md transition-all',
              'hover:scale-110',
              isWishlisted && 'text-[#dc3545]'
            )}
          >
            <Heart className={cn('h-5 w-5', isWishlisted && 'fill-current')} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wide mb-1">
          {product.category.replace('-', ' ')}
        </p>
        
        <h3 className="font-medium text-[var(--card-foreground)] line-clamp-2 flex-1 min-h-[2.5rem]">
          {product.title}
        </h3>

        <div className="mt-2">
          <Rating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-[var(--card-foreground)]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-[var(--muted-foreground)] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdding}
          className={cn(
            'mt-4 flex items-center justify-center gap-2 rounded-lg py-2.5 px-4',
            'font-medium text-sm transition-all duration-200',
            'bg-gradient-to-r from-[#B34BFF] via-[#6032E6] to-[#1D34C3] text-white hover:opacity-90 active:scale-[0.98]',
            'disabled:bg-[var(--muted)] disabled:text-[var(--muted-foreground)] disabled:cursor-not-allowed',
            isAdding && 'bg-gradient-to-r from-[#198754] via-[#10b981] to-[#059669]'
          )}
        >
          {isAdding ? (
            <>
              <Check className="h-4 w-4" />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </>
          )}
        </button>
      </div>
    </Link>
  );
}
