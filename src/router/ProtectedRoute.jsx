import { useAuth } from "../features/auth/AuthProvider";
import { Outlet,Navigate } from "react-router-dom";
export const ProtectedRoute = () => {
    const { token } = useAuth();
  
    // Check if the user is authenticated
    if (!token) {
      // If not authenticated, redirect to the login page
      return <Navigate to="/login" />;
    }
  
    // If authenticated, render the child routes
    return <Outlet />;
  };
  