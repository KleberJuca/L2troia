import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlayerState {
  balance: number;
  updateBalance: (amount: number) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      balance: 1000, // Initial balance
      updateBalance: (amount) => set((state) => ({ balance: state.balance + amount })),
    }),
    {
      name: 'player-storage',
    }
  )
);