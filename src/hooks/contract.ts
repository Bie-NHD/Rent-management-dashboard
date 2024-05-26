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

export const useUpdateContract = createMutation({
  mutationFn: async (variables: { data: ContractDTO; id: string }) =>
    Api.update<ContractDTO>(ContractRoutes.Update, variables),
  onError(error, variables, context) {
    console.log(error || "Trouble updating contract");
    toast.error(error.message || "Trouble updating contract");
  },
});

export const useDeleteContract = createMutation({
  mutationFn: async (variables: { id: string }) => Api.delete(ContractRoutes.Delete, variables),
  onError(error, variables, context) {
    console.log(error || "Trouble updating contract");
    toast.error(error.message || "Trouble updating contract");
  },
});
