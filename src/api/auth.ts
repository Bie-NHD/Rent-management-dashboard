import axios from "axios";
import { ApiRoutes } from "../constants";
import AuthStorageService from "./authStorage";

const TEST_URL = "http://localhost:9090" as const;

const authInstance = axios.create({
  baseURL: TEST_URL,
  withCredentials: true,
});

const _login = async (params: ApiLoginParams) =>
  await authInstance
    .post<TApiResponse<TLoginApiResponse>>(ApiRoutes.auth.login, params)
    .then((response) => {
      console.log(response.data);

      return response.data;
    })
    .then((authResponse) => {
      console.log(authResponse);

      if (authResponse.statusCode === 200) {
        const { access_token, refresh_token } = authResponse.data;
        AuthStorageService.setAccessToken(access_token);
        AuthStorageService.setRefreshToken(refresh_token);

        return access_token;
      }
    });

/**
 *
 * @returns {string} access_token
 */
const _refreshToken = () => {
  const refresh_token = AuthStorageService.getRefreshToken();
  return authInstance
    .post<TApiResponse<TLoginApiResponse>>(ApiRoutes.auth.refreshToken, {
      refresh_token,
    })
    .then((response) => response.data)
    .then((data) => {
      //   const { access_token, refresh_token } = data.data;

      //   WebStorageService.setRefreshToken(data.data.refresh_token);
      if (data.statusCode === 200) {
        AuthStorageService.refreshTokens(data.data);
        console.log("REFRESH TOKEN CHANGED in Api.refreshToken");
        return data.data;
      } else {
        console.log(data);
        window.location.href = "/login";
        throw Error("REFRESH TOKEN FAILED");
      }
    });
};
const _logout = () => {
  AuthStorageService.removeAllTokens();

  authInstance.get(ApiRoutes.auth.refreshToken);

  console.log("LOGGED OUT");
};
const _forgotPassword = (data: { email: string }) =>
  authInstance
    .post<TApiResponse>(ApiRoutes.auth.resetPassword, null, { params: data })
    .then((res) => res.data)
    .then((apiRes) => ({
      message: apiRes.message,
      statusCode: apiRes.statusCode,
    }));

const AuthApi = Object.freeze({
  login: _login,
  refreshToken: _refreshToken,
  logout: _logout,
  forgotPassword: _forgotPassword,
} as const);
export default AuthApi;
