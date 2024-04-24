type ArrayDate = [number, number, number];

type TContract = {
  id: string;
  startDate: ArrayDate;
  endDate: ArrayDate;
  customer: Customer;
  apartment: Apartment;
};

type TContractDTO = {
  apartmentId: string;
  customerId: string;
  endDate: string;
  startDate: string;
};
