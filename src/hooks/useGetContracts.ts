import { createQuery } from "react-query-kit";
import { ContractURLs, QK_CONTRACTS } from "../constants";
import { keepPreviousData } from "@tanstack/react-query";
import { Api } from "../api";

type Data = {
  data: TContract[];
  meta: { totalRowCount: number };
};

export const useGetContracts = createQuery<Data, ApiFetchParams>({
  queryKey: [QK_CONTRACTS],
  fetcher: (variables: ApiFetchParams): Promise<Data> =>
    Api.fetch<TContractApiResponse>(ContractURLs.GetAll, variables).then(
      (value) => ({
        data: value.contracts,
        meta: {
          totalRowCount: value.page.totalElements,
        },
      })
    ),
  placeholderData: keepPreviousData,
});
