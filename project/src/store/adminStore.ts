import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminUser {
  username: string;
  accessLevel: number;
}


interface AdminState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (user: AdminUser) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => {
        set({ user: null, isAuthenticated: false });
        window.location.href = '/';
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);