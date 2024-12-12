import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Context/useAuth";

type Props = { children: React.ReactNode };
const ProtectedRoute = ({ children }: Props) => {
    const location = useLocation();
    const { isAdmin } = useAuth();
  return isAdmin() ? (<>{children}</>) : (
    <Navigate to = "/" state = {{from: location}} replace />
  );
};

export default ProtectedRoute;
