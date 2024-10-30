// https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03

import { createContext, useEffect, useMemo, useState } from "react";

import AuthApi from "../api/auth";
import { QK_ACCESS_TOKEN, QK_ACCOUNT, QK_USERS, UserRoles } from "../constants";
import { useGetAccessToken, useGetUser } from "../hooks/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import queryClient from "../configs/queryClient";

import { AxiosError } from "axios";
import toast from "react-hot-toast";

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
  // isLoading: false,
  // expiresAt: null,
  isAdmin: false,
  user: undefined,
  isLoggedIn: false,
};

const AuthContext = createContext<AuthContextReturns>(authContextDefaults);

export default AuthContext;
const queryFn = async () => AuthStorageService.getAccessToken();

export const AuthProvider = ({ children }: { children: any[] }) => {
  // const client = useQueryClient(queryClient);

  const [enabled, setEnabled] = useState<boolean>(false); // enable query
  // const authActions = getAuthStoreActions();
  // const {
  //   data: _token,
  //   isLoading,
  //   refetch,
  // } = useQuery<string>({
  //   queryFn: async () => AuthStorageService.getAccessToken() || "",
  //   queryKey: [QK_ACCESS_TOKEN],
  //   initialData: AuthStorageService.getAccessToken() || "",

  //   placeholderData: "",
  //   staleTime: 120000,
  //   // throwOnError: (error) => error instanceof AxiosError || true,
  //   enabled: enabled,
  // });

  const [token, setToken] = useState("");

  // const [user,setUser] = useState<User>()
  // const { data: user, refetch: refetchUser } = useGetUser();

  console.info(`${Date.now()}\nAt AuthProvider:\naccess_token = ${token}`);

  useEffect(() => {
    const token = AuthStorageService.getAccessToken() || "";
    setToken(token);
  }, []);

  // Login

  const login = async (params: ApiLoginParams) => {
    const loggingToast = toast.loading("Logging in...");
    const login = AuthApi.login(params)
      .then(async (res) => {
        // await refetch();
        // setEnabled(true);

        // done fetching token:
        // setCredetials(params);
        setToken(res.data?.access_token ?? "");
        toast.dismiss(loggingToast);
        return res;
      })
      .catch((error) => error);
    const { message, statusCode } = await login;

    return { message, statusCode };
  };

  // Logout

  const logout = async (message?: string) => {
    // delete all credentials

    // const loggingToast = toast.loading("Logging out...");

    return await AuthApi.logout().then(async () => {
      const msgToast = message ? toast(message!) : undefined;
      // client.invalidateQueries({ queryKey: [QK_ACCESS_TOKEN] });
      setToken("");
      // refetch();
      // await queryClient.invalidateQueries();
      // setUser(undefined);
      console.info(`At AuthProvider:\tLogout:\ntoken = ${token}`);
      toast.dismiss(msgToast);
      // toast.dismiss(loggingToast);

      // navigate("/login", { state: { from: location } });
    });
  };

  // Refresh Token

  const refresh = async () => {
    await AuthApi.refreshToken().then((tokens) => {
      setToken(tokens.access_token ?? "");
    });
  };

  const isLoggedIn = useMemo(() => !!token && !!AuthStorageService.getAccessToken(), [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token: token,
      login,
      logout,
      refresh,
      // isLoading,
      // isAdmin,
      // user,
      // credentials,
      isLoggedIn,
    }),
    [token]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
