import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../Context/AuthContext/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isloggedIn } = useAuth()
  if (isloggedIn) {
    return <  Navigate to="/" />;
  } else {
    return children;
  }
}
