import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ShopItem } from '../types/shop';

interface ShopState {
  selectedCategory: string;
  cart: ShopItem[];
  setSelectedCategory: (category: string) => void;
  addToCart: (item: ShopItem) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
}

export const useShopStore = create<ShopState>()(
  persist(
    (set) => ({
      selectedCategory: 'weapons',
      cart: [],
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
      removeFromCart: (cartId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.cartId !== cartId),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'shop-storage',
      partialize: (state) => ({
        cart: state.cart,
      }),
    }
  )
);