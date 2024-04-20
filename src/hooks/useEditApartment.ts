import { createMutation } from "react-query-kit";
import Apartment from "../models/Apartment";
import { Api } from "../api";
import { ApartmentURLs, ApiRoutes } from "../constants";
import toast from "react-hot-toast";
import { ApiUpdateParams } from "../models";

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
    variables.action === ApiRoutes.Update
      ? Api.update(ApartmentURLs.Update, variables.data)
      : Api.delete(ApartmentURLs.Delete, variables.data),
  onError(error, variables, context) {
    console.log(error || "Trouble updating apartment");
    toast.error(error.message || "Trouble updating apartment");
  },
});
