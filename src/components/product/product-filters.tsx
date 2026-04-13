'use client';

import { useState, useCallback } from 'react';
import { X, SlidersHorizontal, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { PRICE_RANGES, RATING_OPTIONS } from '@/lib/constants';
import { Star } from 'lucide-react';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-[var(--border)] pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left mb-3 group"
      >
        <span className="font-medium text-sm text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
          {title}
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-[var(--muted-foreground)]" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[var(--muted-foreground)]" />
        )}
      </button>
      {isOpen && children}
    </div>
  );
}

interface RadioOptionProps {
  label: React.ReactNode;
  checked: boolean;
  onChange: () => void;
}

function RadioOption({ label, checked, onChange }: RadioOptionProps) {
  return (
    <label 
      onClick={onChange}
      className="flex items-center gap-3 cursor-pointer group py-1.5 px-2 -mx-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
    >
      <div className={cn(
        'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
        checked 
          ? 'border-[var(--accent)] bg-[var(--accent)]' 
          : 'border-[var(--border)] group-hover:border-[var(--accent)]'
      )}>
        {checked && <Check className="h-3 w-3 text-white" />}
      </div>
      <span className={cn(
        'text-sm transition-colors',
        checked ? 'text-[var(--foreground)] font-medium' : 'text-[var(--muted-foreground)] group-hover:text-[var(--foreground)]'
      )}>
        {label}
      </span>
    </label>
  );
}

interface FilterContentProps {
  localFilters: {
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    category?: string;
  };
  setLocalFilters: React.Dispatch<React.SetStateAction<{
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    category?: string;
  }>>;
  categories: { slug: string; name: string }[];
  onReset: () => void;
  onApply: () => void;
}

function FilterContent({ localFilters, setLocalFilters, categories, onReset, onApply }: FilterContentProps) {
  const handlePriceRangeChange = (range: typeof PRICE_RANGES[0] | null) => {
    if (range) {
      setLocalFilters({
        ...localFilters,
        minPrice: range.min,
        maxPrice: range.max === Infinity ? undefined : range.max,
      });
    } else {
      setLocalFilters({
        ...localFilters,
        minPrice: undefined,
        maxPrice: undefined,
      });
    }
  };

  return (
    <div className="space-y-4">
      <FilterSection title="Category" defaultOpen={true}>
        <div className="space-y-1">
          <RadioOption
            label="All Categories"
            checked={!localFilters.category}
            onChange={() => setLocalFilters({ ...localFilters, category: undefined })}
          />
          {categories.slice(0, 8).map((cat) => (
            <RadioOption
              key={cat.slug}
              label={cat.name}
              checked={localFilters.category === cat.slug}
              onChange={() => setLocalFilters({ ...localFilters, category: cat.slug })}
            />
          ))}
          {categories.length > 8 && (
            <button className="text-xs text-[var(--accent)] hover:underline mt-2 ml-2">
              Show {categories.length - 8} more...
            </button>
          )}
        </div>
      </FilterSection>

      <FilterSection title="Price Range" defaultOpen={true}>
        <div className="space-y-1">
          <RadioOption
            label="All Prices"
            checked={!localFilters.minPrice && !localFilters.maxPrice}
            onChange={() => handlePriceRangeChange(null)}
          />
          {PRICE_RANGES.map((range) => (
            <RadioOption
              key={range.label}
              label={range.label}
              checked={
                localFilters.minPrice === range.min &&
                localFilters.maxPrice === range.max
              }
              onChange={() => handlePriceRangeChange(range)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Customer Rating" defaultOpen={false}>
        <div className="space-y-1">
          {RATING_OPTIONS.map((opt) => (
            <RadioOption
              key={opt.value}
              label={
                <span className="flex items-center gap-1.5">
                  {opt.value}&Up
                  <span className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          'h-3 w-3',
                          star <= opt.value 
                            ? 'fill-[var(--rating)] text-[var(--rating)]' 
                            : 'text-[var(--muted-foreground)]'
                        )}
                      />
                    ))}
                  </span>
                </span>
              }
              checked={localFilters.minRating === opt.value}
              onChange={() =>
                setLocalFilters({
                  ...localFilters,
                  minRating: localFilters.minRating === opt.value ? undefined : opt.value,
                })
              }
            />
          ))}
        </div>
      </FilterSection>

      <div className="flex gap-2 pt-2">
        <Button variant="outline" onClick={onReset} className="flex-1 text-sm" size="sm">
          Reset
        </Button>
        <Button onClick={onApply} className="flex-1 text-sm" size="sm">
          Apply
        </Button>
      </div>
    </div>
  );
}

interface ProductFiltersProps {
  filters: {
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    category?: string;
  };
  onFilterChange: (filters: ProductFiltersProps['filters']) => void;
  categories: { slug: string; name: string }[];
  className?: string;
}

export function ProductFilters({
  filters,
  onFilterChange,
  categories,
  className,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = useCallback(() => {
    onFilterChange(localFilters);
    setIsOpen(false);
  }, [localFilters, onFilterChange]);

  const handleReset = useCallback(() => {
    const resetFilters = {
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
      category: undefined,
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  }, [onFilterChange]);

  const activeFilterCount = [
    localFilters.category,
    localFilters.minPrice || localFilters.maxPrice,
    localFilters.minRating,
  ].filter(Boolean).length;

  return (
    <>
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className={cn('sticky top-24', className)}>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[var(--foreground)]">Filters</h3>
              {activeFilterCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-medium bg-[var(--accent)] text-[var(--accent-foreground)] rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <FilterContent
              localFilters={localFilters}
              setLocalFilters={setLocalFilters}
              categories={categories}
              onReset={handleReset}
              onApply={handleApply}
            />
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          leftIcon={<SlidersHorizontal className="h-4 w-4" />}
          className="relative"
        >
          Filters
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-medium bg-[var(--accent)] text-[var(--accent-foreground)] rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <div className="fixed inset-x-4 bottom-0 z-60 rounded-t-2xl bg-white p-6 animate-slide-up max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg text-[var(--foreground)]">Filters</h3>
                  {activeFilterCount > 0 && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-[var(--accent)] text-[var(--accent-foreground)] rounded-full">
                      {activeFilterCount} active
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-[var(--muted)] rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FilterContent
                localFilters={localFilters}
                setLocalFilters={setLocalFilters}
                categories={categories}
                onReset={handleReset}
                onApply={handleApply}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
