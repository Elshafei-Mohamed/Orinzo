'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { HERO_SLIDES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
    );
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none",
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
  );
}
