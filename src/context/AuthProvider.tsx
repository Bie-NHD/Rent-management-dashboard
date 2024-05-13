// https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03

import { createContext, useMemo, useState } from "react";
import AuthStorageService from "../api/authStorage";
import AuthApi from "../api/auth";
import UserApi from "../api/user";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<IUseAuthHookResult | null>(null);

export const AuthProvider = ({ children }: { children: any[] }) => {
  // State to hold the authentication token
  const [access_token, setAccessToken] = useState(
    AuthStorageService.getAccessToken()
  );
  const [user, setUser] = useState<IUser | null | undefined>();

  // Function to set the authentication token
  const setToken = (newToken: string) => {
    AuthStorageService.setAccessToken(newToken);
    setAccessToken(newToken);
  };

  // Login

  const login = async (params: ApiLoginParams) => {
    const access_token = await AuthApi.login(params);

    if (access_token) {
      setAccessToken(access_token);

      const newUser: IUser = await UserApi.details();
      setUser(newUser);

      return Promise.resolve(true);
    } else {
      setAccessToken(null);
      return Promise.resolve(false);
    }
  };

  // Logout

  const logout = async () => {
    AuthApi.logout();
    setAccessToken("");
    setUser(null);
  };

  // Refresh Token

  const refresh = async () => {
    const response = await AuthApi.refreshToken();
    setToken(response.access_token);
  };

  // Memoized value of the authentication context
  const contextValue = useMemo<IUseAuthHookResult>(
    () => ({
      token: access_token,
      setToken,
      login,
      logout,
      refresh,
      user,
    }),
    [access_token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
