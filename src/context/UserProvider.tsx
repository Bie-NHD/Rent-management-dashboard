import { createContext, useEffect, useState } from "react";
import { useGetUser } from "../hooks/user";

const UserContext = createContext<IUseUserContextHookReturns>({
  user: undefined,
  setUser: undefined,
});

export default UserContext;

export const UserProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const { data, refetch } = useGetUser();

  useEffect(() => {
    setUser(data);
  }, [refetch]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
