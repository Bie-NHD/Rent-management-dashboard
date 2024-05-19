import { createMutation, createQuery } from "react-query-kit";
import { Api } from "../api";
import { ApartmentURLs, AppRoutes, CustomerRoutes, QK_APARTMENTS } from "../constants";
import toast from "react-hot-toast";
import { QueryClient, keepPreviousData } from "@tanstack/react-query";

export const useCreateCustomer = createMutation({
  mutationFn: async (variables: CustomerUpdateDTO) => Api.create(CustomerRoutes.Add, variables),
});
/**
 * To ```edit``` & ```delete``` Apartments
 @param data data
 @param action from ```ApiActions```
 */
export const useUpdateCustomer = createMutation({
  mutationFn: async (variables: ApiUpdateParams<CustomerUpdateDTO>) => Api.update(CustomerRoutes.Update, variables),
  onError(error, variables, context) {
    console.log(error || "Trouble updating customer");
    toast.error(error.message || "Trouble updating customer");
  },
});
export const useDeleteCustomer = createMutation({
  mutationFn: async (variables: ApiUpdateParams<CustomerUpdateDTO>) => Api.delete(CustomerRoutes.Delete, variables),
  onError(error, variables, context) {
    console.log(error || "Trouble updating customer");
    toast.error(error.message || "Trouble updating customer");
  },
});

export const useGetCustomers = createQuery<UseGetCutomerssHookReturns, ApiFetchParams>({
  queryKey: [QK_APARTMENTS],
  fetcher: (variables: ApiFetchParams) =>
    Api.fetch<CustomerApiResponse>(ApartmentURLs.GetAll, variables).then((value) => ({
      data: value.customers,
      meta: {
        totalRowCount: value.page.totalElements,
      },
    })),
  placeholderData: keepPreviousData,
});
