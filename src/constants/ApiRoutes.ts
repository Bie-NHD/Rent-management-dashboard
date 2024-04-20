/**
 * define actions for each object
 */
export const ApiRoutes = Object.freeze({
  Import: "/import",
  Add: "/add",
  Search: "/search",
  Delete: "/delete",
  Update: "/update",
  Export: "/export",
  Apartment: "/apartments",
  Contract: "/contracts",
  Customer: "/users",
} as const);
/**
 * provide URL for each api action
 */

export const ApartmentURLs = Object.freeze({
  GetAll: ApiRoutes.Apartment,
  Add: ApiRoutes.Apartment + ApiRoutes.Add,
  Update: ApiRoutes.Apartment + ApiRoutes.Update,
  Delete: ApiRoutes.Apartment + ApiRoutes.Delete,
  Import: ApiRoutes.Apartment + ApiRoutes.Import,
  Export: ApiRoutes.Apartment + ApiRoutes.Export,
} as const);

export const ContractURLs = Object.freeze({
  GetAll: ApiRoutes.Contract,
  Add: ApiRoutes.Contract + ApiRoutes.Add,
  Update: ApiRoutes.Contract + ApiRoutes.Update,
  Delete: ApiRoutes.Contract + ApiRoutes.Delete,
  Import: ApiRoutes.Contract + ApiRoutes.Import,
  Export: ApiRoutes.Contract + ApiRoutes.Export,
} as const);
