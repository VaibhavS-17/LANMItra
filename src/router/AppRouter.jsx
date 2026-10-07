import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProtectedRoute from '../components/ProtectedRoute';

import CafeListPage from '../pages/CafeListPage';
import CafeDetailPage from '../pages/CafeDetailPage';
import BookingPage from '../pages/BookingPage';
import MyBookingsPage from '../pages/MyBookingsPage';
import OwnerDashboard from '../pages/OwnerDashboard';
import ErrorBoundary from '../components/ErrorBoundary';
import TournamentsPage from '../pages/TournamentsPage';
import TournamentDetailPage from '../pages/TournamentDetailPage';
import LeaderboardsPage from '../pages/LeaderboardsPage';
import PlayerProfilePage from '../pages/PlayerProfilePage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route path="/cafes" element={<CafeListPage />} />
      <Route path="/cafes/:id" element={<CafeDetailPage />} />
      
      <Route path="/tournaments" element={<TournamentsPage />} />
      <Route path="/tournaments/:id" element={<TournamentDetailPage />} />
      <Route path="/leaderboards" element={<LeaderboardsPage />} />

      <Route path="/bookings/new" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
      <Route path="/bookings/my" element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} />
      
      <Route path="/profile" element={<ProtectedRoute><PlayerProfilePage /></ProtectedRoute>} />

      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute requireRole="CAFE_OWNER">
            <ErrorBoundary>
              <OwnerDashboard />
            </ErrorBoundary>
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AppRouter;
