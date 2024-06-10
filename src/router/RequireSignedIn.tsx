import Layout from "../App/Layout";
import useAuth from "../hooks/useAuth";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserProvider } from "../context/UserProvider";
import { useEffect, useState } from "react";
import { useAuthTokenStore } from "../context/auth-store";
const RequireSignedIn = () => {
  const { isLoggedIn, logout } = useAuth();

  console.log("isSignedIn: ", isLoggedIn);

  if (!isLoggedIn) {
    // If not authenticated, redirect to the login page
    console.info(`FORCING LOGOUT ${new Date()}`);
    async () => {
      logout("Signed out. Please sign in again.");
    };
    return <Navigate to={"/login"} replace />;
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
