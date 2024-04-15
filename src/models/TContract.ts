import { defaultBaseSortFn } from "match-sorter";
import TApartment from "./TApartment";

// type ArrayDate = {
//   date: [number, number, number];
//   getDay: () => ArrayDate.date
// };

type TContract = {
  id: string;
  startDate: [number, number, number];
  endDate: [number, number, number];
  customer: TCustomer;
  apartment: TApartment;
};

export default TContract;
