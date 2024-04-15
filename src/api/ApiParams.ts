import TApartment from "../models/TApartment";
import TContract from "../models/TContract";

type ApiExportParams = {
  getTemplate: false;
};
type ApiUpdateParams = {
  id: string;
  data: TApartment | TCustomer | TContract;
};
