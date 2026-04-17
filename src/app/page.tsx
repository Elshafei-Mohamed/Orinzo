"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Truck,
  Shield,
  RefreshCw,
  Headphones,
  Star,
  Award,
  Rocket,
  Lock,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui";
import { ProductGrid } from "@/components/product";
import { useFeaturedProducts, useNewArrivals } from "@/hooks";
import { CATEGORIES, FEATURED_BANNERS } from "@/lib/constants";
import { siteData } from "@/data";
import { HeroSlider } from "@/components/layout/hero-slider";

const bannerIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Truck,
  Shield,
  RefreshCw,
  Headphones,
};

const whyUsIcons = [Award, Rocket, Lock, RotateCcw];

function FeaturedProductsSection() {
  const { data: featuredProducts, isLoading: isLoadingFeatured, isError: errorFeatured } = useFeaturedProducts();
  
  return (
    <section className="py-16 bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 fill-accent text-accent" />
              <span className="text-sm font-medium text-accent">
                Best Sellers
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Featured Products
            </h2>
          </div>
          <Link href="/products">
            <Button
              variant="ghost"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              View All
            </Button>
          </Link>
        </div>

        <ProductGrid
          products={featuredProducts?.data || []}
          isLoading={isLoadingFeatured}
          isError={errorFeatured}
          columns={4}
        />
      </div>
    </section>
  );
}

function DealOfDaySection() {
  const { data: featuredProducts } = useFeaturedProducts();

  return (
    <section className="py-16 bg-linear-to-r from-primary to-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full mb-4">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm text-white/80">
                Limited Time Offer
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Deal of the Day
            </h2>
            <p className="text-lg text-white/80 mb-6">
              Save up to 40% on selected items. Limited time offer!
            </p>
            <Link href="/products">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                Shop Deals
              </Button>
            </Link>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {(featuredProducts?.data || []).slice(0, 4).map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="relative aspect-square overflow-hidden rounded-xl bg-white/10"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  unoptimized
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewArrivalsSection() {
  const { data: newArrivals, isLoading: isLoadingNew, isError: errorNew } = useNewArrivals();

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span className="text-sm font-medium text-success">
                Just Dropped
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              New Arrivals
            </h2>
          </div>
          <Link href="/products?sort=newest">
            <Button
              variant="ghost"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              View All
            </Button>
          </Link>
        </div>

        <ProductGrid
          products={newArrivals?.data || []}
          isLoading={isLoadingNew}
          isError={errorNew}
          columns={4}
        />
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section className="py-16 bg-[var(--muted)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-4">
            Why Shop With Us?
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            We&apos;re committed to providing the best shopping experience with
            premium products, fast shipping, and exceptional customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteData.whyUs.map((feature, index) => {
            const Icon = whyUsIcons[index];
            return (
              <div
                key={feature.title}
                className="text-center p-6 bg-[var(--card)] rounded-xl"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--accent)]/10 mb-4">
                  <Icon className="w-7 h-7 text-[var(--accent)]" />
                </div>
                <h3 className="font-semibold mb-2 text-[var(--foreground)]">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSlider />

      <section className="py-12 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_BANNERS.map((banner) => {
              const Icon = bannerIconMap[banner.icon];
              return (
                <div
                  key={banner.id}
                  className="flex items-center gap-4 p-4 bg-card rounded-xl"
                >
                  <div className="shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">
                      {banner.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {banner.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Shop by Category
              </h2>
              <p className="text-muted-foreground mt-1">
                Explore our curated collections
              </p>
            </div>
            <Link href="/products">
              <Button
                variant="ghost"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {CATEGORIES.slice(0, 6).map((category, index) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group relative aspect-square overflow-hidden rounded-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-semibold text-white text-sm sm:text-base">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProductsSection />
      <DealOfDaySection />
      <NewArrivalsSection />
      <WhyUsSection />
    </div>
  );
}
