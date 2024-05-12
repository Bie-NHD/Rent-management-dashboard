import { transformArrayDateToString } from "./stringFormats";

export function transformToContractVM(contract: Contract): ContractVM {
  return {
    id: contract.id,
    startDate: transformArrayDateToString(contract.startDate),
    endDate: transformArrayDateToString(contract.endDate),
    customerName: `${contract.customer.firstName} ${contract.customer.lastName}`,
    apartmentId: contract.apartment.id,
    apartmentAddress: contract.apartment.address,
  };
}
