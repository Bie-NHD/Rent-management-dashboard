/**
 * define actions for each object
 */
export const AppRoutes = Object.freeze({
  Import: "/import",
  Add: "/add",
  Search: "/search",
  Delete: "/delete",
  Update: "/update",
  Export: "/export",
  Apartment: "/apartments",
  Contract: "/contracts",
  Customer: "/users",
  Login: "/login",
  User: "/user",
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
