import axios from "axios";
import { ApiRoutes } from "../constants";
import AuthStorageService from "./authStorage";
import { Api } from ".";

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
    console.log("APPEND AUTH HEADER");

    const access_token = AuthStorageService.getAccessToken();
    // LOG
    console.log(`access_token ${access_token}`);

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
  },
  async (error) => Promise.reject(error)
);

// Add a response interceptor
privateInstance.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  (response) => response,
  async (error) => {
    const prevReqConfig = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 || error.response.status === 403) {
      // prevReqConfig._retry = true;
      console.log("LOOK AT THIS RESPONSE ERROR");

      try {
        await Api.refreshToken();

        const access_token = AuthStorageService.getAccessToken();

        // Retry the original request with the new token
        prevReqConfig.headers.Authorization = `Bearer ${access_token}`;
        console.log("ACCESS TOKEN CHANGED");

        return privateInstance(prevReqConfig);
      } catch (error) {
        // Handle refresh token error or redirect to login
        console.log("ERROR while refresh token");
        console.log(error);
      }
    }

    return Promise.reject(error);
  }
);

export default privateInstance;
