import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = (): AuthContextReturns => useContext(AuthContext);
export default useAuth;
