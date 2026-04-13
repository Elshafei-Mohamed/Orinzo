'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store';
import { CartItem, CartSummary } from '@/components/cart';
import { Button } from '@/components/ui';

export default function CartPage() {
  const { items, getSubtotal, getShipping, getTax, getTotal, getItemCount } = useCartStore();
  
  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  const shipping = getShipping();
  const tax = getTax();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-6 rounded-full bg-gray-100 dark:bg-dark-elevated p-8 inline-flex">
            <ShoppingBag className="h-16 w-16 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Your cart is empty</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Looks like you haven&apos;t added any items to your cart yet. 
            Start exploring our products to find something you&apos;ll love.
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
        <h1 className="text-3xl font-bold mb-8">Shopping Cart ({itemCount})</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Link href="/products">
                <Button variant="ghost" leftIcon={<ArrowRight className="h-4 w-4 rotate-180" />}>
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:w-96">
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
