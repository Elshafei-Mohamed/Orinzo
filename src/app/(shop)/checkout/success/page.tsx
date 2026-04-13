'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CheckCircle, Package, Home } from 'lucide-react';
import { Button, Card, CardContent } from '@/components/ui';
import { generateOrderId } from '@/lib/utils';

export default function CheckoutSuccessPage() {
  const [estimatedDelivery] = useState(() => {
    const date = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  });
  
  const orderId = generateOrderId();

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-6 text-left">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Order Number</p>
                <p className="font-mono font-semibold">{orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Estimated Delivery</p>
                <p className="font-semibold">{estimatedDelivery}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Shipping Method</p>
                <p className="font-semibold">Standard Delivery</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</p>
                <p className="inline-flex items-center gap-1 font-semibold text-success">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                  </span>
                  Processing
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-accent/10 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Package className="h-6 w-6 text-accent" />
            <h3 className="font-semibold">What&apos;s Next?</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You&apos;ll receive an email confirmation shortly. We&apos;ll notify you when your order ships.
          </p>
          {estimatedDelivery && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Estimated delivery: {estimatedDelivery}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/orders">
            <Button variant="outline" leftIcon={<Package className="h-4 w-4" />}>
              View Orders
            </Button>
          </Link>
          <Link href="/">
            <Button leftIcon={<Home className="h-4 w-4" />}>
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
