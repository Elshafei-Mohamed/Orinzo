'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Check } from 'lucide-react';
import { useCartStore } from '@/store';
import { ShippingForm, PaymentForm, CheckoutSteps } from '@/components/checkout';
import { Button, Card, CardContent } from '@/components/ui';
import { formatPrice } from '@/lib/utils';

type CheckoutStep = 'shipping' | 'payment' | 'review';

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getShipping, getTax, getTotal, clearCart } = useCartStore();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const tax = getTax();
  const total = getTotal();

  const handleShippingSubmit = (data: ShippingAddress) => {
    setShippingAddress(data);
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setCurrentStep('review');
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearCart();
    setIsProcessing(false);
    router.push('/checkout/success');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Add items to your cart before checking out.
          </p>
          <Link href="/products">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  const stepIndex = currentStep === 'shipping' ? 0 : currentStep === 'payment' ? 1 : 2;

  return (
    <div className="min-h-screen py-8 bg-background-alt dark:bg-dark-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <CheckoutSteps currentStep={stepIndex} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 'shipping' && (
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white text-sm font-bold">
                      1
                    </span>
                    Shipping Address
                  </h2>
                  <ShippingForm onSubmit={handleShippingSubmit} defaultValues={shippingAddress ?? undefined} />
                </CardContent>
              </Card>
            )}

            {currentStep === 'payment' && (
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white text-sm font-bold">
                      2
                    </span>
                    Payment Method
                  </h2>
                  <PaymentForm onSubmit={handlePaymentSubmit} isProcessing={isProcessing} />
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep('shipping')}
                    >
                      Back to Shipping
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 'review' && (
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6 sm:p-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Check className="h-5 w-5 text-success" />
                      Review Your Order
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Shipping Address
                        </h3>
                        <p>
                          {shippingAddress?.firstName} {shippingAddress?.lastName}
                        </p>
                        <p>{shippingAddress?.street}</p>
                        {shippingAddress?.apartment && <p>{shippingAddress?.apartment}</p>}
                        <p>
                          {shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.zipCode}
                        </p>
                        <p>{shippingAddress?.country}</p>
                        <p>{shippingAddress?.phone}</p>
                      </div>

                      <div>
                        <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Payment Method
                        </h3>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>Credit Card ending in 4242</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="font-semibold mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex gap-4">
                          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-dark-elevated">
                            <Image
                              src={item.product.image}
                              alt={item.product.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium line-clamp-1">{item.product.title}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep('payment')}
                    disabled={isProcessing}
                  >
                    Back to Payment
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    isLoading={isProcessing}
                    className="flex-1"
                  >
                    Place Order - {formatPrice(total)}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Items ({items.length})</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span className={shipping === 0 ? 'text-success' : ''}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-dark-border pt-3 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
