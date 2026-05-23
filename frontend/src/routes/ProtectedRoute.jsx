import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const token = localStorage.getItem('access_token');

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
