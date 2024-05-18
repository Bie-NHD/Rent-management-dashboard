import axios, { AxiosError } from "axios";
import { ApiRoutes } from "../constants";
import AuthStorageService from "./authStorage";

const TEST_URL = "http://localhost:9090" as const;

const authInstance = axios.create({
  baseURL: TEST_URL,
  withCredentials: true,
});

authInstance.interceptors.request.use(
  // Do something before request is sent
  (config) => config,
  // Do something with request error
  function (error) {
    return Promise.reject(error);
  }
);

const login = async (params: ApiLoginParams) =>
  await authInstance
    .post<TApiResponse<TAuthTokens>>(ApiRoutes.auth.login, params)
    .then((response) => {
      console.log(response.data);
      const _loginResp = response.data;
      if (_loginResp.statusCode === 200) {
        AuthStorageService.refreshTokens(_loginResp.data);
        console.log(`LOGIN SUCCESS`);
      }
      return _loginResp;
    })
    .catch((error) => Promise.reject(error));

const logout = () => {
  AuthStorageService.removeAllTokens();

  return authInstance.get(ApiRoutes.auth.logout).finally(() => {
    console.log("LOGGED OUT");
    return Promise.resolve();
  });
};

const refreshToken = () => {
  const getRefreshToken = AuthStorageService.getRefreshToken();
  const reqAuthToken = getRefreshToken.then(
    (refresh_token) =>
      authInstance
        .post<TApiResponse<TAuthTokens>>(ApiRoutes.auth.refreshToken, { refresh_token })
        .then((response) => response.data),
    (error) => {
      // logout if  no refresh token
      logout();
      return Promise.reject(error);
    }
  );
  const getAuthToken = reqAuthToken.then(
    (response) => {
      if (response.statusCode && response.statusCode === 200) {
        AuthStorageService.refreshTokens(response.data);
        console.log("REFRESH TOKEN CHANGED in Api.refreshToken");
        return Promise.resolve(<TAuthTokens>response.data);
      } else return Promise.reject(new Error("REFRESH TOKEN FAILED"));
    },
    (error) => Promise.reject(error)
  );

  return getAuthToken;
};

const forgotPassword = (data: { email: string }): Promise<ApiQueryStatus> =>
  authInstance
    .post<ApiQueryStatus>(ApiRoutes.auth.resetPassword, null, { params: data })
    .then((res) => res.data)
    .then((apiRes) => ({
      message: apiRes.message,
      statusCode: apiRes.statusCode,
    }));

const getAccessToken = () =>
  AuthStorageService.getAccessToken()
    .then((_) => Promise.resolve(_))
    .catch((error) => Promise.reject(error));

const AuthApi = Object.freeze({
  login,
  refreshToken,
  logout,
  forgotPassword,
  getAccessToken,
} as const);
export default AuthApi;
