import { useEffect } from "react";
import Layout from "../App/Layout";
import useAuth from "../hooks/useAuth";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useGetUser } from "../hooks/user";
import { UserProvider } from "../context/UserProvider";
const RequireSignedIn = () => {
  const { token, refresh } = useAuth();
  const location = useLocation();

  useEffect(() => {
    refresh;
  }, [token]);

  // Check if the user is authenticated
  if (!token || token === "") {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes
  return (
    <UserProvider>
      <Layout>
        <Outlet />
      </Layout>
    </UserProvider>
  );
};

export default RequireSignedIn;
