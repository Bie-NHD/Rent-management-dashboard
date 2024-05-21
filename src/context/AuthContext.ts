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
  isLoading: false,
};

const AuthContext = createContext<IUseAuthHookReturns>(defaultValue);

export default AuthContext;
