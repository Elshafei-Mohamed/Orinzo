import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Address } from "@/types";
import { authService } from "@/services/api";

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  updateUser: (updates: Partial<User>) => void;
  addAddress: (address: Address) => void;
  removeAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await authService.login(email, password);
          set({ user, token, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Login failed",
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await authService.register(
            name,
            email,
            password,
          );
          set({ user, token, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Registration failed",
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null });
      },

      clearError: () => set({ error: null }),

      updateUser: (updates: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },

      addAddress: (address: Address) => {
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                addresses: [...state.user.addresses, address],
              }
            : null,
        }));
      },

      removeAddress: (addressId: string) => {
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                addresses: state.user.addresses.filter(
                  (a) => a.id !== addressId,
                ),
              }
            : null,
        }));
      },

      setDefaultAddress: (addressId: string) => {
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                addresses: state.user.addresses.map((a) => ({
                  ...a,
                  isDefault: a.id === addressId,
                })),
              }
            : null,
        }));
      },
    }),
    {
      name: "Orinzo-auth",
      partialize: (state) => ({ user: state.user, token: state.token }),
    },
  ),
);
