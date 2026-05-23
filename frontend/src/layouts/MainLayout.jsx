import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';

export const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="mt-20 p-6 bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};
