
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminLogin } from './AdminLogin';

interface ProtectedAdminProps {
  children: React.ReactNode;
}

export const ProtectedAdmin: React.FC<ProtectedAdminProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <>{children}</>;
};
