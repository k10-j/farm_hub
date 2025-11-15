import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    // while we restore auth, you can show spinner or null
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to signin page and preserve attempted URL in state
    return <Navigate to="/signinup" replace state={{ from: location }} />;
  }

  return children;
}
