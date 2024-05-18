interface IUseUserContextHookReturns {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>> | undefined;
  isAdmin: false | boolean;
  refetch: () => Promise<any>;
}
interface IUseAuthHookReturns {
  token: string | null;
  // setToken: (token: string) => any;
  login: (params: ApiLoginParams) => Promise<ApiQueryStatus> | ApiQueryStatus;
  logout: (...args: any[]) => Promise<any> | any;
  refresh?: () => any;
  // user: IUser | undefined;
  // isAdmin: false | boolean;
  // setUser: React.Dispatch<React.SetStateAction<IUser | undefined>> | undefined;
}
type UseGetUserHookReturns = {
  users: IUser[];
  meta: { totalRowCount: number };
};

type UseGetApartmentsHookReturns = {
  data: Apartment[];
  meta: { totalRowCount: number };
};
