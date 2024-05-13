import { useEffect } from "react";
import useAuth from "./useAuth";
import { Api } from "../api";
import AuthStorageService from "../api/authStorage";

const useRefreshToken = () => {
  const { setToken } = useAuth();

  const refresh = async () => {
    const { access_token } = await Api.refreshToken();

    setToken(access_token);

    return access_token;
  };

  return { refresh };
};

export default useRefreshToken;
