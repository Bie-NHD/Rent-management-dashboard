import { createQuery } from "react-query-kit";
import { ApartmentURLs, QK_APARTMENTS } from "../constants";
import { keepPreviousData } from "@tanstack/react-query";
import { Api } from "../api";

type Data = {
  data: Apartment[];
  meta: { totalRowCount: number };
};

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
