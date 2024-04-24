import { createMutation } from "react-query-kit";
import { Api } from "../api";
import { ApartmentURLs, QK_APARTMENTS } from "../constants";
import toast from "react-hot-toast";
import { QueryClient } from "@tanstack/react-query";

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
