interface IUseAuthHookResult {
  token: string | null;
  setToken: (token: string) => any;
  login: (params: ApiLoginParams) => any;
  logout: () => any;
  refresh: () => any;
  user: IUser | null | undefined;
}
