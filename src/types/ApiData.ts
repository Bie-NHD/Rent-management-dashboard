type ApiExportParams = {
  getTemplate: false;
};

// For CREATE
type TApiRequestDTO =
  | Omit<Apartment, "id">
  | ContractDTO
  | Omit<Customer, "id" | "status">;

// For UPDATE, DELTE
type ApiUpdateParams<TData = TApiRequestDTO> = {
  id: string;
  data: TData;
};

type ApiFetchParams = {
  page: 0 | number;
  pageSize: 10 | number;
  sortBy?: string;
};
/**
 * @param {q} string query
 */
type ApiSearchParams = Omit<ApiFetchParams, "sortBy"> & { q: string };

// LOGIN
type ApiLoginParams = {
  username: string;
  password: string;
};

type TApartmentApiResponse = {
  apartments: Apartment[];
  page: TPagination;
};

type TContractApiResponse = {
  page: TPagination;
  contracts: Contract[];
};

type TCustomerApiResponse = {
  page: TPagination;
  customers: Customer[];
};

type TUserApiResponse = {
  page: TPagination;
  users: IUser[];
};

type ImportResponseData = {
  "The rows failed": string;
  "Number of successful rows": number;
  File: string; // file name
};

type ImportResponse = ImportResponseData[];

type TLoginApiResponse = {
  access_token: string;
  refresh_token: string;
};

type TApiResponse<
  TData =
    | TApartmentApiResponse
    | TContractApiResponse
    | TCustomerApiResponse
    | ImportResponse
    | TLoginApiResponse
    | TUserApiResponse
> = {
  data: TData;
  message: string;
  statusCode: number;
};
