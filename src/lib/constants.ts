export const API_DUMMYJSON = "https://dummyjson.com";
export const API_FAKESTORE = "https://fakestoreapi.com";
export const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const CATEGORY_CONFIG = {
  "mens-shirts": {
    name: "Men's Clothing",
    displayName: "Men's Shirts",
    apiSources: ["dummyjson"],
    apiCategories: ["mens-shirts"],
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop",
    fakestoreCategory: "men's clothing",
  },
  "mens-shoes": {
    name: "Men's Shoes",
    displayName: "Men's Shoes",
    apiSources: ["dummyjson"],
    apiCategories: ["mens-shoes"],
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    fakestoreCategory: null,
  },
  "mens-watches": {
    name: "Men's Watches",
    displayName: "Men's Watches",
    apiSources: ["dummyjson"],
    apiCategories: ["mens-watches"],
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop",
    fakestoreCategory: null,
  },
  "womens-dresses": {
    name: "Women's Dresses",
    displayName: "Women's Dresses",
    apiSources: ["dummyjson"],
    apiCategories: ["womens-dresses"],
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop",
    fakestoreCategory: "women's clothing",
  },
  "womens-shoes": {
    name: "Women's Shoes",
    displayName: "Women's Shoes",
    apiSources: ["dummyjson"],
    apiCategories: ["womens-shoes"],
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop",
    fakestoreCategory: null,
  },
  "womens-watches": {
    name: "Women's Watches",
    displayName: "Women's Watches",
    apiSources: ["dummyjson"],
    apiCategories: ["womens-watches"],
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop",
    fakestoreCategory: null,
  },
  "womens-bags": {
    name: "Women's Bags",
    displayName: "Women's Bags",
    apiSources: ["dummyjson"],
    apiCategories: ["womens-bags"],
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
    fakestoreCategory: null,
  },
  "womens-jewellery": {
    name: "Jewelry",
    displayName: "Jewelry",
    apiSources: ["dummyjson"],
    apiCategories: ["womens-jewellery"],
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
    fakestoreCategory: null,
  },
  smartphones: {
    name: "Smartphones",
    displayName: "Smartphones",
    apiSources: ["dummyjson"],
    apiCategories: ["smartphones"],
    image:
      "https://images.unsplash.com/photo-1511707171634-5f2ff1b6d790?w=400&h=300&fit=crop",
    fakestoreCategory: "electronics",
  },
  laptops: {
    name: "Laptops",
    displayName: "Laptops & Computers",
    apiSources: ["dummyjson"],
    apiCategories: ["laptops"],
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    fakestoreCategory: "electronics",
  },
  skincare: {
    name: "Skincare",
    displayName: "Skincare",
    apiSources: ["dummyjson"],
    apiCategories: ["skincare"],
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
    fakestoreCategory: null,
  },
  fragrances: {
    name: "Fragrances",
    displayName: "Fragrances",
    apiSources: ["dummyjson"],
    apiCategories: ["fragrances"],
    image:
      "https://images.unsplash.com/photo-1541647280916-45aceca3239b?w=400&h=300&fit=crop",
    fakestoreCategory: null,
  },
  "home-decoration": {
    name: "Home Decor",
    displayName: "Home Decoration",
    apiSources: ["dummyjson"],
    apiCategories: ["home-decoration"],
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    fakestoreCategory: "home decoration",
  },
  furniture: {
    name: "Furniture",
    displayName: "Furniture",
    apiSources: ["dummyjson"],
    apiCategories: ["furniture"],
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    fakestoreCategory: "home decoration",
  },
  lighting: {
    name: "Lighting",
    displayName: "Lighting",
    apiSources: ["dummyjson"],
    apiCategories: ["lighting"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    fakestoreCategory: null,
  },
  sunglasses: {
    name: "Sunglasses",
    displayName: "Sunglasses",
    apiSources: ["dummyjson"],
    apiCategories: ["sunglasses"],
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop",
    fakestoreCategory: null,
  },
  automotive: {
    name: "Automotive",
    displayName: "Automotive",
    apiSources: ["dummyjson"],
    apiCategories: ["automotive"],
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop",
    fakestoreCategory: null,
  },
  motorcycle: {
    name: "Motorcycle",
    displayName: "Motorcycle",
    apiSources: ["dummyjson"],
    apiCategories: ["motorcycle"],
    image:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&h=300&fit=crop",
    fakestoreCategory: null,
  },
  groceries: {
    name: "Groceries",
    displayName: "Groceries",
    apiSources: ["dummyjson"],
    apiCategories: ["groceries"],
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
    fakestoreCategory: null,
  },
  tops: {
    name: "Tops",
    displayName: "Tops & T-Shirts",
    apiSources: ["dummyjson"],
    apiCategories: ["tops"],
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop",
    fakestoreCategory: null,
  },
};

export const NAVIGATION_CATEGORIES = [
  {
    id: "mens",
    name: "Men's",
    slug: "mens-shirts",
    children: ["mens-shirts", "mens-shoes", "mens-watches"],
  },
  {
    id: "womens",
    name: "Women's",
    slug: "womens-dresses",
    children: [
      "womens-dresses",
      "womens-shoes",
      "womens-watches",
      "womens-bags",
      "womens-jewellery",
    ],
  },
  {
    id: "electronics",
    name: "Electronics",
    slug: "smartphones",
    children: ["smartphones", "laptops"],
  },
  {
    id: "beauty",
    name: "Beauty",
    slug: "skincare",
    children: ["skincare", "fragrances"],
  },
  {
    id: "home",
    name: "Home & Living",
    slug: "home-decoration",
    children: ["home-decoration", "furniture", "lighting"],
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "sunglasses",
    children: ["sunglasses", "womens-watches", "mens-watches"],
  },
];

export const CATEGORIES = Object.entries(CATEGORY_CONFIG).map(
  ([slug, config]) => ({
    id: slug,
    slug,
    name: config.displayName,
    image: config.image,
  }),
);

export const HERO_SLIDES = [
  {
    id: 1,
    title: "Summer Collection 2026",
    subtitle: "Discover the latest trends in fashion",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=800&fit=crop",
    cta: "Shop Now",
    link: "/products",
  },
  {
    id: 2,
    title: "Premium Electronics",
    subtitle: "Upgrade your tech game with the latest gadgets",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1600&h=800&fit=crop",
    cta: "Explore",
    link: "/products?category=smartphones",
  },
  {
    id: 3,
    title: "Home Makeover",
    subtitle: "Transform your living space with style",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&h=800&fit=crop",
    cta: "Discover",
    link: "/products?category=home-decoration",
  },
];

export const FEATURED_BANNERS = [
  {
    id: 1,
    title: "Free Shipping",
    description: "On orders over $50",
    icon: "Truck",
  },
  {
    id: 2,
    title: "Secure Payment",
    description: "100% secure checkout",
    icon: "Shield",
  },
  {
    id: 3,
    title: "Easy Returns",
    description: "30-day return policy",
    icon: "RefreshCw",
  },
  {
    id: 4,
    title: "24/7 Support",
    description: "Dedicated customer care",
    icon: "Headphones",
  },
];

export const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export const PRICE_RANGES = [
  { min: 0, max: 25, label: "Under $25" },
  { min: 25, max: 50, label: "$25 - $50" },
  { min: 50, max: 100, label: "$50 - $100" },
  { min: 100, max: 200, label: "$100 - $200" },
  { min: 200, max: Infinity, label: "Over $200" },
];

export const RATING_OPTIONS = [
  { value: 4, label: "4 & Up" },
  { value: 3, label: "3 & Up" },
  { value: 2, label: "2 & Up" },
];

export const SITE_NAME = "Orinzo";
export const SITE_DESCRIPTION =
  "Your premium destination for fashion, electronics, and lifestyle products.";

export function getCategoryConfig(slug: string) {
  return CATEGORY_CONFIG[slug as keyof typeof CATEGORY_CONFIG] || null;
}

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getNavigationCategory(slug: string) {
  return NAVIGATION_CATEGORIES.find(
    (c) => c.slug === slug || c.children.includes(slug),
  );
}

export function normalizeCategoryName(name: string): string {
  return name
    .toLowerCase()
    .replace(/['\s]/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function matchesCategory(
  productCategory: string,
  targetSlug: string,
): boolean {
  const config = CATEGORY_CONFIG[targetSlug as keyof typeof CATEGORY_CONFIG];
  if (!config) return false;

  const normalizedProduct = normalizeCategoryName(productCategory);
  const targetNormalized = normalizeCategoryName(targetSlug);

  if (normalizedProduct === targetNormalized) return true;

  if (config.apiCategories) {
    return config.apiCategories.some(
      (cat) => normalizeCategoryName(cat) === normalizedProduct,
    );
  }

  return false;
}
