import { createMutation, createQuery } from "react-query-kit";
import { Api } from "../api";
import {
  ApartmentRoutes,
  AppRoutes,
  CustomerRoutes,
  QK_APARTMENTS,
  QK_CUSTOMERs,
} from "../constants";
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
  mutationFn: async (variables: ApiUpdateParams<CustomerUpdateDTO>) =>
    Api.update(CustomerRoutes.Update, variables),
  onError(error, variables, context) {
    console.log(error || "Trouble updating customer");
    toast.error(error.message || "Trouble updating customer");
  },
});
export const useDeleteCustomer = createMutation({
  mutationFn: async (variables: ApiUpdateParams<CustomerUpdateDTO>) =>
    Api.delete(CustomerRoutes.Delete, variables),
  onError(error, variables, context) {
    console.log(error || "Trouble updating customer");
    toast.error(error.message || "Trouble updating customer");
  },
});

export const useGetCustomers = createQuery<
  UseGetCutomerssHookReturns,
  ApiFetchParams & { q: string }
>({
  queryKey: [QK_CUSTOMERs],
  fetcher: (variables: ApiFetchParams & { q: string }) => {
    const { q, ...others } = variables;

    return !!q
      ? Api.search<CustomerApiResponse>(CustomerRoutes.Search, variables).then((value) => ({
          data: value.customers,
          meta: {
            totalRowCount: value.page.totalElements,
          },
        }))
      : Api.fetch<CustomerApiResponse>(CustomerRoutes.GetAll, { ...others }).then((value) => ({
          data: value.customers,
          meta: {
            totalRowCount: value.page.totalElements,
          },
        }));
  },
  placeholderData: keepPreviousData,
});

export const useGetCustomerById = createQuery({
  queryKey: [QK_CUSTOMERs],
  fetcher: async (variables: { id: string }) =>
    await Api.instance
      .get<ApiResponse<Customer>>(CustomerRoutes.GetAll + `/${variables.id}`)
      .then((res) => res.data?.data),
});
