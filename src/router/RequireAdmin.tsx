import React, { ReactNode } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

const RequireAdmin = () => {
  const { isAdmin } = useUser();
  const location = useLocation();
  const from = location.state?.from || "/";

  // if (!isAdmin) {
  //   return <Navigate to={from} />;
  // }

  return <Outlet />;
};

export default RequireAdmin;
