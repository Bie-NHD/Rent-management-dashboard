interface IUseUserContextHookReturns {
  user: User | undefined;
  // setUser: React.Dispatch<React.SetStateAction<IUser | undefined>> | undefined;
  isAdmin: false | boolean;
  refetch?: () => Promise<any> | any;
  isLoading?: boolean;
  // setUser: React.Dispatch<React.SetStateAction<User | undefined>> | undefined;
}
interface AuthContextReturns {
  token: string | null;
  // setToken: (token: string) => any;
  login: (params: ApiLoginParams) => Promise<ApiQueryStatus> | ApiQueryStatus | any;
  logout: (...args: any[]) => Promise<any> | any;
  refresh?: () => any;
  // isLoading: boolean;
  // expiresAt: number | null;
  user?: User | undefined;
  isAdmin?: false | boolean;
  // role: string | null;
  // setUser: React.Dispatch<React.SetStateAction<IUser | undefined>> | undefined;
  credentials?: { username: string; password: string };
  isLoggedIn: boolean;
}

type UseGetHookReturns<TData> = {
  data: TData[];
  meta: { totalRowCount: number };
};
type UseGetUserHookReturns = UseGetHookReturns<User>;
type UseGetApartmentsHookReturns = UseGetHookReturns<Apartment>;
type UseGetCutomerssHookReturns = UseGetHookReturns<Customer>;
