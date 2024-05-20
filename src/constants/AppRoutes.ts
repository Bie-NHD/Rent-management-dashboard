/**
 * define actions for each object
 */

const IMPORT = "/import" as const;
const ADD = "/add" as const;
const SEARCH = "/search" as const;
const DELETE = "/delete" as const;
const UPDATE = "/update" as const;
const EXPORT = "/export" as const;
const APARTMENT = "/apartments" as const;
const CONTRACT = "/contracts" as const;
const CUSTOMER = "/customers" as const;
const USER = "/user" as const;
/**
 * App routes in client
 */
export const AppRoutes = Object.freeze({
  Import: "/import",
  Add: "/add",
  Search: "/search",
  Delete: "/delete",
  Update: "/update",
  Export: "/export",
  Apartment: APARTMENT,
  Contract: CONTRACT,
  Customer: CUSTOMER,
  Login: "/login",
  ForgotPassword: "/forgotPassword",
  User: USER,
  Register: "/register",
} as const);

/**
 * provide URL for each api action
 */

const RoutesFactory = (url: string) =>
  Object.freeze({
    GetAll: url,
    Add: url + AppRoutes.Add,
    Update: url + AppRoutes.Update,
    Delete: url + AppRoutes.Delete,
    Import: url + AppRoutes.Import,
    Export: url + AppRoutes.Export,
  } as const);

export const ApartmentURLs = RoutesFactory(APARTMENT);

export const ContractURLs = RoutesFactory(CONTRACT);

export const CustomerRoutes = RoutesFactory(CUSTOMER);

const AuthRoutes = Object.freeze({
  login: "/auth/login",
  refreshToken: "/auth/refreshToken",
  logout: "/auth/logout",
  resetPassword: "/auth/resetPassword",
} as const);

export const UserRoutes = Object.freeze({
  details: "/users/details",
  index: "/users",
  update: "/users/update",
  changePassword: "/users/changePassword",
  add: "/users/add",
} as const);

/**
 * Api routes for server requests
 */

export const ApiRoutes = Object.freeze({
  apartment: ApartmentURLs,
  contract: ContractURLs,
  auth: AuthRoutes,
  user: UserRoutes,
  customer: CustomerRoutes,
} as const);
