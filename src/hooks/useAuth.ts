import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
const useAuth = (): IUseAuthHookResult => useContext(AuthContext);
export default useAuth;
