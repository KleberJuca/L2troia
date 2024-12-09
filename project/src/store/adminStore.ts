import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminUser {
  id: string;
  username: string;
  role: 'admin';
}

interface AdminState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (credentials: { username: string; password: string }) => Promise<boolean>;
  logout: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      login: async (credentials) => {
        // In a real app, make an API call here
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
          const adminUser: AdminUser = {
            id: '1',
            username: credentials.username,
            role: 'admin'
          };
          set({ 
            isAuthenticated: true, 
            token: 'dummy-token',
            user: adminUser
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ 
          isAuthenticated: false, 
          token: null,
          user: null 
        });
        window.location.href = '/';
      },
    }),
    {
      name: 'admin-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token
      })
    }
  )
);