import React, { ReactNode } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const { isAdmin } = useUser();
  const location = useLocation();
  const from = location.state?.from || "/";

  if (!isAdmin) {
    return <Navigate to={from} />;
  }

  return <>{children}</>;
};

export default RequireAdmin;
