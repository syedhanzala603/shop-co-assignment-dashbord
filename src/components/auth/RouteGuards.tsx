import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AUTH_PATHS = ['/sign-in', '/login', '/authentication/sign-in'];

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export const PublicOnlyRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    const fromState = (location.state as { from?: { pathname?: string; search?: string } } | null)
      ?.from;
    const redirectPath =
      fromState?.pathname && !AUTH_PATHS.includes(fromState.pathname)
        ? `${fromState.pathname}${fromState.search || ''}`
        : '/';

    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
