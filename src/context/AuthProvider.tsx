// https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03

import { useMemo, useState } from "react";

import AuthApi from "../api/auth";
import { QK_ACCESS_TOKEN } from "../constants";
import { useGetAccessToken, useGetUser } from "../hooks/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import queryClient from "../configs/queryClient";
import AuthContext from "./AuthContext";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const queryFn = async () => {
  const token = await AuthApi.getAccessToken()
    .then((_) => {
      console.info(`fetching tokens... ${_}`);
      return _;
    })
    .catch((error) => {
      return null;
    });

  return token;
};

export const AuthProvider = ({ children }: { children: any[] }) => {
  const client = useQueryClient(queryClient);

  const {
    data: _token,
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery<string | null>({
    queryFn,
    queryKey: [QK_ACCESS_TOKEN],
    initialData: null,
    placeholderData: null,
    staleTime: 120000,
    // throwOnError: (error) => error instanceof AxiosError || true,
  });

  console.info(`${Date.now()}\nAt AuthProvider:\naccess_token = ${_token}`);

  // if (isError && error) {
  // }

  // Login

  const login = async (params: ApiLoginParams) => {
    const login = AuthApi.login(params)
      .then(async (_) => {
        await refetch();
        return _;
      })
      .catch((error) => error);
    const { message, statusCode } = await login;

    return { message, statusCode };
  };

  // Logout

  const logout = async (message?: string) => {
    return await AuthApi.logout()
      .then(async () => {
        message ? toast(message!) : null;
        // await client.invalidateQueries({ queryKey: [QK_ACCESS_TOKEN] });
        // refetch();
        await queryClient.invalidateQueries();

        console.info(`At AuthProvider:\tLogout:\ntoken = ${_token}`);
      })
      .finally(() => Promise.resolve());
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
      isLoading,
    }),
    [_token]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
