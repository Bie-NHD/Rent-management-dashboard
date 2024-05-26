import Layout from "../App/Layout";
import useAuth from "../hooks/useAuth";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserProvider } from "../context/UserProvider";
import { useEffect } from "react";
const RequireSignedIn = () => {
  const { token, logout, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  console.info(`${Date.now()}\nAt RequireSignedIn:\naccess_token =\n${token}`);

  const isSignOut = !isLoading && (!token || token === "");
  // useEffect(() => {
  //   // Check if the user is authenticated
  //   if (isSignOut) {
  //     // If not authenticated, redirect to the login page
  //     console.info(`FORCING LOGOUT ${new Date()}`);
  //     logout("Signed out. Please sign in again.");
  //     navigate("/login", { state: { from: location } });
  //   }
  // }, [isSignOut]);

  if (isSignOut) {
    // If not authenticated, redirect to the login page
    console.info(`FORCING LOGOUT ${new Date()}`);
    async () => {
      logout("Signed out. Please sign in again.");
    };
    return <Navigate to={"/login"} state={{ from: location }} />;
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
