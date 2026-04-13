# Orinzo - Premium E-Commerce Platform

A production-ready e-commerce web application built with modern web technologies. Orinzo delivers a sophisticated shopping experience with an elegant interface, robust product discovery, real-time cart management, and a seamless checkout flow.

## Project Overview

Orinzo is a full-featured e-commerce platform designed to demonstrate enterprise-level web development practices. The application aggregates multiple mock APIs to create a diverse product catalog spanning fashion, electronics, home goods, beauty, and accessories—with thousands of products across 20+ categories.

### Core Capabilities

- Browse products from 20+ categories with infinite scroll pagination
- Advanced filtering by category, price range, and customer rating
- Real-time search with autocomplete suggestions
- Add items to cart with quantity management
- Save favorites to wishlist for later purchase
- Complete multi-step checkout flow with order confirmation
- User authentication with secure form validation
- Dark/Light theme switching with system preference detection
- Fully responsive design optimized for mobile, tablet, and desktop

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Runtime | React 19 |
| Styling | Tailwind CSS v4 |
| State Management | Zustand |
| Server State | TanStack Query (React Query) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Payments | Stripe (test mode integration) |
| APIs | DummyJSON, FakeStoreAPI |

## Features

### Product Experience

- **Product Catalog** - Browse products with pagination and infinite scroll
- **Advanced Filtering** - Filter by category, price range, and customer rating
- **Sorting Options** - Sort by popularity, price (low/high), rating, and newest
- **Product Details** - Image gallery, full descriptions, stock availability, pricing with discount calculations
- **Related Products** - Suggested similar items on product detail pages
- **Search** - Real-time product search across all categories

### Shopping Cart

- **Persistent Cart** - Cart state persists across sessions using localStorage
- **Quantity Controls** - Increment/decrement product quantities
- **Price Breakdown** - Subtotal, shipping calculation, tax estimates, and grand total
- **Free Shipping Progress** - Visual indicator showing amount needed for free shipping
- **Quick Actions** - One-click item removal, direct checkout

### Checkout Flow

- **Multi-Step Process** - Shipping → Payment → Review → Confirmation
- **Address Collection** - Complete shipping address with validation
- **Payment Integration** - Stripe-ready payment form with card validation
- **Order Summary** - Review all items before final purchase
- **Confirmation Page** - Order number, estimated delivery, next steps

### User Features

- **Authentication** - Login and registration with email/password
- **Wishlist** - Save products for future purchase
- **Order History** - View past orders and their status (pending, processing, shipped, delivered)
- **Address Management** - Save and manage multiple shipping addresses
- **Form Validation** - Real-time validation with helpful error messages

### UI/UX Design

- **Responsive Layout** - Optimized for mobile, tablet, and desktop (320px to 2560px+)
- **Theme Toggle** - Dark mode and light mode with system preference detection
- **Mega Menu** - Category navigation with hover states and subcategory dropdowns
- **Loading States** - Skeleton loaders for async content
- **Splash Screen** - Branded loading animation on first visit
- **Full-Screen Hero** - Immersive hero section with dynamic slides
- **Toast Notifications** - User feedback for actions
- **Smooth Animations** - Subtle transitions and hover effects throughout

## System Architecture

### Directory Structure

```
src/
├── app/                         # Next.js App Router
│   ├── (auth)/                 # Authentication routes
│   │   ├── login/              # Login page
│   │   └── register/           # Registration page
│   ├── (shop)/                 # E-commerce routes
│   │   ├── products/           # Product listing & details
│   │   ├── category/           # Category pages
│   │   ├── cart/               # Shopping cart page
│   │   ├── checkout/           # Checkout flow
│   │   ├── wishlist/           # Saved items
│   │   └── orders/             # Order history
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── providers.tsx           # React providers
├── components/
│   ├── ui/                     # Reusable UI primitives
│   │   ├── button.tsx          # Button component with variants
│   │   ├── input.tsx           # Input component
│   │   ├── badge.tsx           # Badge/label component
│   │   ├── card.tsx            # Card container
│   │   ├── modal.tsx           # Modal dialog
│   │   ├── skeleton.tsx        # Loading skeletons
│   │   ├── rating.tsx         # Star rating display
│   │   ├── select.tsx         # Dropdown select
│   │   └── toast.tsx           # Toast notifications
│   ├── layout/                 # Layout components
│   │   ├── navbar.tsx          # Navigation bar
│   │   ├── footer.tsx          # Site footer
│   │   ├── mega-menu.tsx       # Category mega menu
│   │   ├── mini-cart.tsx       # Slide-out cart
│   │   └── splash-screen.tsx  # Loading splash
│   ├── product/                # Product components
│   │   ├── product-card.tsx   # Product display card
│   │   ├── product-grid.tsx   # Product grid layout
│   │   └── product-filters.tsx # Filter sidebar
│   ├── cart/                  # Cart components
│   │   └── cart-item.tsx      # Cart item row
│   ├── checkout/              # Checkout components
│   │   └── checkout-forms.tsx # Multi-step forms
│   └── auth/                  # Authentication components
│       └── auth-forms.tsx     # Login/register forms
├── hooks/                     # Custom React hooks
│   ├── use-products.ts        # Product data fetching
│   └── use-utils.ts           # Utility hooks
├── lib/                       # Utilities and constants
│   ├── constants.ts           # App-wide constants
│   └── utils.ts               # Helper functions
├── services/                  # API integration
│   └── api.ts                # Multi-API service layer
├── store/                     # Zustand stores
│   ├── cart-store.ts         # Cart state management
│   ├── auth-store.ts         # Authentication state
│   ├── wishlist-store.ts     # Wishlist state
│   ├── theme-store.ts        # Theme preferences
│   └── recently-viewed-store.ts
├── types/                     # TypeScript definitions
│   └── index.ts              # All type interfaces
└── data/                      # Static configuration
    └── siteData.ts           # Site metadata
```

### Architecture Decisions

**App Router (Next.js 16)** - Server components reduce client bundle size while maintaining interactive features. The route group pattern separates authentication from shop pages for clean URL structure.

**TanStack Query** - Handles server state with intelligent caching (5-minute stale time), background refetching, and placeholder data during loading. Query invalidation ensures data freshness.

**Zustand** - Lightweight, TypeScript-friendly state management for client stores. Persisted middleware saves cart and preferences to localStorage automatically.

**Tailwind CSS v4** - Utility-first styling with CSS variables for the design system. Custom properties enable consistent theming and smooth dark mode transitions.

**Component Composition** - Each component is self-contained with isolated concerns. Props drilling is minimized through store access and context providers.

### Branding Design System

The platform uses a distinctive gold and purple color palette:

```css
:root {
  --logo-gold-light: #F8CB63;
  --logo-gold-mid: #D48D3B;
  --logo-gold-dark: #6B431C;
  
  --logo-purple-bright: #B34BFF;
  --logo-purple-mid: #6032E6;
  --logo-blue-deep: #1D34C3;
}
```

- **Primary Accent**: Purple gradient (`#B34BFF` → `#6032E6` → `#1D34C3`)
- **Secondary Accent**: Gold gradient for special CTAs
- **Rating Color**: Gold star (`#F8CB63`)

## API Integration

The platform aggregates data from two primary free mock APIs:

| API | Purpose | Coverage |
|-----|---------|----------|
| [DummyJSON](https://dummyjson.com) | Products, Categories | 100+ products per category |
| [FakeStoreAPI](https://fakestoreapi.com) | Fashion, Electronics | 20 products |

### Category Configuration

The system normalizes data from both APIs through a unified `CATEGORY_CONFIG` mapping:

- Men's: Shirts, Shoes, Watches
- Women's: Dresses, Shoes, Watches, Bags, Jewelry
- Electronics: Smartphones, Laptops
- Beauty: Skincare, Fragrances
- Home: Decor, Furniture, Lighting

### Caching Strategy

- **In-Memory Cache**: 60-second TTL for API responses
- **Fallback**: Return cached data on network failure
- **Timeout**: 10-second abort signal to prevent hanging requests

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Orinzo

# Install dependencies
npm install

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
# Stripe Configuration (optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

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

## Performance Optimizations

- **React Query Caching**: 5-minute stale time reduces API calls
- **Image Optimization**: Next.js Image component with lazy loading
- **Skeleton Loaders**: Perceived performance improvement during loading
- **Code Splitting**: Automatic route-based code splitting
- **Persistent State**: Cart and preferences saved to localStorage

## Deployment

Deploy to any platform supporting Node.js applications:

1. Push to GitHub
2. Import project on your hosting provider
3. Run `npm run build`
4. Start with `npm run start`

Recommended: Vercel, Netlify, or Railway

## License

MIT License - feel free to use this project for learning or as a foundation for your own e-commerce applications.

---

## 👨‍💻 Developer

This project was fully designed and developed by:

**Elshafei**

Portfolio: https://elshafei-mohamed-portfolio.netlify.app