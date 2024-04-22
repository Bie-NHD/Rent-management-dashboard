/**
 * define actions for each object
 */
export  const  Routes = Object.freeze({
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
  User: "/user"
} as const);
/**
 * provide URL for each api action
 */

export const ApartmentURLs = Object.freeze({
  GetAll: Routes.Apartment,
  Add: Routes.Apartment + Routes.Add,
  Update: Routes.Apartment + Routes.Update,
  Delete: Routes.Apartment + Routes.Delete,
  Import: Routes.Apartment + Routes.Import,
  Export: Routes.Apartment + Routes.Export,
} as const);

export const ContractURLs = Object.freeze({
  GetAll: Routes.Contract,
  Add: Routes.Contract + Routes.Add,
  Update: Routes.Contract + Routes.Update,
  Delete: Routes.Contract + Routes.Delete,
  Import: Routes.Contract + Routes.Import,
  Export: Routes.Contract + Routes.Export,
} as const);
