import { createMutation, createQuery } from "react-query-kit";
import { ApartmentRoutes, AppRoutes, ContractRoutes, QK_CONTRACTS } from "../constants";
import { QueryClient, keepPreviousData } from "@tanstack/react-query";
import { Api } from "../api";
import toast from "react-hot-toast";

type UseGetContractsHookReturns = {
  contracts: ContractResponseDTO[];
  meta: { totalRowCount: number };
};

export const useGetContracts = createQuery<UseGetContractsHookReturns, ApiFetchParams>({
  queryKey: [QK_CONTRACTS],
  fetcher: (variables: ApiFetchParams): Promise<UseGetContractsHookReturns> =>
    Api.fetch<ContractApiResponse>(ContractRoutes.GetAll, variables).then((value) => ({
      contracts: value.contracts,
      meta: {
        totalRowCount: value.page.totalElements,
      },
    })),
  placeholderData: keepPreviousData,
});

export const useCreateContract = createMutation({
  mutationFn: async (variables: Omit<Apartment, "id">) =>
    Api.create(ApartmentRoutes.Add, variables),

  onError(error, variables, context) {
    console.log(error);
    toast.error(error.message || "Trouble creating new apartment");
  },
});
/**
 * To ```edit``` & ```delete``` Apartments
 @param data data
 @param action from ```ApiActions```
 */
export const useUpdateContract = createMutation({
  mutationFn: async (variables: { data: ApiUpdateParams<Omit<Apartment, "id">>; action: string }) =>
    variables.action === AppRoutes.Update
      ? Api.update(ApartmentRoutes.Update, variables.data)
      : Api.delete(ApartmentRoutes.Delete, variables.data),
  onError(error, variables, context) {
    console.log(error || "Trouble updating apartment");
    toast.error(error.message || "Trouble updating apartment");
  },
});
