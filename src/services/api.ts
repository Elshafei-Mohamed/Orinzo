import {
  Product,
  Category,
  PaginatedResponse,
  SearchFilters,
  User,
  Order,
  CartItem,
} from "@/types";
import {
  API_DUMMYJSON,
  API_FAKESTORE,
  CATEGORY_CONFIG,
  matchesCategory,
} from "@/lib/constants";

const DUMMYJSON_BASE = API_DUMMYJSON;
const FAKESTORE_BASE = API_FAKESTORE;

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function deterministicRandom(seed: number, min: number, max: number): number {
  return Math.floor(((seed % 1000) / 1000) * (max - min + 1)) + min;
}

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 60 * 1000;

async function fetchWithCache<T>(url: string, ttl = CACHE_TTL): Promise<T | null> {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data as T;
  }

  try {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      if (cached) {
        console.warn(`Fetch failed for ${url}, using cached data`);
        return cached.data as T;
      }
      return null;
    }
    const data = await response.json() as T;
    cache.set(url, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.warn(`Fetch failed for ${url}:`, error);
    if (cached) {
      return cached.data as T;
    }
    return null;
  }
}

interface DummyJsonProduct {
  id: number;
  title: string;
  description?: string;
  price: number;
  discountPercentage?: number;
  thumbnail?: string;
  images?: string[];
  category: string;
  brand?: string;
  rating?: number;
  stock?: number;
  tags?: string[];
  createdAt?: string;
}

interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description?: string;
  image: string;
  category: string;
  rating?: { rate: number; count: number };
}

interface DummyJsonCategoryResponse {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
}

function transformDummyJsonProduct(p: DummyJsonProduct): Product {
  const originalPrice = p.discountPercentage
    ? Math.round(p.price / (1 - p.discountPercentage / 100))
    : undefined;

  const image = p.thumbnail || p.images?.[0] || "/placeholder.png";
  const seed = hashCode(String(p.id));

  return {
    id: `dj-${p.id}`,
    title: p.title,
    description: p.description || "",
    price: p.price,
    originalPrice,
    image,
    images: p.images && p.images.length > 0 ? p.images : [image],
    category: p.category,
    brand: p.brand,
    rating: p.rating || 4,
    reviewCount: deterministicRandom(seed, 50, 550),
    inStock: (p.stock || 0) > 0,
    stockCount: p.stock || 10,
    tags: p.tags,
    createdAt: p.createdAt,
  };
}

function transformFakeStoreProduct(p: FakeStoreProduct): Product {
  const seed = hashCode(String(p.id));

  return {
    id: `fs-${p.id}`,
    title: p.title,
    description: p.description || "",
    price: p.price,
    originalPrice: undefined,
    image: p.image,
    images: [p.image],
    category: mapFakeStoreCategory(p.category),
    brand: undefined,
    rating: 3.5 + deterministicRandom(seed, 0, 150) / 100,
    reviewCount: deterministicRandom(seed + 1, 10, 210),
    inStock: true,
    stockCount: deterministicRandom(seed + 2, 5, 55),
    tags: [],
    createdAt: new Date().toISOString(),
  };
}

function mapFakeStoreCategory(category: string): string {
  const categoryLower = category.toLowerCase();

  if (categoryLower === "men's clothing") return "mens-shirts";
  if (categoryLower === "women's clothing") return "womens-dresses";
  if (categoryLower === "electronics") return "smartphones";
  if (categoryLower === "jewelery") return "womens-jewellery";
  if (categoryLower === "home decoration") return "home-decoration";

  return categoryLower;
}

function applyFiltersAndSort(
  products: Product[],
  filters?: SearchFilters,
): Product[] {
  let result = [...products];

  if (filters?.query) {
    const query = filters.query.toLowerCase().trim();
    if (query) {
      result = result.filter((p) => {
        const searchFields = [
          p.id.toLowerCase(),
          p.title.toLowerCase(),
          p.description.toLowerCase(),
          p.category.toLowerCase(),
          p.brand?.toLowerCase() || '',
          ...(p.tags || []),
        ];
        return searchFields.some(field => field.includes(query));
      });
    }
  }

  if (filters?.category) {
    result = result.filter((p) => {
      const productCategory = p.category.toLowerCase().replace(/['\s]/g, "-");
      return matchesCategory(productCategory, filters.category!);
    });
  }

  if (filters?.minPrice) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters?.maxPrice) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters?.minRating) {
    result = result.filter((p) => p.rating >= filters.minRating!);
  }

  if (filters?.sortBy === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (filters?.sortBy === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  } else if (filters?.sortBy === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  } else if (filters?.sortBy === "newest") {
    result.sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeB - timeA;
    });
  }

  return result;
}

class MultiApiService {
  async getProducts(
    limit = 20,
    skip = 0,
    filters?: SearchFilters,
  ): Promise<PaginatedResponse<Product>> {
    const allProducts: Product[] = [];
    const seenIds = new Set<string>();

    if (filters?.category) {
      const config =
        CATEGORY_CONFIG[filters.category as keyof typeof CATEGORY_CONFIG];

      if (config?.apiSources?.includes("dummyjson") && config.apiCategories) {
        const fetchPromises = config.apiCategories.map(async (apiCat) => {
          const data = await fetchWithCache<DummyJsonCategoryResponse>(
            `${DUMMYJSON_BASE}/products/category/${apiCat}?limit=100`,
          );
          return data?.products || [];
        });
        const results = await Promise.all(fetchPromises);
        results.flat().forEach((p: DummyJsonProduct) => {
          if (!seenIds.has(`dj-${p.id}`)) {
            seenIds.add(`dj-${p.id}`);
            allProducts.push(transformDummyJsonProduct(p));
          }
        });
      }

      if (config?.fakestoreCategory) {
        const data = await fetchWithCache<FakeStoreProduct[]>(
          `${FAKESTORE_BASE}/products/category/${encodeURIComponent(config.fakestoreCategory)}`,
        );
        if (data) {
          data.forEach((p) => {
            const mappedCat = mapFakeStoreCategory(p.category);
            if (
              matchesCategory(mappedCat, filters.category!) &&
              !seenIds.has(`fs-${p.id}`)
            ) {
              seenIds.add(`fs-${p.id}`);
              allProducts.push(transformFakeStoreProduct(p));
            }
          });
        }
      }
    } else {
      const [djData, fsData] = await Promise.all([
        fetchWithCache<{ products: DummyJsonProduct[] }>(`${DUMMYJSON_BASE}/products?limit=100`),
        fetchWithCache<FakeStoreProduct[]>(`${FAKESTORE_BASE}/products`),
      ]);

      if (djData?.products) {
        djData.products.forEach((p) => {
          if (!seenIds.has(`dj-${p.id}`)) {
            seenIds.add(`dj-${p.id}`);
            allProducts.push(transformDummyJsonProduct(p));
          }
        });
      }

      if (fsData) {
        fsData.forEach((p) => {
          if (!seenIds.has(`fs-${p.id}`)) {
            seenIds.add(`fs-${p.id}`);
            allProducts.push(transformFakeStoreProduct(p));
          }
        });
      }
    }

    const filtered = applyFiltersAndSort(allProducts, filters);

    const total = filtered.length;
    const startIndex = skip;
    const paginatedProducts = filtered.slice(startIndex, startIndex + limit);

    return {
      data: paginatedProducts,
      total,
      page: Math.floor(skip / limit) + 1,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getProduct(id: string): Promise<Product | null> {
    if (id.startsWith("dj-")) {
      const realId = id.replace("dj-", "");
      const data = await fetchWithCache<DummyJsonProduct>(`${DUMMYJSON_BASE}/products/${realId}`);
      if (data) return transformDummyJsonProduct(data);
    } else if (id.startsWith("fs-")) {
      const realId = id.replace("fs-", "");
      const data = await fetchWithCache<FakeStoreProduct>(`${FAKESTORE_BASE}/products/${realId}`);
      if (data) return transformFakeStoreProduct(data);
    }
    return null;
  }

  async getProductsByCategory(
    category: string,
    limit = 20,
    skip = 0,
  ): Promise<PaginatedResponse<Product>> {
    return this.getProducts(limit, skip, { category });
  }

  async searchProducts(
    query: string,
    limit = 20,
    skip = 0,
  ): Promise<PaginatedResponse<Product>> {
    const allProducts: Product[] = [];
    const seenIds = new Set<string>();
    const queryLower = query.toLowerCase();

    const [djData, fsData] = await Promise.all([
      fetchWithCache<{ products: DummyJsonProduct[] }>(
        `${DUMMYJSON_BASE}/products/search?q=${encodeURIComponent(query)}&limit=50`,
      ),
      fetchWithCache<FakeStoreProduct[]>(`${FAKESTORE_BASE}/products`),
    ]);

    if (djData?.products) {
      djData.products.forEach((p) => {
        if (!seenIds.has(`dj-${p.id}`)) {
          seenIds.add(`dj-${p.id}`);
          allProducts.push(transformDummyJsonProduct(p));
        }
      });
    }

    if (fsData) {
      fsData.forEach((p) => {
        if (!seenIds.has(`fs-${p.id}`)) {
          seenIds.add(`fs-${p.id}`);
          allProducts.push(transformFakeStoreProduct(p));
        }
      });
    }

    const filtered = applyFiltersAndSort(allProducts);
    const queryFiltered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(queryLower) ||
        p.description.toLowerCase().includes(queryLower),
    );

    const total = queryFiltered.length;
    const startIndex = skip;
    const paginatedProducts = queryFiltered.slice(
      startIndex,
      startIndex + limit,
    );

    return {
      data: paginatedProducts,
      total,
      page: Math.floor(skip / limit) + 1,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getCategories(): Promise<Category[]> {
    return Object.entries(CATEGORY_CONFIG).map(([slug, config]) => ({
      id: slug,
      name: config.displayName,
      slug,
      image: config.image,
    }));
  }
}

class AuthService {
  private users: User[] = [
    {
      id: "1",
      email: "demo@Orinzo.com",
      name: "Demo User",
      avatar: undefined,
      addresses: [
        {
          id: "1",
          firstName: "Demo",
          lastName: "User",
          street: "123 Main Street",
          city: "San Francisco",
          state: "CA",
          zipCode: "94102",
          country: "United States",
          phone: "+1 (555) 123-4567",
          isDefault: true,
        },
      ],
      createdAt: new Date().toISOString(),
    },
  ];

  async login(
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    // Password is intentionally not validated here for demo purposes
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = this.users.find((u) => u.email === email);
    if (user && password.length >= 6) {
      return {
        user,
        token: `mock-jwt-token-${Date.now()}`,
      };
    }
    throw new Error("Invalid email or password");
  }

  async register(
    name: string,
    email: string,
    _password: string,
  ): Promise<{ user: User; token: string }> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingUser = this.users.find((u) => u.email === email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const newUser: User = {
      id: String(Date.now()),
      email,
      name,
      addresses: [],
      createdAt: new Date().toISOString(),
    };
    this.users.push(newUser);

    return {
      user: newUser,
      token: `mock-jwt-token-${Date.now()}`,
    };
  }

  async getMe(token: string): Promise<User | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (token.startsWith("mock-jwt-token")) {
      return this.users[0];
    }
    return null;
  }
}

class OrderService {
  private orders: Order[] = [];

  async createOrder(
    items: CartItem[],
    shippingAddress: User['addresses'][0],
    paymentMethod: string,
  ): Promise<Order> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.0875;
    const total = subtotal + shipping + tax;

    const order: Order = {
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      items,
      subtotal,
      shipping,
      tax,
      total,
      shippingAddress,
      paymentMethod,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.orders.push(order);
    return order;
  }

  async getOrders(_userId: string): Promise<Order[]> {
    // User ID intentionally unused for demo - returns all orders
    await new Promise((resolve) => setTimeout(resolve, 300));
    return this.orders;
  }

  async getOrder(orderId: string): Promise<Order | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return this.orders.find((o) => o.id === orderId) || null;
  }
}

export const apiService = new MultiApiService();
export const authService = new AuthService();
export const orderService = new OrderService();
