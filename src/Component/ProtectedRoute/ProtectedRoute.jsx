import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../Context/AuthContext/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isloggedIn } = useAuth();
  const childName = children.type.name

  if (isloggedIn) {
    const allowedRoutes = ["UserProfile", "UserRequest", "InNeed", "AddDonaiation"];
    if (allowedRoutes.includes(childName)) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    const restrictedRoutes = ["Signin", "Signup", "ResetPassword"];
    if (restrictedRoutes.includes(childName)) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  }
}
