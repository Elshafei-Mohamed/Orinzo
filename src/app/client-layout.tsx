'use client';

import { useSplashScreen, SplashScreen } from '@/components/layout/splash-screen';

function SplashScreenWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading, handleSplashComplete, duration } = useSplashScreen(2000);

  if (isLoading) {
    return <SplashScreen onComplete={handleSplashComplete} duration={duration} />;
  }

  return <>{children}</>;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <SplashScreenWrapper>{children}</SplashScreenWrapper>;
}
