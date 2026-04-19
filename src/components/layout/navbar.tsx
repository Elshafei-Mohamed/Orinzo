"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  Sun,
  Moon,
  Package,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useCartStore,
  useAuthStore,
  useWishlistStore,
  useThemeStore,
} from "@/store";
import { Button, Input } from "@/components/ui";
import { NAVIGATION_CATEGORIES } from "@/lib/constants";

export function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const userMenuRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { items, openCart } = useCartStore();
  const { user, logout } = useAuthStore();
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const { resolvedTheme, toggleTheme } = useThemeStore();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      // Debounced search preparation if needed
    }, 300);
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (searchQuery.trim()) {
        router.push(
          `/products?search=${encodeURIComponent(searchQuery.trim())}`,
        );
        setSearchQuery("");
        setIsSearchOpen(false);
      }
    },
    [searchQuery, router],
  );

  const handleDropdownEnter = useCallback((categoryId: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(categoryId);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white text-[#0A0B10] border-b border-[#e9ecef]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-14 items-center gap-4 sm:gap-6">
          <button
            className="lg:hidden p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative h-8 w-8">
              <Image
                src="/assets/icon.png"
                alt="Orinzo Logo"
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            </div>
            <span className="hidden font-display text-lg font-bold sm:block text-[#0A0B10]">
              Orinzo
            </span>
          </Link>

          <div className="hidden lg:block flex-1 max-w-md ml-4 mr-2">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="h-9 w-full bg-(--muted) border-(--border) text-(--foreground) placeholder:text-(--muted-foreground) pr-9 rounded-lg text-sm"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-(--muted-foreground) hover:text-(--foreground)"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 ml-auto">
            <button
              className="lg:hidden p-1.5 hover:bg-(--muted) rounded-lg transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-4 w-4" />
            </button>

            {/* <button
              onClick={toggleTheme}
              className="hidden sm:flex p-1.5 hover:bg-(--muted) rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button> */}

            <Link
              href="/wishlist"
              className="relative p-1.5 hover:bg-(--muted) rounded-lg transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-(--accent) text-(--accent-foreground) text-[10px] font-medium">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={openCart}
              className="relative p-2 hover:bg-(--muted) rounded-lg transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-(--accent) text-(--accent-foreground) text-xs font-medium animate-bounce">
                  {itemCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-(--muted) rounded-lg transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--accent) text-(--accent-foreground) text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block text-sm">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-(--border) bg-(--card) py-2 shadow-xl z-(--z-dropdown) animate-slide-down">
                    <div className="px-4 py-2 border-b border-(--border)">
                      <p className="font-medium text-(--foreground)">
                        {user.name}
                      </p>
                      <p className="text-sm text-(--muted-foreground)">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/orders"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-(--foreground) hover:bg-(--muted) transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Package className="h-4 w-4" />
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                        router.push("/");
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-(--foreground) hover:bg-(--muted) transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button variant="primary" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="hidden lg:flex h-12 items-center gap-1 border-t border-gray-200">
          <Link
            href="/products"
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:text-[#B34BFF] transition-colors"
          >
            All Products
          </Link>

          {NAVIGATION_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="relative"
              onMouseEnter={() => handleDropdownEnter(category.id)}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                href={`/products?category=${category.slug}`}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                  activeDropdown === category.id
                    ? "text-[#B34BFF]"
                    : "hover:text-[#B34BFF]",
                )}
              >
                {category.name}
                <ChevronDown className="h-3 w-3" />
              </Link>

              {activeDropdown === category.id && (
                <div
                  className="absolute left-0 top-full w-100 bg-white border border-gray-200 rounded-xl shadow-xl z-35 animate-slide-down"
                  onMouseEnter={() => handleDropdownEnter(category.id)}
                >
                  <div className="p-4 grid grid-cols-2 gap-2">
                    {category.children.map((childSlug) => (
                      <Link
                        key={childSlug}
                        href={`/products?category=${childSlug}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-900 text-sm transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <ChevronRight className="h-3 w-3 text-gray-500" />
                        {childSlug
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {isSearchOpen && (
        <div className="lg:hidden border-t border-gray-200 p-4 animate-fade-in">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="h-10 w-full bg-gray-100 border border-gray-200 text-gray-900 placeholder:text-gray-500 pr-10 rounded-lg"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}

      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 py-4 animate-fade-in z-35">
          <nav className="px-4 space-y-1">
            <Link
              href="/products"
              className="block py-2 text-sm font-medium hover:text-[#B34BFF] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            {NAVIGATION_CATEGORIES.map((category) => (
              <div key={category.id}>
                <p className="py-2 text-sm font-semibold text-gray-500">
                  {category.name}
                </p>
                {category.children.map((childSlug) => (
                  <Link
                    key={childSlug}
                    href={`/products?category=${childSlug}`}
                    className="block py-2 pl-4 text-sm hover:text-[#B34BFF] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {childSlug
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
