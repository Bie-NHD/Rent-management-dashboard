// https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03

import { createContext, useContext, useMemo, useState } from "react";
import { Api } from "../api";
import WebStorageService from "../api/webStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [access_token, setAccessToken] = useState(
    WebStorageService.getAccessToken()
  );

  // Function to set the authentication token
  const setToken = (newToken) => {
    WebStorageService.setAccessToken(newToken);
    setAccessToken(newToken);
  };

  // Login

  const login = async (params) => {
    const access_token = await Api.login(params);

    if (access_token) {
      setAccessToken(access_token);
    } else {
      setAccessToken(null);
    }
  };

  // Logout

  const logout = async () => {
    WebStorageService.removeAllTokens();
    setAccessToken("");
  };

  // Refresh Token

  const refresh = async () => {
    const response = await Api.refreshToken();
    setToken(response.access_token);
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
