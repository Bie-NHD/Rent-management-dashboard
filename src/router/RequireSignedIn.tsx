import Layout from "../App/Layout";
import useAuth from "../hooks/useAuth";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserProvider } from "../context/UserProvider";
const RequireSignedIn = () => {
  const { token, logout, isLoading } = useAuth();
  const location = useLocation();

  // console.info(`${Date.now()}\nAt RequireSignedIn:\naccess_token =\n${token}`);

  // Check if the user is authenticated
  // if (!isLoading && (!token || token === "")) {
  //   // If not authenticated, redirect to the login page
  //   console.info(`FORCING LOGOUT ${new Date()}`);
  //   logout("Signed out. Please sign in again.");
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

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
