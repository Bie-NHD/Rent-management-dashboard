/**
 * define actions for each object
 */
export const ApiActions = Object.freeze({
  Import: "/import",
  Add: "/add",
  Search: "/search",
  Delete: "/delete",
  Update: "/update",
  Export: "/export",
} as const);
/**
 * define route/URL for each object
 */
const ApiData = Object.freeze({
  Apartment: "/apartments",
  Contract: "/contracts",
  Customer: "/users",
} as const);
/**
 * provide URL for each api action
 */

export const ApartmentURLs = Object.freeze({
  GetAll: ApiData.Apartment,
  Add: ApiData.Apartment + ApiActions.Add,
  Update: ApiData.Apartment + ApiActions.Update,
  Delete: ApiData.Apartment + ApiActions.Delete,
  Import: ApiData.Apartment + ApiActions.Import,
  Export: ApiData.Apartment + ApiActions.Export,
} as const);

export const ContractURLs = Object.freeze({
  GetAll: ApiData.Contract,
  Add: ApiData.Contract + ApiActions.Add,
  Update: ApiData.Contract + ApiActions.Update,
  Delete: ApiData.Contract + ApiActions.Delete,
  Import: ApiData.Contract + ApiActions.Import,
  Export: ApiData.Contract + ApiActions.Export,
} as const);
