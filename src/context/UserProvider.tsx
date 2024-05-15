import { createContext, useEffect, useMemo, useState } from "react";
import { useGetUser } from "../hooks/user";
import { UserRoles } from "../constants/UserRoles";

const UserContext = createContext<IUseUserContextHookReturns>({
  user: undefined,
  setUser: undefined,
  isAdmin: false,
  refetch: function (): Promise<any> {
    throw new Error("Function not implemented.");
  }
});

export default UserContext;

export const UserProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const { data, refetch } = useGetUser();

  useEffect(() => {
    setUser(data);
    console.log(`user in UserProvider ${user} ${new Date()}`);
  }, [data]);

  const isAdmin = useMemo(() => user?.role == UserRoles.MANAGER, [user?.role]);

  return <UserContext.Provider value={{ user, setUser, isAdmin ,refetch}}>{children}</UserContext.Provider>;
};
