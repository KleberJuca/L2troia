import { useAuthStore } from '../../store/authStore';
import { Link, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import React from 'react';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className=" rounded-lg p-6 mb-8"
        >
          <h1 className="text-2xl font-bold text-white mb-4">
            Bem-vindo, {user?.username}!
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white rounded-lg p-4 text-center hover:bg-blue-700 transition"
            >
              Painel
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