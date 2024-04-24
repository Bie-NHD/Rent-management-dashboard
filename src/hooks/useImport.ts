import { createMutation, createQuery } from "react-query-kit";
import { ApartmentURLs, QK_APARTMENTS, StatusCode } from "../constants";
import {
  QueryClient,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import { Api } from "../api";
import { checkChangesFromImportResponse } from "../utils/importUtils";
import React from "react";

type Data = { url: string; formData: FormData };

const importData = (variables: Data) =>
  Api.import(variables.url, variables.formData);

export function useImportFile() {
  const client = useQueryClient();
  return createMutation({
    mutationFn: importData,
    onSuccess(response, variables, context) {
      // const { isSuccess, isChanged } = checkChangesFromImportResponse(response);
      // if (isSuccess && isChanged) {
      const queryKey = variables.url.split("/").at(1);
      client.invalidateQueries({ queryKey: [queryKey] });
      // }
    },
  });
}
