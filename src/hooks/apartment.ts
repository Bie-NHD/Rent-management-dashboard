import { createMutation, createQuery } from "react-query-kit";
import { Api } from "../api";
import { ApartmentURLs, AppRoutes, QK_APARTMENTS } from "../constants";
import toast from "react-hot-toast";
import { QueryClient, keepPreviousData } from "@tanstack/react-query";

type Data = {
  data: Apartment[];
  meta: { totalRowCount: number };
};

export const useCreateApartment = (client: QueryClient) =>
  createMutation({
    mutationFn: async (variables: Omit<Apartment, "id">) =>
      Api.create(ApartmentURLs.Add, variables),
    onSuccess(data, variables, context) {
      toast.success(data.message);
      client.invalidateQueries({ queryKey: [QK_APARTMENTS] });
    },
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
export const useUpdateApartment = createMutation({
  mutationFn: async (variables: {
    data: ApiUpdateParams<Omit<Apartment, "id">>;
    action: string;
  }) =>
    variables.action === AppRoutes.Update
      ? Api.update(ApartmentURLs.Update, variables.data)
      : Api.delete(ApartmentURLs.Delete, variables.data),
  onError(error, variables, context) {
    console.log(error || "Trouble updating apartment");
    toast.error(error.message || "Trouble updating apartment");
  },
});

export const useGetApartments = createQuery<Data, ApiFetchParams>({
  queryKey: [QK_APARTMENTS],
  fetcher: (variables: ApiFetchParams): Promise<Data> =>
    Api.fetch<TApartmentApiResponse>(ApartmentURLs.GetAll, variables).then(
      (value) => ({
        data: value.apartments,
        meta: {
          totalRowCount: value.page.totalElements,
        },
      })
    ),
  placeholderData: keepPreviousData,
});
