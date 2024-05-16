import { useEffect } from "react";
import Layout from "../App/Layout";
import useAuth from "../hooks/useAuth";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useGetUser } from "../hooks/user";
import { UserProvider } from "../context/UserProvider";
import toast from "react-hot-toast";
const RequireSignedIn = () => {
  const { token, logout } = useAuth();
  const location = useLocation();

  console.log(`At RequireSignedIn: access_token = ${token}`);

  // Check if the user is authenticated
  if (!token || token === "") {
    // If not authenticated, redirect to the login page
    console.log(`FORCING LOGOUT ${new Date()}`);
    toast.error("Signed out. Please sign in again.");
    logout();
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
