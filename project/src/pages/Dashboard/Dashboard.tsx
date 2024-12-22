import { useAuthStore } from '../../store/authStore';
import { usePlayerStore } from '../../store/playerStore';
import { Link, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCardIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const { balance } = usePlayerStore();

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 rounded-lg p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Bem-vindo, {user?.username}!
              </h1>
              <div className="flex items-center text-yellow-400">
                <CreditCardIcon className="h-5 w-5 mr-2" />
                <span className="font-bold">{balance} L2 Coins</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white rounded-lg p-4 text-center hover:bg-blue-700 transition"
            >
              Historico
            </Link>
            <Link
              to="/dashboard/shop"
              className="bg-purple-600 text-white rounded-lg p-4 text-center hover:bg-purple-700 transition"
            >
              Shop
            </Link>
            <Link
              to="/dashboard/donation"
              className="bg-green-600 text-white rounded-lg p-4 text-center hover:bg-green-700 transition"
            >
              Doação
            </Link>
            <Link
              to="/dashboard/character"
              className="bg-yellow-600 text-white rounded-lg p-4 text-center hover:bg-yellow-700 transition"
            >
              Personagem
            </Link>
            <Link
              to="/dashboard/account"
              className="bg-red-600 text-white rounded-lg p-4 text-center hover:bg-red-700 transition"
            >
              Conta
            </Link>
          </div>
        </motion.div>
        <Outlet />
      </div>
    </div>
  );
}