interface IUseUserContextHookReturns {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>> | undefined;
  isAdmin: false | boolean;
}
interface IUseAuthHookResult {
  token: string | null;
  setToken: (token: string) => any;
  login: (params: ApiLoginParams) => Promise<ApiQueryStatus> | ApiQueryStatus;
  logout: () => any;
  refresh: () => any;
  // user: IUser | undefined;
  isAdmin: false | boolean;
  // setUser: React.Dispatch<React.SetStateAction<IUser | undefined>> | undefined;
}
