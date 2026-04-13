export const siteData = {
  name: 'Orinzo',
  tagline: 'Your premium destination for fashion, electronics, and lifestyle products.',
  description: 'Discover the best in fashion, electronics, and lifestyle products at Orinzo. Premium quality, competitive prices, and exceptional customer service.',
  year: new Date().getFullYear(),
  
  contact: {
    email: 'support@orinzo.com',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'United States',
    },
    formattedAddress: 'San Francisco, CA',
  },

  social: {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    youtube: '#',
  },

  links: {
    shop: [
      { name: 'All Products', href: '/products' },
      { name: 'New Arrivals', href: '/products?sort=newest' },
      { name: 'Best Sellers', href: '/products?sort=popular' },
      { name: 'Sale', href: '/products?sale=true' },
    ],
    categories: [
      { name: "Men's Fashion", href: '/products?category=mens-shirts' },
      { name: "Women's Fashion", href: '/products?category=womens-dresses' },
      { name: 'Electronics', href: '/products?category=smartphones' },
      { name: 'Home & Living', href: '/products?category=home-decoration' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQs', href: '/faq' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  },

  features: [
    {
      id: 'free-shipping',
      title: 'Free Shipping',
      description: 'On orders over $50',
      icon: 'Truck',
    },
    {
      id: 'secure-payment',
      title: 'Secure Payment',
      description: '100% secure checkout',
      icon: 'Shield',
    },
    {
      id: 'easy-returns',
      title: 'Easy Returns',
      description: '30-day return policy',
      icon: 'RefreshCw',
    },
    {
      id: 'support',
      title: '24/7 Support',
      description: 'Dedicated customer care',
      icon: 'Headphones',
    },
  ],

  whyUs: [
    {
      title: 'Premium Quality',
      description: 'Carefully curated products from trusted brands',
    },
    {
      title: 'Fast Shipping',
      description: 'Free delivery on orders over $50',
    },
    {
      title: 'Secure Payment',
      description: 'Your transactions are protected',
    },
    {
      title: 'Easy Returns',
      description: '30-day hassle-free return policy',
    },
  ],
} as const;

export type SiteData = typeof siteData;
