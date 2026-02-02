import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectTheme, setSidebarCollapsed } from './store/dbSlice';
import Login from './pages/Login';
import SelectDatabase from './pages/SelectDatabase';
import Dashboard from './pages/Dashboard';
import MetricDetail from './pages/MetricDetail';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Initialize sidebar state for mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      dispatch(setSidebarCollapsed(true));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/select-db"
          element={
            <ProtectedRoute>
              <SelectDatabase />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/metric/:id/:dbId"
          element={
            <ProtectedRoute>
              <MetricDetail />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
