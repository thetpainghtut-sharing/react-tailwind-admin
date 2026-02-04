import React, { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router';

interface ProtectedRouteProps {
  children?: ReactNode; // Make children optional if using Outlet method
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    console.log("Hey");
    return <Navigate to="/signin" replace />;
  }

  // If children are provided, render them; otherwise render the Outlet
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;