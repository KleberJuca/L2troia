import { motion } from 'framer-motion';
import AccountInfo from './components/AccountInfo';
import PasswordChange from './components/PasswordChange';
import AccountDeletion from './components/AccountDeletion';
import { useAuthStore } from '../../../store/authStore';
import { Account } from '../../../types/account';
import { useState } from 'react';
import React from 'react';

export default function AccountPage() {
  const { user } = useAuthStore();
  const [account] = useState<Account>({
    id: user?.username || '',
    username: user?.username || '',
    email: 'user@example.com',
    createdAt: '2023-01-01',
    characterCount: 3,
    lastLogin: '2023-11-24 15:30:00'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Minha Conta</h2>
      
      <div className="space-y-6">
        <AccountInfo account={account} />
        <PasswordChange />
        <AccountDeletion account={account} />
      </div>
    </motion.div>
  );
}