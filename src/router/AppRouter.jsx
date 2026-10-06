import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProtectedRoute from '../components/ProtectedRoute';

// Real components
import CafeListPage from '../pages/CafeListPage';
import CafeDetailPage from '../pages/CafeDetailPage';

// Placeholders
import { 
  BookingPage, 
  MyBookingsPage, 
  OwnerDashboard 
} from '../pages/Placeholders';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Public Cafe Browse */}
      <Route path="/cafes" element={<CafeListPage />} />
      <Route path="/cafes/:id" element={<CafeDetailPage />} />

      {/* Protected Player Routes */}
      <Route 
        path="/bookings/new" 
        element={
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/bookings/my" 
        element={
          <ProtectedRoute>
            <MyBookingsPage />
          </ProtectedRoute>
        } 
      />

      {/* Protected Owner Route */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute requireRole="CAFE_OWNER">
            <OwnerDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AppRouter;
