import { useEffect } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { useAdminStore } from '../../store/adminStore';
import AdminSidebar from './components/AdminSidebar';
import AdminHome from './sections/AdminHome';
import AdminNews from './sections/AdminNews';
import AdminUsers from './sections/AdminUsers';
import AdminShop from './sections/AdminShop';
import AdminStats from './sections/AdminStats';
import AdminSettings from './sections/AdminSettings';
import AdminPayments from './sections/AdminPayments';
import AdminSales from './sections/AdminSales';
import AdminStreams from './sections/AdminStreams';
import AdminTerms from './sections/AdminTerms';
import AdminCoins from './sections/AdminCoins';
import React from 'react';

export default function AdminDashboard() {
  const { isAuthenticated } = useAdminStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/dashboard" element={<AdminHome />} />
          <Route path="/news" element={<AdminNews />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/shop" element={<AdminShop />} />
          <Route path="/sales" element={<AdminSales />} />
          <Route path="/payments" element={<AdminPayments />} />
          <Route path="/coins" element={<AdminCoins />} />
          <Route path="/streams" element={<AdminStreams />} />
          <Route path="/terms" element={<AdminTerms />} />
          <Route path="/stats" element={<AdminStats />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </div>
    </div>
  );
}