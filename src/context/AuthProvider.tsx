// https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03

import { SetStateAction, createContext, useEffect, useMemo, useState } from "react";
import AuthStorageService from "../api/authStorage";
import AuthApi from "../api/auth";
import UserApi from "../api/user";
import { useNavigate } from "react-router-dom";
import { UserRoles } from "../constants/UserRoles";
import { useGetUser } from "../hooks/user";

const defaultValue: IUseAuthHookResult = {
  token: null,
  setToken: function (token: string) {
    throw new Error("Function not implemented.");
  },
  login: function (params: ApiLoginParams) {
    throw new Error("Function not implemented.");
  },
  logout: function () {
    throw new Error("Function not implemented.");
  },
  refresh: function () {
    throw new Error("Function not implemented.");
  },
  // user: undefined,
  isAdmin: false,
  // setUser: function (value: SetStateAction<IUser | undefined>): void {
  //   throw new Error("Function not implemented.");
  // },
};

const AuthContext = createContext<IUseAuthHookResult>(defaultValue);

export const AuthProvider = ({ children }: { children: any[] }) => {
  // State to hold the authentication token
  const [access_token, setAccessToken] = useState(AuthStorageService.getAccessToken());
  // const { data: userFromHook, refetch } = useUser();
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const isAdmin = useMemo(() => user?.role == UserRoles.MANAGER, [user?.role]);

  // get user

  const fetchUser = async () => {
    // if (!user) {
    //   console.log(`user in fetchUser ${user}`);
    //   const newUser: IUser = await UserApi.details();
    //   console.log(`newUser in fetchUser ${JSON.stringify(newUser)}`);
    //   await setUser(() => newUser);
    //   console.log(`user in fetchUser ${user}`);
    //   return newUser;
    // }
    // return null;
    // console.log(`user in fetchUser ${user}`);
    // const newUser: IUser = await UserApi.details();
  };

  // Function to set the authentication token
  const setToken = (newToken: string) => {
    AuthStorageService.setAccessToken(newToken);
    setAccessToken(newToken);
  };

  // Login

  const login = async (params: ApiLoginParams) => {
    const access_token = await AuthApi.login(params);
    console.log("LOGIN SUCCESS");
    console.log(`access_token ${access_token}`);

    if (access_token) {
      setAccessToken(access_token);

      console.log("ACCESS TOKEN IS HERE");

      // await fetchUser();

      return Promise.resolve(true);
    } else {
      setAccessToken(null);
      return Promise.resolve(false);
    }
  };

  // Logout

  const logout = async () => {
    AuthApi.logout();
    setAccessToken(null);
    setUser(undefined);
  };

  // Refresh Token

  const refresh = async () => {
    const response = await AuthApi.refreshToken();
    setToken(response.access_token);
    // fetchUser();
  };

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token: access_token,
      setToken,
      login,
      logout,
      refresh,
      // user,
      isAdmin,
      // setUser,
    }),
    [access_token]
  );

  // useEffect(() => {
  //   console.log(`user in AuthPRovider ${JSON.stringify(user)}`);
  // }, [refresh]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
