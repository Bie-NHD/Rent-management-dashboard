// https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03

import { createContext, useEffect, useMemo, useState } from "react";

import AuthApi from "../api/auth";
import { QK_ACCESS_TOKEN, UserRoles } from "../constants";
import { useGetAccessToken, useGetUser } from "../hooks/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import queryClient from "../configs/queryClient";

import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { getPayload } from "../utils/JWT-utils";
import { useNavigate } from "react-router-dom";
import AuthStorageService from "../api/authStorage";
const authContextDefaults: AuthContextReturns = {
  token: null,
  // setToken: function (token: string) {
  //   throw new Error("Function not implemented.");
  // },
  login: function (params: ApiLoginParams) {
    throw new Error("Function not implemented.");
  },
  logout: function () {
    throw new Error("Function not implemented.");
  },
  isLoading: false,
  // expiresAt: null,
  isAdmin: false,
  user: undefined,
};

const AuthContext = createContext<AuthContextReturns>(authContextDefaults);

export default AuthContext;
const queryFn = async () => AuthStorageService.getAccessToken();

export const AuthProvider = ({ children }: { children: any[] }) => {
  const client = useQueryClient(queryClient);
  // const navigate = useNavigate();
  const [credentials, setCredetials] = useState<{ username: string; password: string }>();

  const {
    data: _token,
    isLoading,
    refetch,
  } = useQuery<string>({
    queryFn: async () => AuthStorageService.getAccessToken() || "",
    queryKey: [QK_ACCESS_TOKEN],
    initialData: AuthStorageService.getAccessToken() || "",
    placeholderData: "",
    staleTime: 120000,
    // throwOnError: (error) => error instanceof AxiosError || true,
  });

  const { data: user, refetch: refetchUser } = useGetUser();

  console.info(`${Date.now()}\nAt AuthProvider:\naccess_token = ${_token}`);

  useEffect(() => {
    refetchUser();
  }, [credentials]);

  const isAdmin = useMemo(() => user?.role == UserRoles.MANAGER, [user?.role]);

  // if (isError && error) {
  // }

  // Login

  const login = async (params: ApiLoginParams) => {
    const loggingToast = toast.loading("Logging in...");
    const login = AuthApi.login(params)
      .then(async (_) => {
        await refetch();
        // done fetching token:
        setCredetials(params);
        toast.dismiss(loggingToast);
        return _;
      })
      .catch((error) => error);
    const { message, statusCode } = await login;

    return { message, statusCode };
  };

  // Logout

  const logout = async (message?: string) => {
    // delete all credentials
    setCredetials(undefined);
    const loggingToast = toast.loading("Logging out...");

    return await AuthApi.logout()
      .then(async () => {
        const msgToast = message ? toast(message!) : undefined;
        // await client.invalidateQueries({ queryKey: [QK_ACCESS_TOKEN] });
        // refetch();
        await queryClient.invalidateQueries();

        console.info(`At AuthProvider:\tLogout:\ntoken = ${_token}`);
        toast.dismiss(msgToast);
        toast.dismiss(loggingToast);

        // navigate("/login", { state: { from: location } });
      })
      .finally(() => {
        toast.dismiss(loggingToast);
      });
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
      isAdmin,
      user,
    }),
    [_token]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
