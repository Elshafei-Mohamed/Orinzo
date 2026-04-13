'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { ToastProvider } from '@/components/ui';
import { useThemeStore } from '@/store';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const isHydrated = useThemeStore((state) => state.isHydrated);
  const resolvedTheme = useThemeStore((state) => state.resolvedTheme);

  useEffect(() => {
    if (isHydrated) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(resolvedTheme);
    }
  }, [isHydrated, resolvedTheme]);

  if (!isHydrated) {
    return (
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <div className="min-h-screen bg-background text-foreground">
            {children}
          </div>
        </ToastProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>{children}</ToastProvider>
    </QueryClientProvider>
  );
}
