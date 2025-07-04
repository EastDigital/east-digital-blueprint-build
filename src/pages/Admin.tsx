
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, FileText, Settings, LogOut, Database, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserManagement } from '@/components/Admin/UserManagement';
import { IndustryManagement } from '@/components/Admin/IndustryManagement';
import { DatabaseProjectManagement } from '@/components/Admin/DatabaseProjectManagement';
import { DatabaseSiteSettings } from '@/components/Admin/DatabaseSiteSettings';
import { ProtectedAdmin } from '@/components/Admin/ProtectedAdmin';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { logout, adminEmail } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'industries':
        return <IndustryManagement />;
      case 'projects':
        return <DatabaseProjectManagement />;
      case 'settings':
        return <DatabaseSiteSettings />;
      default:
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Logged in as</p>
                  <p className="text-eastdigital-orange font-semibold">{adminEmail}</p>
                </div>
                <Database className="h-6 w-6 text-green-500" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <button
                onClick={() => setActiveTab('users')}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-eastdigital-orange/50 transition-colors text-left"
              >
                <Users className="h-8 w-8 text-eastdigital-orange mb-4" />
                <h2 className="text-xl font-semibold mb-2">User Management</h2>
                <p className="text-gray-400 mb-4">Manage user accounts and permissions</p>
                <span className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-4 py-2 rounded inline-block">
                  Manage Users
                </span>
              </button>
              
              <button
                onClick={() => setActiveTab('industries')}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-eastdigital-orange/50 transition-colors text-left"
              >
                <Building2 className="h-8 w-8 text-eastdigital-orange mb-4" />
                <h2 className="text-xl font-semibold mb-2">Industry Management</h2>
                <p className="text-gray-400 mb-4">Manage industry categories and content</p>
                <span className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-4 py-2 rounded inline-block">
                  Manage Industries
                </span>
              </button>
              
              <button
                onClick={() => setActiveTab('projects')}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-eastdigital-orange/50 transition-colors text-left"
              >
                <FileText className="h-8 w-8 text-eastdigital-orange mb-4" />
                <h2 className="text-xl font-semibold mb-2">Project Management</h2>
                <p className="text-gray-400 mb-4">Add, edit, and manage projects in database</p>
                <span className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-4 py-2 rounded inline-block">
                  Manage Projects
                </span>
              </button>
              
              <button
                onClick={() => setActiveTab('settings')}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-eastdigital-orange/50 transition-colors text-left"
              >
                <Settings className="h-8 w-8 text-eastdigital-orange mb-4" />
                <h2 className="text-xl font-semibold mb-2">Site Settings</h2>
                <p className="text-gray-400 mb-4">Configure site settings and preferences</p>
                <span className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-4 py-2 rounded inline-block">
                  Site Settings
                </span>
              </button>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-semibold mb-4">System Status</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">✓</div>
                  <div className="text-gray-400">Database Connected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">✓</div>
                  <div className="text-gray-400">OTP Authentication</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-eastdigital-orange">1</div>
                  <div className="text-gray-400">Active Admin</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-eastdigital-orange">Live</div>
                  <div className="text-gray-400">System Status</div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <ProtectedAdmin>
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="inline-flex items-center text-eastdigital-orange hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Site
            </Link>
            
            <div className="flex items-center space-x-4">
              {activeTab !== 'overview' && (
                <button
                  onClick={() => setActiveTab('overview')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ← Back to Dashboard
                </button>
              )}
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-red-700 text-red-400 hover:bg-red-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
        <Toaster />
      </div>
    </ProtectedAdmin>
  );
};

export default Admin;
