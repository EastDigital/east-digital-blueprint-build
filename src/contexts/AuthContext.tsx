
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  adminEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  const checkAuthStatus = async (): Promise<boolean> => {
    const authStatus = localStorage.getItem('admin_authenticated');
    const storedEmail = localStorage.getItem('admin_email');
    const sessionExpires = localStorage.getItem('admin_session_expires');

    if (authStatus === 'true' && storedEmail && sessionExpires) {
      const expiresAt = parseInt(sessionExpires);
      
      if (Date.now() < expiresAt) {
        // Verify the admin is still active in database
        try {
          const { data, error } = await supabase
            .from('admin_users')
            .select('id, email')
            .eq('email', storedEmail)
            .eq('is_active', true)
            .single();

          if (!error && data) {
            setIsAuthenticated(true);
            setAdminEmail(storedEmail);
            return true;
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
      }
    }

    // Clear invalid session
    logout();
    return false;
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = (email: string) => {
    setIsAuthenticated(true);
    setAdminEmail(email);
    localStorage.setItem('admin_authenticated', 'true');
    localStorage.setItem('admin_email', email);
    localStorage.setItem('admin_session_expires', (Date.now() + 24 * 60 * 60 * 1000).toString());
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminEmail(null);
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_email');
    localStorage.removeItem('admin_session_expires');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isAdminAuthenticated: isAuthenticated, // Use the same value as isAuthenticated
      adminEmail, 
      login, 
      logout, 
      checkAuthStatus 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
