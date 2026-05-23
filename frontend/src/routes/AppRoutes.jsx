import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Trucks from '../pages/Trucks';
import Drivers from '../pages/Drivers';
import Trips from '../pages/Trips';
import Maintenance from '../pages/Maintenance';
import Notifications from '../pages/Notifications';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/trucks"
          element={
            <ProtectedRoute>
              <Trucks />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/drivers"
          element={
            <ProtectedRoute>
              <Drivers />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <Trips />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/maintenance"
          element={
            <ProtectedRoute>
              <Maintenance />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};
