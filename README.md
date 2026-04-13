# Orinzo - Premium E-Commerce Platform

A full-featured, production-ready e-commerce web application built with modern web technologies. Orinzo delivers a seamless shopping experience with a sleek Amazon-inspired interface, robust product filtering, real-time cart management, and a complete checkout flow.

## Project Overview

Orinzo is a comprehensive e-commerce platform designed to showcase modern web development best practices. The application integrates multiple mock APIs to simulate a realistic shopping environment with thousands of products across diverse categories.

### Core Capabilities

- Browse and search products from multiple categories
- Filter by price, rating, and category
- Add items to cart with quantity management
- Save favorites to wishlist
- Complete checkout flow with order confirmation
- User authentication with secure form validation
- Dark/Light theme switching
- Fully responsive design for all devices

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| State Management | Zustand |
| Server State | TanStack Query (React Query) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Payments | Stripe (test mode) |
| APIs | DummyJSON, FakeStoreAPI, Escuelajs, RandomDataAPI |

## Features

### Product Experience

- **Product Catalog** - Browse thousands of products with infinite scroll pagination
- **Advanced Filtering** - Filter by category, price range, and customer rating
- **Sorting Options** - Sort by popularity, price (low/high), rating, and newest
- **Product Details** - Image gallery, full descriptions, stock availability, pricing with discounts
- **Related Products** - AI-suggested similar items on product pages
- **Search** - Real-time product search across all categories

### Shopping Cart

- **Persistent Cart** - Cart state persists across sessions
- **Quantity Controls** - Easy increment/decrement product quantities
- **Price Breakdown** - Subtotal, shipping calculation, tax estimates, and total
- **Free Shipping Indicator** - Progress bar showing amount needed for free shipping
- **Quick Remove** - One-click item removal

### Checkout Flow

- **Multi-Step Process** - Shipping → Payment → Review → Confirmation
- **Address Form** - Complete shipping address collection with validation
- **Payment Integration** - Stripe-ready payment form with card validation
- **Order Summary** - Review all items before final purchase
- **Confirmation Page** - Order number, estimated delivery, next steps

### User Features

- **Authentication** - Login and registration with email/password
- **Wishlist** - Save products for future purchase
- **Order History** - View past orders and their status
- **Form Validation** - Real-time validation with helpful error messages

### UI/UX Design

- **Responsive Layout** - Optimized for mobile, tablet, and desktop
- **Theme Toggle** - Dark mode and light mode with system preference detection
- **Mega Menu** - Amazon-style category navigation with hover states
- **Loading States** - Skeleton loaders for async content
- **Notifications** - Toast messages for user actions
- **Smooth Animations** - Subtle transitions and hover effects

## Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (shop)/            # E-commerce pages
│   │   ├── products/      # Product listing & details
│   │   ├── category/      # Category pages
│   │   ├── cart/          # Shopping cart
│   │   ├── checkout/      # Checkout flow
│   │   ├── wishlist/      # Saved items
│   │   └── orders/        # Order history
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Reusable UI primitives (Button, Input, Card, etc.)
│   ├── layout/            # Layout components (Navbar, Footer, MegaMenu)
│   ├── product/           # Product-specific components
│   ├── cart/              # Cart components
│   ├── checkout/          # Checkout form components
│   └── auth/              # Authentication forms
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and constants
├── services/               # API integration layer
├── store/                  # Zustand state stores
├── types/                  # TypeScript type definitions
└── data/                   # Static site configuration
```

### Why This Architecture?

**App Router** - Next.js 15's App Router provides server components, improved performance, and cleaner routing patterns.

**TanStack Query** - Handles server state management with automatic caching, background refetching, and optimistic updates.

**Zustand** - Lightweight state management for client-side stores (cart, wishlist, auth) with excellent TypeScript support.

**Tailwind CSS v4** - Utility-first approach enables rapid UI development with CSS variables for theming.

**Component Isolation** - Each component is self-contained with its own logic and styling, making the codebase maintainable and scalable.

## APIs Integration

The platform aggregates data from multiple free mock APIs to create a diverse product catalog:

### Primary APIs

| API | Purpose | Data Type |
|-----|---------|-----------|
| [DummyJSON](https://dummyjson.com) | Products, Categories, Users, Carts | 100+ products per category |
| [FakeStoreAPI](https://fakestoreapi.com) | Fashion products | Clothing, electronics |
| [Escuelajs](https://api.escuelajs.co) | Additional products | Shoes, accessories |
| [RandomDataAPI](https://random-data-api.com) | User profiles, addresses | Mock user data |

### Category Coverage

- Electronics (smartphones, laptops, tablets, accessories)
- Fashion (men's/women's clothing, shoes, jewelry)
- Home & Kitchen (furniture, decor, tools)
- Beauty & Cosmetics (skincare, fragrances)
- Sports & Fitness (equipment, athletic wear)
- Groceries (food items, household supplies)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Orinzo

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm run start
```

## Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://dummyjson.com

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

See `.env.example` for complete API endpoint configuration.

## Testing

### Demo Credentials

```
Email: demo@Orinzo.com
Password: any 6+ characters
```

### Stripe Test Card

```
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix linting issues |

## Deployment

Orinzo is optimized for deployment on Netlify:

1. Push to GitHub
2. Import project on [Netlify](https://orinzo.netlify.com)
3. Configure environment variables
4. Deploy

Alternatively, deploy to any platform supporting Node.js applications.

## License

MIT License - feel free to use this project for learning or as a foundation for your own e-commerce applications.
