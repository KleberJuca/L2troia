import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ShopItem } from '../pages/Dashboard/Shop/types/shop';

interface ShopState {
  selectedCategory: string;
  cart: ShopItem[];
  setSelectedCategory: (category: string) => void;
  addToCart: (item: ShopItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

export const useShopStore = create<ShopState>()(
  persist(
    (set) => ({
      selectedCategory: 'weapons',
      cart: [],
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      addToCart: (item) => set((state) => ({ cart: [...state.cart, { ...item, id: `${item.id}-${Date.now()}` }] })),
      removeFromCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
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