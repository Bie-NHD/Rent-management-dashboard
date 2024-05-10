// https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03

import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [access_token, setToken_] = useState();

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token: access_token,
      setToken,
    }),
    [access_token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
