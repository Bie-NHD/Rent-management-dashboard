import axios from "axios";
import {
  ApiExportParams,
  ApiFetchParams,
  ApiUpdateParams,
  TApiRequestDTO,
  TApiResponse,
} from "../models";

const TEST_URL = "http://localhost:9090" as const;

const ImportConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const AxiosInstance = axios.create({ baseURL: TEST_URL });

// --------------------------------------------------

const FetchApi = async (url: string, params: ApiFetchParams) =>
  AxiosInstance.get<TApiResponse>(url, { params: params })
    .then(({ data }: { data: TApiResponse }) => data) // AxiosResponse = {data: <T = TApiResponse>, ...others}
    .then((response: TApiResponse) => response.data);

const CreateApi = async (url: string, data: TApiRequestDTO) =>
  AxiosInstance.post<TApiResponse>(url, data).then((response) => response.data);

const UpdateApi = async (url: string, params: ApiUpdateParams) =>
  AxiosInstance.post<TApiResponse>(url + "/" + params.id, params.data).then(
    (response) => response.data
  );

const DeleteApi = async (url: string, params: ApiUpdateParams) =>
  AxiosInstance.post<TApiResponse>(url + "/" + params.id).then(
    (response) => response.data
  );

const ImportApi = async (url: string, formData: FormData) =>
  AxiosInstance.post<TApiResponse>(url, formData, ImportConfig).then(
    (response) => response.data
  );

const ExportApi = async (url: string, params: ApiExportParams) =>
  new URL(url).searchParams.set("getTemplate", `${params.getTemplate}`);

// ---------------------------------------------------

export const Api = Object.freeze({
  fetch: FetchApi,
  update: UpdateApi,
  export: ExportApi,
  import: ImportApi,
  create: CreateApi,
  delete: DeleteApi,
  // apartments
  // getApartments: (params: ApiFetchParams) =>
  //   Api.fetch(ApartmentURLs.GetAll, params),
  // contracts

  // customers
} as const);
