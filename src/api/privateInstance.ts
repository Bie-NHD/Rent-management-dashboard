import axios from "axios";
import { ApiRoutes } from "../constants";
import AuthStorageService from "./authStorage";
import { AuthApi } from ".";

const TEST_URL = "http://localhost:9090" as const;

const privateInstance = axios.create({
  baseURL: TEST_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// https://blog.theashishmaurya.me/handling-jwt-access-and-refresh-token-using-axios-in-react-app

privateInstance.interceptors.request.use(
  // Do something before request is sent
  (config) => {
    const getToken = AuthStorageService.getAccessToken();
    getToken.then(
      (token) => {
        config.headers.Authorization = `Bearer ${token}`;
        console.info("New access_token appended...");
      },
      (error) => Promise.reject(error)
    );

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
privateInstance.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  null,
  async (error) => {
    const prevReqConfig = error.config;

    try {
      // If the error status is 401 and there is no originalRequest._retry flag,
      // it means the token has expired and we need to refresh it
      if (error.response.status === 401 || error.response.status === 403) {
        // prevReqConfig._retry = true;
        console.info("Attempting to refresh tokens...");

        AuthApi.refreshToken().catch((error) => {
          throw error;
        });

        AuthStorageService.getAccessToken()
          // Retry the original request with the new token
          .then((access_token) => {
            prevReqConfig.headers.Authorization = `Bearer ${access_token}`;
            console.info("New access_token appended...");
            return privateInstance(prevReqConfig);
          })
          // Handle refresh token error or redirect to login
          .catch((error) => {
            // console.error(`ERROR while refresh token\n${error}`);
            throw error;
          });
      }
    } catch (error) {
      console.error(`ERROR while refresh token\n${error}`);
      AuthStorageService.removeAccessToken();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default privateInstance;
