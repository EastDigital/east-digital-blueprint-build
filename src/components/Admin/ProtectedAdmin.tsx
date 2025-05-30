
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { OTPAdminLogin } from './OTPAdminLogin';

interface ProtectedAdminProps {
  children: React.ReactNode;
}

export const ProtectedAdmin: React.FC<ProtectedAdminProps> = ({ children }) => {
  const { isAuthenticated, checkAuthStatus } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await checkAuthStatus();
      setIsLoading(false);
    };
    
    checkAuth();
  }, [checkAuthStatus]);

  const handleLoginSuccess = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <OTPAdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return <>{children}</>;
};
