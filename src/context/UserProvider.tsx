import { createContext, useEffect, useMemo, useState } from "react";
import { useGetUser } from "../hooks/user";
import { UserRoles } from "../constants";

const UserContext = createContext<IUseUserContextHookReturns>({
  user: undefined,
  isAdmin: false,
  refetch: function (): Promise<any> {
    throw new Error("Function not implemented.");
  },
  isLoading: false,
  // setUser: undefined,
});

export default UserContext;

export const UserProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  const { data: user, refetch, isLoading } = useGetUser();

  // const [user, setUser] = useState<User | undefined>(undefined);

  const isAdmin = useMemo(() => user?.role == UserRoles.MANAGER, [user?.role]);

  const contextValue = useMemo<IUseUserContextHookReturns>(
    () => ({
      user,
      // setUser,
      // isLoading,
      isAdmin,
    }),
    [user]
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
