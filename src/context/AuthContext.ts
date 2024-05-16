import { createContext } from "react";

const defaultValue: IUseAuthHookReturns = {
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
  // refresh: function () {
  //   throw new Error("Function not implemented.");
  // },
  // user: undefined,
  // isAdmin: false,
  // setUser: function (value: SetStateAction<IUser | undefined>): void {
  //   throw new Error("Function not implemented.");
  // },
};

const AuthContext = createContext<IUseAuthHookReturns>(defaultValue);

export default AuthContext;
