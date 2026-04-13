import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

interface RecentlyViewedStore {
  products: Product[];
  addProduct: (product: Product) => void;
  clearHistory: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set) => ({
      products: [],

      addProduct: (product: Product) => {
        set((state) => {
          const filtered = state.products.filter((p) => p.id !== product.id);
          return {
            products: [product, ...filtered].slice(0, 10),
          };
        });
      },

      clearHistory: () => set({ products: [] }),
    }),
    {
      name: "Orinzo-recently-viewed",
      partialize: (state) => ({ products: state.products }),
    },
  ),
);
