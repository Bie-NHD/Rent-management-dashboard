import { createMutation } from "react-query-kit";
import { Api } from "../api";
import { ApartmentURLs, AppRoutes } from "../constants";
import toast from "react-hot-toast";

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
