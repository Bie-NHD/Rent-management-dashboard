import axios from "axios";
import { ApiRoutes } from "../constants";
import privateInstance from "./privateInstance";
import AuthStorageService from "./authStorage";
import AuthApi from "./auth";
("./webStorage");
export { default as AuthApi } from "./auth";

const TEST_URL = "http://localhost:9090" as const;

const ImportConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

// --------------------------------------------------

const FetchApi = async <TData>(url: string, params: ApiFetchParams) =>
  privateInstance
    .get<TApiResponse<TData>>(url, { params: params })
    .then((response) => response.data.data); // AxiosResponse = {data: <T = TApiResponse>, ...others}

const CreateApi = async (url: string, data: TApiRequestDTO) =>
  privateInstance.post<TApiResponse>(url, data).then((response) => response.data);

const UpdateApi = async (url: string, params: ApiUpdateParams) =>
  privateInstance
    .post<TApiResponse>(url + "/" + params.id, params.data)
    .then((response) => response.data);

const DeleteApi = async (url: string, params: ApiUpdateParams) =>
  privateInstance.delete<TApiResponse>(url + "/" + params.id).then((response) => response.data);

const ImportApi = async (url: string, formData: FormData) =>
  privateInstance
    .post<TApiResponse<ImportResponse>>(url, formData, ImportConfig)
    .then((response) => response.data);

const ExportApi = async (url: string, params: ApiExportParams) =>
  // `http://authorization:Bearer ${AuthStorageService.getAccessToken()}@` +
  // "localhost:9090" +
  // url +
  // `?getTemplate=${params.getTemplate}`;
  privateInstance.get(url, { params: params, responseType: "blob" }).then((res) => {
    console.log(`res ${res.headers}`);

    return res.data;
  });

const SearchApi = async (url: string, params: ApiSearchParams) =>
  privateInstance.get(url, { params: params }).then((response) => response.data);

// ---------------------------------------------------

export const Api = Object.freeze({
  fetch: FetchApi,
  update: UpdateApi,
  export: ExportApi,
  import: ImportApi,
  create: CreateApi,
  delete: DeleteApi,
} as const);
