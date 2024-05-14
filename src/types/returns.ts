interface IUseUserContextHookReturns {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>> | undefined;
}
interface IUseAuthHookResult {
  token: string | null;
  setToken: (token: string) => any;
  login: (params: ApiLoginParams) => any;
  logout: () => any;
  refresh: () => any;
  // user: IUser | undefined;
  isAdmin: false | boolean;
  // setUser: React.Dispatch<React.SetStateAction<IUser | undefined>> | undefined;
}