import { createMutation } from "react-query-kit";
import Apartment from "../models/Apartment";
import { Api } from "../api";
import { ApartmentURLs, QK_APARTMENTS } from "../constants";
import { useQueryClient } from "@tanstack/react-query";
import queryClient from "../configs/queryClient";
import toast from "react-hot-toast";

export const useCreateApartment = createMutation({
  mutationKey: [],
  mutationFn: async (variables: Omit<Apartment, "id">) =>
    Api.create(ApartmentURLs.Add, variables),
  onSuccess(data,variables) {

    console.log("SUCCESS");
    

    const client = useQueryClient(queryClient);
    client.invalidateQueries({ queryKey: [QK_APARTMENTS] });

    toast.success("SUCCESS 1st");
  },
  onError(error, variables, context) {
    console.log(error);
    
  },
});