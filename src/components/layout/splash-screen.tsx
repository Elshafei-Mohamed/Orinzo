"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export function SplashScreen({
  onComplete,
  duration = 2000,
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, duration - 500);

    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, duration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-9999 flex items-center justify-center
        bg-[#0A0B10]
        transition-all duration-500 ease-out
        ${
          isExiting
            ? "opacity-0 scale-105 pointer-events-none"
            : "opacity-100 scale-100"
        }
      `}
    >
      <div className="relative flex flex-col items-center">
        <div className="absolute inset-0 blur-3xl opacity-30 animate-pulse">
          <div className="w-48 h-48 rounded-full bg-linear-to-r from-[#B34BFF] to-[#6032E6]" />
        </div>
        <div className="relative w-32 h-32 md:w-40 md:h-40 animate-intro-pulse">
          <Image
            src="/assets/loading.png"
            alt="Orinzo"
            fill
            className="object-contain"
            priority
          />
        </div>
        {/* <h1 className="relative mt-4 text-2xl md:text-3xl font-bold text-white">
          <span className="text-[#F8CB63]">O</span>rinzo
        </h1> */}
      </div>
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-linear-to-r from-[#B34BFF] to-[#6032E6] animate-intro-dot"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function useSplashScreen(duration = 2500) {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem("orinzo-splash-seen") === "true") {
      setShowSplash(false);
      setIsLoading(false);
    }
  }, []);

  const handleSplashComplete = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("orinzo-splash-seen", "true");
    }
    setShowSplash(false);
    setTimeout(() => setIsLoading(false), 100);
  }, []);

  return {
    isLoading: !mounted || showSplash,
    showSplash: mounted && showSplash,
    handleSplashComplete,
    duration,
  };
}
