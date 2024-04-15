export const TEST_URL = "http://localhost:9090";
/**
 * define actions for each object
 */
enum ApiActions {
  Import = "/import",
  Add = "/add",
  Search = "/search",
  Delete = "/delete",
  Update = "/update",
  Export = "/export",
}
/**
 * define route/URL for each object
 */
enum ApiData {
  Apartment = "/apartments",
  Contract = "/contracts",
  Customer = "/users",
}
/**
 * provide URL for each api action
 */
enum ApiURLs {
  // APARTMENT
  AddApartment = TEST_URL + ApiData.Apartment + ApiActions.Add,
  UpdateApartment = TEST_URL + ApiData.Apartment + ApiActions.Update,
  DeleteApartment = TEST_URL + ApiData.Apartment + ApiActions.Delete,
  ImportApartment = TEST_URL + ApiData.Apartment + ApiActions.Import,
  ExportApartment = TEST_URL + ApiData.Apartment + ApiActions.Export,
  // CONTRACT
  AddContract = TEST_URL + ApiData.Apartment + ApiActions.Add,
  UpdateContract = TEST_URL + ApiData.Apartment + ApiActions.Update,
  DeleteContract = TEST_URL + ApiData.Apartment + ApiActions.Delete,
  ImportContract = TEST_URL + ApiData.Apartment + ApiActions.Import,
  ExportContract = TEST_URL + ApiData.Apartment + ApiActions.Export,
  // CUSTOMER
  AddCustomer = TEST_URL + ApiData.Apartment + ApiActions.Add,
  UpdateCustomer = TEST_URL + ApiData.Apartment + ApiActions.Update,
  DeleteCustomer = TEST_URL + ApiData.Apartment + ApiActions.Delete,
  ImportCustomer = TEST_URL + ApiData.Apartment + ApiActions.Import,
  ExportCustomer = TEST_URL + ApiData.Apartment + ApiActions.Export,
}
