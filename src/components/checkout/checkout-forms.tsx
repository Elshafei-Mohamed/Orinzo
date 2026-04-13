'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreditCard, Truck, Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, Input, Select } from '@/components/ui';

const addressSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  street: z.string().min(1, 'Street address is required'),
  apartment: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  country: z.string().min(1, 'Country is required'),
});

type AddressFormData = z.infer<typeof addressSchema>;

const steps = [
  { id: 'shipping', label: 'Shipping', icon: Truck },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'review', label: 'Review', icon: Check },
];

interface ShippingFormProps {
  onSubmit: (data: AddressFormData) => void;
  defaultValues?: Partial<AddressFormData>;
}

export function ShippingForm({ onSubmit, defaultValues }: ShippingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="First Name"
          {...register('firstName')}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name"
          {...register('lastName')}
          error={errors.lastName?.message}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Phone"
          type="tel"
          {...register('phone')}
          error={errors.phone?.message}
        />
      </div>

      <Input
        label="Street Address"
        {...register('street')}
        error={errors.street?.message}
      />

      <Input
        label="Apartment, suite, etc. (optional)"
        {...register('apartment')}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Input
          label="City"
          {...register('city')}
          error={errors.city?.message}
        />
        <Input
          label="State"
          {...register('state')}
          error={errors.state?.message}
        />
        <Input
          label="ZIP Code"
          {...register('zipCode')}
          error={errors.zipCode?.message}
        />
      </div>

      <Select
        label="Country"
        options={[
          { value: 'us', label: 'United States' },
          { value: 'ca', label: 'Canada' },
          { value: 'uk', label: 'United Kingdom' },
        ]}
        {...register('country')}
        error={errors.country?.message}
      />

      <Button type="submit" className="w-full">
        Continue to Payment
      </Button>
    </form>
  );
}

interface CheckoutStepsProps {
  currentStep: number;
}

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full transition-colors',
                isCompleted && 'bg-[var(--success)] text-white',
                isCurrent && 'bg-[var(--accent)] text-white',
                !isCompleted && !isCurrent && 'bg-[var(--muted)] text-[var(--muted-foreground)]'
              )}
            >
              {isCompleted ? (
                <Check className="h-4 w-4" />
              ) : (
                <Icon className="h-4 w-4" />
              )}
              <span className="text-sm font-medium hidden sm:block">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <ChevronRight className="h-4 w-4 mx-2 text-[var(--muted-foreground)]" />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface PaymentFormProps {
  onSubmit: (data: { cardNumber: string; expiry: string; cvc: string; name: string }) => void;
  isProcessing?: boolean;
}

export function PaymentForm({ onSubmit, isProcessing }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ cardNumber, expiry, cvc, name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Cardholder Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="John Doe"
        required
      />

      <Input
        label="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
        placeholder="4242 4242 4242 4242"
        maxLength={19}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Expiry Date"
          value={expiry}
          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
          placeholder="MM/YY"
          maxLength={5}
          required
        />
        <Input
          label="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
          placeholder="123"
          maxLength={4}
          required
        />
      </div>

      <div className="p-4 bg-[var(--muted)] rounded-lg">
        <p className="text-sm text-[var(--muted-foreground)]">
          For testing, use card number: 4242 4242 4242 4242, any future date, and any CVC.
        </p>
      </div>

      <Button type="submit" className="w-full" isLoading={isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  );
}
