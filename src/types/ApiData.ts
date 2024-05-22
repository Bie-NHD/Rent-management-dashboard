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

type User = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  createDate: string;
  active: boolean;
  role: string;
};

// type Customer = {
//   id: string;
//   status: ECustomerStatus;
//   firstName: string;
//   lastName: string;
//   address: string;
//   age: number;
// };

type Customer = {
  id: string;
  address: string;
  fullName: string;
  citizenId: string;
  dob: string;
  phoneNumber: string;
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

type UserVM = Pick<User, "id" | "email" | "createDate" | "role" | "username" | "active">;

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

type ContractResponseDTO = {
  apartmentId: string;
createDate: string;
customerId: string;
endDate: string;
id: string;
retailPrice:number;
startDate:string;
total:number;
userId: string;
}

type UserUpdateDTO = Pick<User, "email" | "role" | "active" | "fullName">;
type UserCreateDTO = Omit<UserUpdateDTO, "active"> & Pick<User, "username">;
type ApartmentUpdateDTO = Omit<Apartment, "id">;
type CustomerUpdateDTO = Omit<Customer, "id">;
type ChangePasswordDTO = {
  currentPassword: string;
  newPassword: string;
};
type TApiUpdateDTO =
  | ApartmentUpdateDTO
  | ContractDTO
  | CustomerUpdateDTO
  | UserCreateDTO
  | UserUpdateDTO
  | ChangePasswordDTO;

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
type ApiSearchParams = ApiFetchParams & { q: string };

// LOGIN
type ApiLoginParams = {
  username: string;
  password: string;
};

type ApartmentApiResponse = {
  apartments: Apartment[];
  page: TPagination;
};

type ContractApiResponse = {
  page: TPagination;
  contracts: ContractResponseDTO[];
};

type CustomerApiResponse = {
  page: TPagination;
  customers: Customer[];
};

type UserApiResponse = {
  page: TPagination;
  users: User[];
};

type ImportResponseData = {
  "The rows failed": string;
  "Number of successful rows": number;
  File: string; // file name
};

type ImportResponse = ImportResponseData[];

// TODO: check data type

type TokenData = {
  role: string;
  iss: string; //issuer
  iat: 1716227715; //issuedAt
  exp: 1716228015;
};

type AuthTokens = {
  access_token: string;
  refresh_token: string;
};

type ApiQueryStatus = {
  message: string;
  statusCode: number;
};

type ApiResponseData =
  | ApartmentApiResponse
  | ContractApiResponse
  | CustomerApiResponse
  | ImportResponse
  | AuthTokens
  | UserApiResponse;

type ApiResponse<TData = ApiResponseData> = ApiQueryStatus & {
  data: TData;
};
