'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, ChevronRight, MapPin, CreditCard, Clock } from 'lucide-react';
import { useAuthStore } from '@/store';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import { formatPrice, formatDateShort } from '@/lib/utils';

const mockOrders = [
  {
    id: 'ORD-M4X7K9-N2P3Q5',
    items: [
      {
        product: {
          id: '1',
          title: 'Apple iPhone 15 Pro Max',
          image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&h=200&fit=crop',
          price: 999,
        },
        quantity: 1,
      },
      {
        product: {
          id: '2',
          title: 'AirPods Pro 2nd Gen',
          image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=200&h=200&fit=crop',
          price: 249,
        },
        quantity: 1,
      },
    ],
    total: 1298.87,
    status: 'delivered',
    createdAt: '2024-03-15T10:30:00Z',
  },
  {
    id: 'ORD-K8N2L4-M6P9R1',
    items: [
      {
        product: {
          id: '5',
          title: 'Nike Air Max 270',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
          price: 150,
        },
        quantity: 2,
      },
    ],
    total: 325.50,
    status: 'shipped',
    createdAt: '2024-03-10T14:20:00Z',
  },
];

const statusColors: Record<string, 'default' | 'success' | 'warning' | 'error' | 'secondary' | 'primary'> = {
  pending: 'warning',
  processing: 'secondary',
  shipped: 'secondary',
  delivered: 'success',
  cancelled: 'error',
};

export default function OrdersPage() {
  const { user } = useAuthStore();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-6 rounded-full bg-gray-100 dark:bg-dark-elevated p-8 inline-flex">
            <Package className="h-16 w-16 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Sign in to view orders</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Please sign in to see your order history.
          </p>
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {mockOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-6 rounded-full bg-gray-100 dark:bg-dark-elevated p-8 inline-flex">
              <Package className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold mb-3">No orders yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Start shopping to see your order history here.
            </p>
            <Link href="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-0">
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="w-full p-6 text-left"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className="font-mono font-semibold">{order.id}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {formatDateShort(order.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={statusColors[order.status]}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <p className="font-semibold">{formatPrice(order.total)}</p>
                        <ChevronRight
                          className={`h-5 w-5 text-gray-400 transition-transform ${
                            expandedOrder === order.id ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  {expandedOrder === order.id && (
                    <div className="border-t border-gray-200 dark:border-dark-border p-6 bg-gray-50 dark:bg-dark-elevated animate-fade-in">
                      <div className="space-y-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-white dark:bg-dark-surface">
                              <Image
                                src={item.product.image}
                                alt={item.product.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{item.product.title}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-semibold">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>Shipping to: San Francisco, CA</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CreditCard className="h-4 w-4 text-gray-400" />
                          <span>Paid with Credit Card</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
