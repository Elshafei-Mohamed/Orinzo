"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
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
import { CATEGORIES, HERO_SLIDES, FEATURED_BANNERS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { siteData } from "@/data";

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

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const {
    data: featuredProducts,
    isLoading: isLoadingFeatured,
    isError: errorFeatured,
  } = useFeaturedProducts();
  const {
    data: newArrivals,
    isLoading: isLoadingNew,
    isError: errorNew,
  } = useNewArrivals();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
    );
  };

  return (
    <div className="flex flex-col">
      <section className="relative min-h-screen overflow-hidden">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              index === currentSlide ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl animate-fade-in pl-0 lg:pl-12">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl text-white/80 mb-6">
                    {slide.subtitle}
                  </p>
                  <Link href={slide.link}>
                    <Button
                      size="lg"
                      rightIcon={<ArrowRight className="h-5 w-5" />}
                      className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-[var(--accent-foreground)]"
                    >
                      {slide.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentSlide ? "bg-white w-8" : "bg-white/50",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

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
                    className="object-cover"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

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
    </div>
  );
}
