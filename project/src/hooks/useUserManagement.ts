import { useState } from 'react';
import { User, UserUpdateInput, BalanceUpdateInput } from '../types/user';
import { userService } from '../services/api/userService';

export const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: number, data: UserUpdateInput) => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await userService.updateUser(id, data);
      setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBalance = async (id: number, data: BalanceUpdateInput) => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await userService.updateBalance(id, data);
      setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update balance');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const banUser = async (id: number, reason: string) => {
    try {
      setLoading(true);
      setError(null);
      const bannedUser = await userService.banUser(id, reason);
      setUsers(prev => prev.map(user => user.id === id ? bannedUser : user));
      return bannedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to ban user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const unbanUser = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const unbannedUser = await userService.unbanUser(id);
      setUsers(prev => prev.map(user => user.id === id ? unbannedUser : user));
      return unbannedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unban user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    loadUsers,
    updateUser,
    updateBalance,
    banUser,
    unbanUser
  };
};