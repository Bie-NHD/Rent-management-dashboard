import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
const useAuth = (): IUseAuthHookResult | null => useContext(AuthContext);
export default useAuth;
