import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useAuth = (): IUseAuthHookReturns => useContext(AuthContext);
export default useAuth;
