import React, { ReactNode } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();
  const from = location.state?.from || "/";

  if (user?.role != EUserRole.MANAGER) {
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default RequireAdmin;
