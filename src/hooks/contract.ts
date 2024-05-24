import { createMutation, createQuery } from "react-query-kit";
import { ApartmentRoutes, AppRoutes, ContractRoutes, QK_CONTRACTS } from "../constants";
import { QueryClient, keepPreviousData } from "@tanstack/react-query";
import { Api } from "../api";
import toast from "react-hot-toast";

type UseGetContractsHookReturns = {
  contracts: Contract[];
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
  mutationFn: async (variables: ContractDTO) => Api.create(ContractRoutes.Add, variables),

  onError(error, variables, context) {
    console.log(error);
    toast.error(error.message || "Trouble creating new contract");
  },
});
// TODO: Fix Update contract hook
export const useUpdateContract = createMutation({
  mutationFn: async (variables: { data: ApiUpdateParams<Omit<Apartment, "id">>; action: string }) =>
    variables.action === AppRoutes.Update
      ? Api.update(ContractRoutes.Update, variables.data)
      : Api.delete(ContractRoutes.Delete, variables.data),
  onError(error, variables, context) {
    console.log(error || "Trouble updating apartment");
    toast.error(error.message || "Trouble updating apartment");
  },
});
