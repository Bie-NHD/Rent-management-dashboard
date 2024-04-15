type TApiResponseData = {
  data: TApartment[] | TContract[] | TCustomer[];
  page: TApartment;
};

type TApiRequestData = TApartmentDTO | TContractDTO | TCustomerDTO;

type TApiResponse = {
  data: TApiResponseData;
  message: string;
};
