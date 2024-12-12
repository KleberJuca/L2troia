import { Routes, Route } from 'react-router-dom';
import AdminHome from '../sections/AdminHome';
import AdminNews from '../sections/AdminNews';
import AdminUsers from '../sections/AdminUsers';
import AdminShop from '../sections/AdminShop';
import AdminStats from '../sections/AdminStats';
import AdminSettings from '../sections/AdminSettings';
import React from 'react';

export default function AdminContent() {
  return (
    <div className="p-8">
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/news" element={<AdminNews />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/shop" element={<AdminShop />} />
        <Route path="/stats" element={<AdminStats />} />
        <Route path="/settings" element={<AdminSettings />} />
      </Routes>
    </div>
  );
}