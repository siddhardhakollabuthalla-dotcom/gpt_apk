import React from "react";
import { Navigate, Outlet } from "@tanstack/react-router";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  requiredRole?: "admin" | "super_admin";
  fallback?: React.ReactNode;
}

/**
 * ProtectedRoute component wraps routes that require authentication
 * Redirects to login if user is not authenticated
 * Optionally checks for specific role-based access
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole, fallback }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return fallback || <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }

  if (requiredRole && user && user.role !== requiredRole && user.role !== "super_admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

/**
 * PublicRoute component wraps routes that should redirect to dashboard if already logged in
 * Used for login, signup, etc.
 */
export const PublicRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

/**
 * Simple loading spinner component
 */
const LoadingSpinner: React.FC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
      backgroundColor: "#f5f5f5",
    }}
  >
    <div
      style={{
        textAlign: "center",
      }}
    >
      <div
        style={{
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #3498db",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          animation: "spin 1s linear infinite",
          margin: "0 auto 16px",
        }}
      />
      <p style={{ color: "#666", margin: 0 }}>Loading...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);
