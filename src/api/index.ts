import axios from "axios";
import { ApiRoutes } from "../constants";
import privateInstance from "./privateInstance";
import AuthStorageService from "./authStorage";
import AuthApi from "./auth";
import { config } from "localforage";
("./webStorage");
export { default as AuthApi } from "./auth";

const TEST_URL = "http://localhost:9090" as const;

const ImportConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

// --------------------------------------------------

const FetchApi = async <TData>(url: string, params: Partial<ApiFetchParams>) =>
  privateInstance
    .get<ApiResponse<TData>>(url, { params: params })
    .then((response) => response.data.data); // AxiosResponse = {data: <T = TApiResponse>, ...others}

const CreateApi = async (url: string, data: TApiUpdateDTO) =>
  privateInstance.post<ApiResponse>(url, data).then((response) => response.data);

const UpdateApi = async <TData = TApiUpdateDTO>(url: string, params: ApiUpdateParams<TData>) =>
  privateInstance
    .post<ApiResponse>(url + "/" + params.id, params.data)
    .then((response) => response.data);

const DeleteApi = async (url: string, params: { id: string }) =>
  privateInstance.delete<ApiResponse>(url + "/" + params.id).then((response) => response.data);

const ImportApi = async (url: string, formData: FormData) =>
  privateInstance
    .post<ApiResponse<ImportResponse>>(url, formData, ImportConfig)
    .then((response) => response.data);
/**
 * Cannot access resp's custom headers
 * https://stackoverflow.com/questions/37897523/axios-get-access-to-response-header-fields
 */
const ExportApi = async (url: string, params: ApiExportParams) =>
  privateInstance.get(url, { params: params, responseType: "blob" }).then((res) => res.data);

const SearchApi = async <TData>(url: string, params: ApiSearchParams) =>
  privateInstance
    .get<ApiResponse<TData>>(url, { params: params })
    .then((response) => response.data.data);

// ---------------------------------------------------

export const Api = Object.freeze({
  instance: privateInstance,
  fetch: FetchApi,
  update: UpdateApi,
  export: ExportApi,
  import: ImportApi,
  create: CreateApi,
  delete: DeleteApi,
  search: SearchApi,
} as const);
