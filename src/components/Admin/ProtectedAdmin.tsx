
import React from 'react';
import { EnhancedOTPLogin } from './EnhancedOTPLogin';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedAdminProps {
  children: React.ReactNode;
}

export const ProtectedAdmin: React.FC<ProtectedAdminProps> = ({ children }) => {
  const { isAdminAuthenticated } = useAuth();

  if (!isAdminAuthenticated) {
    return <EnhancedOTPLogin />;
  }

  return <>{children}</>;
};
