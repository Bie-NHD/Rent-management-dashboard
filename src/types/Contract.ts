type ArrayDate = [number, number, number];

type Contract = {
  id: string;
  startDate: ArrayDate;
  endDate: ArrayDate;
  customer: Customer;
  apartment: Apartment;
};

type ContractDTO = {
  apartmentId: string;
  customerId: string;
  endDate: string;
  startDate: string;
};
