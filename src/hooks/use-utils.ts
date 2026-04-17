'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useDebouncedCallback<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const loadStoredValue = () => {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch {
        // Silently handle errors
      }
      setIsHydrated(true);
    };
    queueMicrotask(loadStoredValue);
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch {
      // Silently handle storage errors
    }
  };

  if (!isHydrated) {
    return [initialValue, setValue];
  }

  return [storedValue, setValue];
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const matchesRef = useRef(matches);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const media = window.matchMedia(query);
    matchesRef.current = media.matches;

    const listener = () => {
      setMatches(media.matches);
      matchesRef.current = media.matches;
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 639px)');
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', updatePosition);
    updatePosition();

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
}

export function useSearchParam() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') || '');
  const debouncedValue = useDebounce(searchQuery, 400);
  const isSearching = searchQuery !== debouncedValue;
  const prevSearchRef = useRef<string>('');

  useEffect(() => {
    if (debouncedValue !== prevSearchRef.current) {
      prevSearchRef.current = debouncedValue;
      
      if (debouncedValue) {
        const params = new URLSearchParams(searchParams.toString());
        params.set('q', debouncedValue);
        const newUrl = `${pathname}?${params.toString()}`;
        router.push(newUrl, { scroll: false });
      } else {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('q');
        const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ''}`;
        router.push(newUrl, { scroll: false });
      }
    }
  }, [debouncedValue, pathname, router, searchParams]);

  const setSearch = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return {
    searchQuery,
    setSearch,
    clearSearch,
    debouncedSearch: debouncedValue,
    isSearching,
    hasSearch: !!searchParams.get('q'),
  };
}
