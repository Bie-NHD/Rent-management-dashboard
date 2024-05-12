import axios from "axios";
import { ApiRoutes } from "../constants";
import privateInstance from "./privateInstance";
import WebStorageService from "./webStorage";
("./webStorage");

const TEST_URL = "http://localhost:9090" as const;

const ImportConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const authInstance = axios.create({
  baseURL: TEST_URL,
});

// --------------------------------------------------

const FetchApi = async <TData>(url: string, params: ApiFetchParams) =>
  privateInstance
    .get<TApiResponse<TData>>(url, { params: params })
    .then((response) => response.data.data); // AxiosResponse = {data: <T = TApiResponse>, ...others}

const CreateApi = async (url: string, data: TApiRequestDTO) =>
  privateInstance
    .post<TApiResponse>(url, data)
    .then((response) => response.data);

const UpdateApi = async (url: string, params: ApiUpdateParams) =>
  privateInstance
    .post<TApiResponse>(url + "/" + params.id, params.data)
    .then((response) => response.data);

const DeleteApi = async (url: string, params: ApiUpdateParams) =>
  privateInstance
    .delete<TApiResponse>(url + "/" + params.id)
    .then((response) => response.data);

const ImportApi = async (url: string, formData: FormData) =>
  privateInstance
    .post<TApiResponse<ImportResponse>>(url, formData, ImportConfig)
    .then((response) => response.data);

const ExportApi = (url: string, params: ApiExportParams) =>
  TEST_URL + url + `?getTemplate=${params.getTemplate}`;

const SearchApi = async (url: string, params: ApiSearchParams) =>
  privateInstance
    .get(url, { params: params })
    .then((response) => response.data);

const LoginApi = async (params: ApiLoginParams) =>
  await authInstance
    .post<TApiResponse<TLoginApiResponse>>(ApiRoutes.auth.login, params)
    .then((response) => response.data)
    .then((authResponse) => {
      if (authResponse.statusCode === 200) {
        const { access_token, refresh_token } = authResponse.data;
        WebStorageService.setAccessToken(access_token);
        WebStorageService.setRefreshToken(refresh_token);

        return access_token;
      }
    });

/**
 *
 * @returns {string} access_token
 */
const RefreshTokenApi = () => {
  const refresh_token = WebStorageService.getRefreshToken();
  return authInstance
    .post<TApiResponse<TLoginApiResponse>>(
      ApiRoutes.auth.refreshToken,
      refresh_token,
      { withCredentials: true }
    )
    .then((response) => {
      const { access_token, refresh_token } = response.data.data;
      WebStorageService.setRefreshToken(refresh_token);
      return access_token;
    });
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
  refreshToken: RefreshTokenApi,
} as const);
