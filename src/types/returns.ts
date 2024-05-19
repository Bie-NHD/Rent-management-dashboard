interface IUseUserContextHookReturns {
  user: User | undefined;
  // setUser: React.Dispatch<React.SetStateAction<IUser | undefined>> | undefined;
  isAdmin: false | boolean;
  refetch: () => Promise<any> | any;
  isLoading: boolean;
}
interface IUseAuthHookReturns {
  token: string | null;
  // setToken: (token: string) => any;
  login: (params: ApiLoginParams) => Promise<ApiQueryStatus> | ApiQueryStatus;
  logout: (...args: any[]) => Promise<any> | any;
  refresh?: () => any;
  isLoading: boolean;
  // user: IUser | undefined;
  // isAdmin: false | boolean;
  // setUser: React.Dispatch<React.SetStateAction<IUser | undefined>> | undefined;
}

type UseGetHookReturns<TData> = {
  data: TData[];
  meta: { totalRowCount: number };
};
type UseGetUserHookReturns = UseGetHookReturns<User>;
type UseGetApartmentsHookReturns = UseGetHookReturns<Apartment>;
type UseGetCutomerssHookReturns = UseGetHookReturns<Customer>;
