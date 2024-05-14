import Layout from "../App/Layout";
import useAuth from "../hooks/useAuth";
import { Outlet, Navigate, useLocation } from "react-router-dom";
export const RequireSignedIn = () => {
  const { token } = useAuth();
  const location = useLocation();

  // Check if the user is authenticated
  if (!token || token === "") {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
