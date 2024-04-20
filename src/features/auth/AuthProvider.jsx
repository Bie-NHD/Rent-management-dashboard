// https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03

import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
 // State to hold the authentication token
 const [token, setToken_] = useState();

 // Function to set the authentication token
 const setToken = (newToken) => {
   setToken_(newToken);
 };

  
  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
