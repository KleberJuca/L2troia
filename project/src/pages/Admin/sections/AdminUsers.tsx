import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useUserManagement } from '../../../hooks/useUserManagement';
import { User, BalanceUpdateInput } from '../../../types/user';
import UserModal from '../../../components/Admin/UserModal';
import BanModal from '../../../components/Admin/BanModal';
import BalanceModal from '../../../components/Admin/BalanceModal';
import React from 'react';

export default function AdminUsers() {
  const { users, loading, error, loadUsers, updateUser, banUser, unbanUser, updateBalance } = useUserManagement();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [banningUser, setBanningUser] = useState<User | null>(null);
  const [balanceUser, setBalanceUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleBanUser = (user: User) => {
    setBanningUser(user);
  };

  const handleBalanceUpdate = (user: User) => {
    setBalanceUser(user);
  };

  const handleSaveUser = async (userId: number, data: { email: string }) => {
    try {
      await updateUser(userId, data);
      setEditingUser(null);
    } catch (error) {
      alert('Failed to update user');
    }
  };

  const handleBanSubmit = async (userId: number, reason: string) => {
    try {
      await banUser(userId, reason);
      setBanningUser(null);
    } catch (error) {
      alert('Failed to ban user');
    }
  };

  const handleUnbanUser = async (userId: number) => {
    try {
      await unbanUser(userId);
    } catch (error) {
      alert('Failed to unban user');
    }
  };

  const handleBalanceSubmit = async (userId: number, data: BalanceUpdateInput) => {
    try {
      await updateBalance(userId, data);
      setBalanceUser(null);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to update balance');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">User Management</h1>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Username</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Balance</th>
              <th className="px-6 py-3 text-left">Last Login</th>
              <th className="px-6 py-3 text-left">Ban Reason</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-700">
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-bold text-yellow-400">
                  {user.balance} L2 Coins
                </td>
                <td className="px-6 py-4">{user.lastLogin}</td>
                <td className="px-6 py-4">
                  {user.status === 'banned' && (
                    <span className="text-red-400">{user.banReason}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="text-blue-400 hover:text-blue-500 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleBalanceUpdate(user)}
                    className="text-yellow-400 hover:text-yellow-500 mr-4"
                  >
                    Balance
                  </button>
                  {user.status === 'active' ? (
                    <button
                      onClick={() => handleBanUser(user)}
                      className="text-red-400 hover:text-red-500"
                    >
                      Ban
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnbanUser(user.id)}
                      className="text-green-400 hover:text-green-500"
                    >
                      Unban
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <UserModal
          user={editingUser}
          onSave={(data) => handleSaveUser(editingUser.id, data)}
          onClose={() => setEditingUser(null)}
        />
      )}

      {banningUser && (
        <BanModal
          user={banningUser}
          onBan={(reason) => handleBanSubmit(banningUser.id, reason)}
          onClose={() => setBanningUser(null)}
        />
      )}

      {balanceUser && (
        <BalanceModal
          user={balanceUser}
          onUpdateBalance={(data) => handleBalanceSubmit(balanceUser.id, data)}
          onClose={() => setBalanceUser(null)}
        />
      )}
    </motion.div>
  );
}