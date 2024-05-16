type TPagination = {
  pageNumber: number;
  pageSize: number;
  offset: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  sorted: boolean;
  first: boolean;
  last: boolean;
  empty: boolean;
};

interface IUser {
  id: string;
  email: string;
  username: string;
  fullName: string ;
  createDate: string;
  active: boolean;
  role: string;
}

type Customer = {
  id: string;
  status: ECustomerStatus;
  firstName: string;
  lastName: string;
  address: string;
  age: number;
};

type ArrayDate = [number, number, number];

type Contract = {
  id: string;
  startDate: ArrayDate;
  endDate: ArrayDate;
  customer: Customer;
  apartment: Apartment;
};

type Apartment = {
  id: string;
  address: string;
  numberOfRoom: number;
  retailPrice: number;
};
/**
 * Contract View Model for UI to consume
 */
type ContractVM = {
  id: string;
  endDate: string;
  startDate: string;
  customerName: string;
  apartmentId: string;
  apartmentAddress: string;
};

type UserVM = Pick<IUser, "id" | "email" | "createDate" | "role" | "username" | "active">;

type ApiExportParams = {
  getTemplate: false;
};

// For CREATE
type ContractDTO = {
  apartmentId: string;
  customerId: string;
  endDate: string;
  startDate: string;
};
type UserUpdateDTO = Pick<IUser, "email" | "role" | "active" | "fullName">;
type ApartmentUpdateDTO = Omit<Apartment, "id">;
type CustomerUpdateDTO = Omit<Customer, "id" | "status">;
type TApiUpdateDTO = ApartmentUpdateDTO | ContractDTO | CustomerUpdateDTO | UserUpdateDTO;

// For UPDATE, DELTE
type ApiUpdateParams<TData = TApiUpdateDTO> = {
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

type TAuthTokens = {
  access_token: string;
  refresh_token: string;
};

type ApiQueryStatus = {
  message: string;
  statusCode: number;
};

type TApiResponseData =
  | TApartmentApiResponse
  | TContractApiResponse
  | TCustomerApiResponse
  | ImportResponse
  | TAuthTokens
  | TUserApiResponse;

type TApiResponse<TData = TApiResponseData> = ApiQueryStatus & {
  data: TData;
};
