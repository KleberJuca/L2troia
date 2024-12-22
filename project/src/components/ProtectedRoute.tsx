import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import React from 'react';

interface Props {
  children: React.ReactNode;
  requiresAdmin?: boolean;
}

export default function ProtectedRoute({ children, requiresAdmin = false }: Props) {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiresAdmin && user.accessLevel <= 0) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}