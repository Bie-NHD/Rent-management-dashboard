type ApiExportParams = {
  getTemplate: false;
};

// For CREATE
type TApiRequestDTO =
  | Omit<Apartment, "id">
  | TContractDTO
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

type TApartmentApiResponse = {
  apartments: Apartment[];
  page: TPagination;
};

type TContractApiResponse = {
  page: TPagination;
  contracts: TContract[];
};

type TCustomerApiResponse = {
  page: TPagination;
  customers: Customer[];
};

type TImportResponse = {
  "The rows failed": string;
  "Number of successful rows": number;
  File: string; // file name
}[];

type TApiResponse<
  TData =
    | TApartmentApiResponse
    | TContractApiResponse
    | TCustomerApiResponse
    | TImportResponse
> = {
  data: TData;
  message: string;
  statusCode: number;
};
