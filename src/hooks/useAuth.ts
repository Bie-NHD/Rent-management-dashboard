import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
const useAuth = (): UseAuthHookResult => useContext(AuthContext);
export default useAuth;
