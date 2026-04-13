'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store';
import { Button } from '@/components/ui';

export function MiniCart() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, getItemCount } = useCartStore();
  
  const subtotal = getSubtotal();
  const itemCount = getItemCount();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={closeCart}
        />
      )}
      
      <div
        className={cn(
          'fixed top-0 right-0 z-60 h-full w-full max-w-md bg-white shadow-2xl',
          'transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[var(--foreground)]" />
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                Shopping Cart ({itemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors text-[var(--foreground)]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 rounded-full bg-[var(--muted)] p-6">
                <ShoppingBag className="h-12 w-12 text-[var(--muted-foreground)]" />
              </div>
              <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">Your cart is empty</h3>
              <p className="text-sm text-[var(--muted-foreground)] mb-6">
                Discover our products and add items to your cart
              </p>
              <Button onClick={closeCart}>
                <Link href="/products" className="flex items-center gap-2">
                  Start Shopping
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 rounded-lg border border-[var(--border)] p-3"
                    >
                      <Link
                        href={`/products/${item.product.id}`}
                        onClick={closeCart}
                        className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-[var(--muted)]"
                      >
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <Link
                          href={`/products/${item.product.id}`}
                          onClick={closeCart}
                          className="text-sm font-medium text-[var(--foreground)] line-clamp-2 hover:text-[var(--accent)] transition-colors"
                        >
                          {item.product.title}
                        </Link>
                        <p className="mt-1 text-sm font-semibold text-[var(--accent)]">
                          {formatPrice(item.product.price)}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 hover:bg-[var(--muted)] rounded transition-colors text-[var(--foreground)]"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-sm text-[var(--foreground)]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 hover:bg-[var(--muted)] rounded transition-colors text-[var(--foreground)]"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-sm text-[var(--muted-foreground)] hover:text-[var(--error)] transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[var(--border)] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--muted-foreground)]">Subtotal</span>
                  <span className="font-semibold text-[var(--foreground)]">{formatPrice(subtotal)}</span>
                </div>
                {subtotal < 50 && (
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Add {formatPrice(50 - subtotal)} more for free shipping
                  </p>
                )}
                <div className="space-y-2">
                  <Link href="/cart" onClick={closeCart}>
                    <Button variant="outline" className="w-full">
                      View Cart
                    </Button>
                  </Link>
                  <Link href="/checkout" onClick={closeCart}>
                    <Button className="w-full">Checkout</Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
