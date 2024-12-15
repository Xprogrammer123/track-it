import React from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Create ProtectedRoute component
interface ProtectedRouteProps extends RouteProps {
  adminOnly?: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ adminOnly = false, children, ...rest }) => {
  const { state } = useAuth();

  // If the user is not authenticated, redirect to the login page
  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If it's an admin-only route and the user is not an admin, redirect to the home or any user route
  if (adminOnly && !state.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, allow access to the protected route
  return <Route {...rest} element={children} />;
};

export default ProtectedRoute;
