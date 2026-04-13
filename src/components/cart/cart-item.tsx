'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/store';
import { Button } from '@/components/ui';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCartStore();

  return (
    <div className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] p-4 sm:p-6">
      <Link
        href={`/products/${item.product.id}`}
        className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-[var(--muted)]"
      >
        <Image
          src={item.product.image}
          alt={item.product.title}
          fill
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <Link
            href={`/products/${item.product.id}`}
            className="font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors line-clamp-2"
          >
            {item.product.title}
          </Link>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            {item.product.category}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-[var(--foreground)]">
              {formatPrice(item.product.price)}
            </span>
            {item.product.originalPrice && (
              <span className="text-sm text-[var(--muted-foreground)] line-through">
                {formatPrice(item.product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] transition-colors"
            >
              <Minus className="h-3 w-3" />
            </button>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.product.id, parseInt(e.target.value) || 1)
              }
              className="h-8 w-12 rounded-lg border border-[var(--border)] text-center bg-[var(--background)] text-[var(--foreground)]"
              min="1"
            />
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <p className="font-semibold text-[var(--foreground)]">
              {formatPrice(item.product.price * item.quantity)}
            </p>
            <button
              onClick={() => removeItem(item.product.id)}
              className="p-2 text-[var(--muted-foreground)] hover:text-[var(--error)] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export function CartSummary({ subtotal, shipping, tax, total }: CartSummaryProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] p-6 sticky top-24">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-[var(--muted-foreground)]">Subtotal</span>
          <span className="text-[var(--foreground)]">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--muted-foreground)]">Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-[var(--success)]">FREE</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--muted-foreground)]">Estimated Tax</span>
          <span className="text-[var(--foreground)]">{formatPrice(tax)}</span>
        </div>
        <div className="border-t border-[var(--border)] pt-3 flex justify-between font-semibold text-lg">
          <span className="text-[var(--foreground)]">Total</span>
          <span className="text-[var(--foreground)]">{formatPrice(total)}</span>
        </div>
      </div>

      {subtotal < 50 && (
        <div className="mt-4 p-3 bg-[var(--accent)]/10 rounded-lg">
          <p className="text-sm text-[var(--accent)]">
            Add {formatPrice(50 - subtotal)} more for free shipping!
          </p>
          <div className="mt-2 h-1.5 bg-[var(--muted)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] rounded-full transition-all duration-300"
              style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-6 space-y-3">
        <Link href="/checkout">
          <Button className="w-full">Proceed to Checkout</Button>
        </Link>
        <Link href="/products">
          <Button variant="outline" className="w-full" leftIcon={<ArrowRight className="h-4 w-4" />}>
            Continue Shopping
          </Button>
        </Link>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-[var(--muted-foreground)]">
        <span>Secure Checkout</span>
        <span>•</span>
        <span>Free Returns</span>
      </div>
    </div>
  );
}
