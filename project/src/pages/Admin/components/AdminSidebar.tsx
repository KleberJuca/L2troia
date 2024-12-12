import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '../../../store/adminStore';
import {
  HomeIcon,
  NewspaperIcon,
  UsersIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon,
  CreditCardIcon,
  ReceiptRefundIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import React from 'react';

export default function AdminSidebar() {
  const navigate = useNavigate();
  const logout = useAdminStore((state) => state.logout);

  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/admin/dashboard' },
    { name: 'News', icon: NewspaperIcon, path: '/admin/news' },
    { name: 'Users', icon: UsersIcon, path: '/admin/users' },
    { name: 'Shop', icon: ShoppingBagIcon, path: '/admin/shop' },
    { name: 'Sales', icon: ReceiptRefundIcon, path: '/admin/sales' },
    { name: 'Payments', icon: CreditCardIcon, path: '/admin/payments' },
    { name: 'Coins', icon: CurrencyDollarIcon, path: '/admin/coins' },
    { name: 'Streams', icon: VideoCameraIcon, path: '/admin/streams' },
    { name: 'Terms', icon: DocumentTextIcon, path: '/admin/terms' },
    { name: 'Statistics', icon: ChartBarIcon, path: '/admin/stats' },
    { name: 'Settings', icon: CogIcon, path: '/admin/settings' },
  ];

  return (
    <div className="w-64 bg-gray-800 min-h-screen p-4">
      <div className="flex items-center justify-center mb-8">
        <img src="/logo.png" alt="L2 Troia" className="h-12 w-12" />
        <span className="text-xl font-bold text-white ml-2">Admin Panel</span>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md transition"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </button>
        ))}

        <button
          onClick={() => logout()}
          className="flex items-center space-x-2 w-full px-4 py-2 text-red-400 hover:bg-gray-700 rounded-md transition mt-8"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}