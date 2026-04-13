# Orinzo - Premium E-Commerce Platform

A production-ready e-commerce web application built with Next.js 15, TypeScript, Tailwind CSS v4, and modern React patterns.

## Features

### Core Functionality

- **Home Page** - Hero carousel, featured products, category grid, deal banners
- **Product Listing** - Grid view with filters (category, price, rating), sorting, pagination
- **Product Details** - Image gallery, quantity selector, add to cart, related products
- **Shopping Cart** - Full CRUD operations, quantity updates, price calculations
- **Checkout Flow** - Multi-step (Shipping → Payment → Review → Confirmation)
- **Authentication** - Login/Register with form validation
- **Wishlist** - Save products for later
- **Order History** - View past orders with status

### UI/UX

- Mobile-first responsive design
- Dark mode support (toggle in navbar)
- Amazon-inspired navigation with mega menu
- Smooth animations and transitions
- Skeleton loaders for async content
- Toast notifications for user feedback

### Technical Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Server State**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Payments**: Stripe-ready (test mode)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Orinzo
```

2. Install dependencies:

```bash
npm install
```

3. Copy environment variables:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── (shop)/            # Shop routes
│   │   ├── products/
│   │   ├── category/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── wishlist/
│   │   └── orders/
│   └── api/               # API routes
├── components/
│   ├── ui/                # Base UI components
│   ├── layout/            # Layout components
│   ├── product/           # Product-specific components
│   ├── cart/              # Cart components
│   ├── checkout/          # Checkout components
│   └── auth/              # Auth components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and constants
├── services/              # API service functions
├── store/                 # Zustand stores
└── types/                 # TypeScript types
```

## API Integration

The application uses [DummyJSON](https://dummyjson.com) for mock product data:

- Products: `GET /products`
- Categories: `GET /products/categories`
- Search: `GET /products/search?q={query}`

## Demo Credentials

For testing, use these credentials:

- **Email**: demo@Orinzo.com
- **Password**: any 6+ characters

## Payment Testing

The checkout includes Stripe payment form. For testing:

- Card Number: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

## Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Start production server
npm run start

# Lint
npm run lint
```

## Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://dummyjson.com

# Stripe Configuration (optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Deployment

This project is optimized for deployment on Vercel:

1. Push to GitHub
2. Import project on Vercel
3. Configure environment variables
4. Deploy

## License

MIT License
