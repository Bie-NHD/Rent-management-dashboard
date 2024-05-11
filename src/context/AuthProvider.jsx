// https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03

import { createContext, useContext, useMemo, useState } from "react";
import { Api } from "../api";

const AuthContext = createContext({
  token: "",
  setToken,
});

export const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [access_token, setAccessToken] = useState();

  // Function to set the authentication token
  const setToken = (newToken) => {
    setAccessToken(newToken);
  };

  // Login

  const login = async (params) => {
    const { access_token, refresh_token } = await Api.login(params);

    setAccessToken(access_token);
  };

  // Logout

  const logout = async () => {};

  // Refresh Token

  const refresh = async () => {
    const refresh_token = localStorage.getItem("refresh_token");

    const access_token = await Api.refreshToken(refresh_token);

    setAccessToken(access_token);
  };

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token: access_token,
      setToken,
      login,
      logout,
      refresh,
    }),
    [access_token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
