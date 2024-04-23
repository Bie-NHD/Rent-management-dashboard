import { createMutation } from "react-query-kit";
import { Api } from "../api";
import { ApartmentURLs } from "../constants";
import toast from "react-hot-toast";

export const useCreateApartment = createMutation({
  mutationFn: async (variables: Omit<Apartment, "id">) =>
    Api.create(ApartmentURLs.Add, variables),
  onError(error, variables, context) {
    console.log(error);
    toast.error(error.message || "Trouble creating new apartment");
  },
});
