import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-64 right-0 z-40">
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Fleet Management System</h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{user?.username}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
