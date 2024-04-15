type ApiExportParams = {
  getTemplate?: false;
};
type ApiUpdateParams = {
  id: string;
  data: TApartment | TCustomer | TContract;
};

type ApiFetchParams = {
  page?: 0;
  pageSize?: 10;
  sortBy?: string;
};
/**
 * @param {q} string query
 */
type ApiSearchParams = ApiFetchParams & { q: string };
