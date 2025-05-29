
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, FileText, Settings } from 'lucide-react';

const Admin = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-eastdigital-orange hover:text-white mb-8 transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Site
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-eastdigital-orange/50 transition-colors">
              <Users className="h-8 w-8 text-eastdigital-orange mb-4" />
              <h2 className="text-xl font-semibold mb-2">User Management</h2>
              <p className="text-gray-400 mb-4">Manage user accounts and permissions</p>
              <button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-4 py-2 rounded">
                Manage Users
              </button>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-eastdigital-orange/50 transition-colors">
              <FileText className="h-8 w-8 text-eastdigital-orange mb-4" />
              <h2 className="text-xl font-semibold mb-2">Project Management</h2>
              <p className="text-gray-400 mb-4">Add, edit, and manage projects</p>
              <button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-4 py-2 rounded">
                Manage Projects
              </button>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-eastdigital-orange/50 transition-colors">
              <Settings className="h-8 w-8 text-eastdigital-orange mb-4" />
              <h2 className="text-xl font-semibold mb-2">Site Settings</h2>
              <p className="text-gray-400 mb-4">Configure site settings and preferences</p>
              <button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-4 py-2 rounded">
                Site Settings
              </button>
            </div>
          </div>
          
          <div className="mt-12 bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-2xl font-semibold mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-eastdigital-orange">150+</div>
                <div className="text-gray-400">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-eastdigital-orange">80+</div>
                <div className="text-gray-400">Active Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-eastdigital-orange">95%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-eastdigital-orange">5+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
