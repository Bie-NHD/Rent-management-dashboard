import { useEffect } from "react";
import useAuth from "./useAuth";
import { Api } from "../api";

const useRefreshToken = () => {
  const { setToken } = useAuth();

  const refresh = async () => {
    const refresh_token = localStorage.getItem("refresh_token");

    const access_token = await Api.refreshToken(refresh_token);

    console.log(access_token);

    setToken(access_token);

    return access_token;
  };

  return { refresh };
};

export default useRefreshToken;
