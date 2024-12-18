import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  adminOnly?: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ adminOnly = false, children }) => {
  const { state } = useAuth();

  // Show a loader while authentication state is loading
  if (state.loading) {
    return <div>Loading...</div>; // Or use a proper loader component
  }

  // Redirect to login if the user is not authenticated
  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect non-admin users if this is an admin-only route
  if (!adminOnly && !state.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Render the children if authentication and role checks pass
  return <>{children}</>;
};

export default ProtectedRoute;
