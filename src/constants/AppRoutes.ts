/**
 * define actions for each object
 */

const IMPORT = "/import";
const ADD = "/add";
const SEARCH = "/search";
const DELETE = "/delete";
const UPDATE = "/update";
const EXPORT = "/export";
const APARTMENT = "/apartments";
const CONTRACT = "/contracts";
const CUSTOMER = "/customers";
const USER = "/user";
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

export const ApartmentURLs = Object.freeze({
  GetAll: AppRoutes.Apartment,
  Add: AppRoutes.Apartment + AppRoutes.Add,
  Update: AppRoutes.Apartment + AppRoutes.Update,
  Delete: AppRoutes.Apartment + AppRoutes.Delete,
  Import: AppRoutes.Apartment + AppRoutes.Import,
  Export: AppRoutes.Apartment + AppRoutes.Export,
} as const);

export const ContractURLs = Object.freeze({
  GetAll: AppRoutes.Contract,
  Add: AppRoutes.Contract + AppRoutes.Add,
  Update: AppRoutes.Contract + AppRoutes.Update,
  Delete: AppRoutes.Contract + AppRoutes.Delete,
  Import: AppRoutes.Contract + AppRoutes.Import,
  Export: AppRoutes.Contract + AppRoutes.Export,
} as const);

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
} as const);

/**
 * Api routes for server requests
 */

export const ApiRoutes = Object.freeze({
  apartment: ApartmentURLs,
  contract: ContractURLs,
  auth: AuthRoutes,
  user: UserRoutes,
} as const);
