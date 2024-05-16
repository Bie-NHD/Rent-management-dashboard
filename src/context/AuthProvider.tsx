// https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03

import { useMemo } from "react";
import AuthStorageService from "../api/authStorage";
import AuthApi from "../api/auth";
import { QK_ACCESS_TOKEN } from "../constants";
import { useGetAccessToken, useGetUser } from "../hooks/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import queryClient from "../configs/queryClient";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }: { children: any[] }) => {
  const client = useQueryClient(queryClient);

  const { data: _token } = useQuery<string | null>({
    queryFn: () => {
      console.log(`fetching tokens`);
      return AuthStorageService.getAccessToken();
    },
    queryKey: [QK_ACCESS_TOKEN],
    initialData: null,
    placeholderData: null,
    refetchInterval: 120000,
  });

  // Login

  const login = async (params: ApiLoginParams) => {
    const { message, statusCode } = await AuthApi.login(params);

    client.refetchQueries({ queryKey: [QK_ACCESS_TOKEN] });

    return { message, statusCode };
  };

  // Logout

  const logout = async () => {
    AuthApi.logout();
  };

  // Refresh Token

  const refresh = async () => {
    await AuthApi.refreshToken();
  };

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token: _token,
      login,
      logout,
      refresh,
    }),
    [_token]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
