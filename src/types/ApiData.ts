import { Apartment, Customer, TPagination } from ".";

export type ApiExportParams = {
  getTemplate: false;
};

// For CREATE
export type TApiRequestDTO =
  | Omit<Apartment, "id">
  | TContractDTO
  | Omit<Customer, "id" | "status">;

// For UPDATE, DELTE
export type ApiUpdateParams<TData = TApiRequestDTO> = {
  id: string;
  data: TData;
};

export type ApiFetchParams = {
  page: 0 | number;
  pageSize: 10 | number;
  sortBy?: string;
};
/**
 * @param {q} string query
 */
export type ApiSearchParams = ApiFetchParams & { q: string };

export type TApartmentApiResponse = {
  apartments: Apartment[];
  page: TPagination;
};

export type TContractApiResponse = {
  page: TPagination;
  contracts: TContract[];
};

export type TCustomerApiResponse = {
  page: TPagination;
  customers: Customer[];
};

export type TApiResponseData =
  | TApartmentApiResponse
  | TContractApiResponse
  | TCustomerApiResponse;

export type TApiResponse = {
  data: TApiResponseData;
  message: string;
  statusCode: number;
};
