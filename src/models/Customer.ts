type TCustomer = TCustomerDTO & {
  id: string;
  status: ECustomerStatus;
};

type TCustomerDTO = {
  firstName: string;
  lastName: string;
  address: string;
  age: number;
};
