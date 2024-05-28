import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../Context/AuthContext/AuthContext";

export function AuthProtectedRoute({ children }) {
  const { isloggedIn } = useAuth();
  if (!isloggedIn) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export function DashboardProtectedRoute({ children }) {
  const { isloggedIn } = useAuth();
  if (isloggedIn) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}