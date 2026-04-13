import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

interface ThemeStore {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  isHydrated: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setHydrated: () => void;
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getResolvedTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") {
    return getSystemTheme();
  }
  return theme;
}

function applyTheme(resolvedTheme: "light" | "dark") {
  if (typeof window !== "undefined") {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
  }
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "system",
      resolvedTheme: "light",
      isHydrated: false,

      setHydrated: () => {
        set({ isHydrated: true });
        applyTheme(get().resolvedTheme);
      },

      setTheme: (theme: Theme) => {
        const resolvedTheme = getResolvedTheme(theme);
        set({ theme, resolvedTheme });
        applyTheme(resolvedTheme);
      },

      toggleTheme: () => {
        const current = get().resolvedTheme;
        const newTheme = current === "light" ? "dark" : "light";
        get().setTheme(newTheme);
      },
    }),
    {
      name: "Orinzo-theme",
      partialize: (state) => ({
        theme: state.theme,
        resolvedTheme: state.resolvedTheme,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated();
        }
      },
    },
  ),
);
