"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CATEGORIES, NAVIGATION_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  className?: string;
}

export function MegaMenu({ className }: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (slug: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveCategory(slug);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const activeNavCategory = NAVIGATION_CATEGORIES.find(
    (c) => c.slug === activeCategory,
  );
  const subcategorySlugs = activeNavCategory?.children || [];
  const subcategories = subcategorySlugs
    .map((slug) => CATEGORIES.find((c) => c.slug === slug))
    .filter(Boolean);

  return (
    <div
      ref={menuRef}
      className={cn("relative flex-1", className)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-1">
        <Link
          href="/products"
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:text-accent transition-colors"
        >
          All Products
        </Link>

        {NAVIGATION_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onMouseEnter={() => handleMouseEnter(category.slug)}
            className={cn(
              "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
              activeCategory === category.slug
                ? "text-accent"
                : "hover:text-accent",
            )}
          >
            {category.name}
            <ChevronRight
              className={cn(
                "h-3 w-3 transition-transform",
                activeCategory === category.slug && "rotate-90",
              )}
            />
          </button>
        ))}
      </div>

      {activeCategory && (
        <div
          className="absolute left-0 top-full w-full bg-white border-t border-gray-200 shadow-xl animate-fade-in z-35"
          onMouseEnter={() => handleMouseEnter(activeCategory)}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
            <div className="grid grid-cols-5 gap-8">
              <div className="col-span-2">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {CATEGORIES.find((c) => c.slug === activeCategory)?.name}
                </h3>
                <div className="space-y-3">
                  {subcategories.map(
                    (sub) =>
                      sub && (
                        <Link
                          key={sub.id}
                          href={`/products?category=${sub.slug}`}
                          className="block text-sm text-muted-foreground hover:text-accent transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ),
                  )}
                </div>
                <Link
                  href={`/products?category=${activeCategory}`}
                  className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                >
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="col-span-3">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <Link
                      key={i}
                      href={`/products?category=${activeCategory}`}
                      className="group relative aspect-4/3 overflow-hidden rounded-xl"
                    >
                      <div className="absolute inset-0 bg-muted">
                        <img
                          src={
                            CATEGORIES.find((c) => c.slug === activeCategory)
                              ?.image
                          }
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium">Featured</p>
                        <p className="text-sm text-white/80">New Arrivals</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
