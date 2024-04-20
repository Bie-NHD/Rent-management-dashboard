// type ArrayDate = {
//   date: [number, number, number];
//   getDay: () => ArrayDate.date
// };

import Apartment from "./Apartment";
import { Customer } from "./Customer";

type TContract = {
  id: string;
  startDate: [number, number, number];
  endDate: [number, number, number];
  customer: Customer;
  apartment: Apartment;
};

type TContractDTO = {
  apartmentId: string;
  customerId: string;
  endDate: string;
  startDate: string;
};
