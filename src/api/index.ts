import axios from "axios";
import { config } from "localforage";

const TEST_URL = "http://localhost:9090" as const;

const ImportConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const AxiosInstance = axios.create({
  baseURL: TEST_URL,
});

const privateInstance = axios.create({
  baseURL: TEST_URL,
  withCredentials: true,
});

// https://blog.theashishmaurya.me/handling-jwt-access-and-refresh-token-using-axios-in-react-app

AxiosInstance.interceptors.request.use(
  // Do something before request is sent
  (config) => {
    console.log("CONFIG");

    const access_token = localStorage.getItem("access_token");
    // LOG
    console.log(`access_token ${access_token}`);

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
AxiosInstance.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  (response) => {
    console.log("LOOK AT THIS");
    console.log(response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("LOOK AT THIS");

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        // LOG
        console.log(`refresh_token ${refreshToken}`);
        const response = await AxiosInstance.post<
          TApiResponse<TLoginApiResponse>
        >(
          "/auth/refreshToken",
          { refresh_token: refreshToken },
          { withCredentials: true }
        );
        const { access_token, refresh_token } = response.data.data;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  }
);

// --------------------------------------------------

const FetchApi = async <TData>(url: string, params: ApiFetchParams) =>
  AxiosInstance.get<TApiResponse<TData>>(url, { params: params })
    .then((response) => response.data) // AxiosResponse = {data: <T = TApiResponse>, ...others}
    .then((response) => response.data);

const CreateApi = async (url: string, data: TApiRequestDTO) =>
  AxiosInstance.post<TApiResponse>(url, data).then((response) => response.data);

const UpdateApi = async (url: string, params: ApiUpdateParams) =>
  AxiosInstance.post<TApiResponse>(url + "/" + params.id, params.data).then(
    (response) => response.data
  );

const DeleteApi = async (url: string, params: ApiUpdateParams) =>
  AxiosInstance.delete<TApiResponse>(url + "/" + params.id).then(
    (response) => response.data
  );

const ImportApi = async (url: string, formData: FormData) =>
  AxiosInstance.post<TApiResponse<ImportResponse>>(
    url,
    formData,
    ImportConfig
  ).then((response) => response.data);

const ExportApi = (url: string, params: ApiExportParams) =>
  TEST_URL + url + `?getTemplate=${params.getTemplate}`;

const SearchApi = async (url: string, params: ApiSearchParams) =>
  AxiosInstance.get(url, { params: params }).then((response) => response.data);

const LoginApi = (params: ApiLoginParams) =>
  AxiosInstance.post<TApiResponse<TLoginApiResponse>>("/login", params)
    .then((response) => response.data)
    .then((data) => console.log(data));

/**
 *
 * @returns {string} access_token
 */
const RefreshTokenApi = () => {
  const refresh_token = window.localStorage.getItem("refresh_token");

  const access_token = AxiosInstance.post<TApiResponse<TLoginApiResponse>>(
    "/auth/refreshToken",
    refresh_token
  )
    .then((response) => response.data)
    .then((apiResponse) => apiResponse.data.access_token);

  return access_token;
};

// ---------------------------------------------------

export const Api = Object.freeze({
  fetch: FetchApi,
  update: UpdateApi,
  export: ExportApi,
  import: ImportApi,
  create: CreateApi,
  delete: DeleteApi,
  login: LoginApi,
} as const);
