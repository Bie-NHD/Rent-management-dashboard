import { transformArrayDateToString } from "./stringFormats";

function transformToTContractDTO(contract: Contract): ContractDTO {
  return {
    apartmentId: contract.apartment.id,
    customerId: contract.customer.id,
    startDate: transformArrayDateToString(contract.startDate),
    endDate: transformArrayDateToString(contract.endDate),
  };
}

export default transformToTContractDTO;
