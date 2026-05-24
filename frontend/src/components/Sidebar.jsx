import React from 'react';
import { Link, useLocation } from 'react-router-dom';
export const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Trucks', path: '/trucks' },
    { label: 'Drivers', path: '/drivers' },
    { label: 'Trips', path: '/trips' },
  ];
  return (
    <aside className="w-64 bg-primary text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold">CraneTrack</h1>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-6 py-3 transition ${
              isActive(item.path)
                ? 'bg-blue-600 border-l-4 border-blue-400'
                : 'hover:bg-secondary'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
