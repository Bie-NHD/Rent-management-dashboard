import { keepPreviousData } from "@tanstack/react-query";
import { createQuery } from "react-query-kit";
import { ApiRoutes, QK_STAT_APARMENT, QK_STAT_CUSTOMER, QK_STAT_USER } from "../constants";
import { Api } from "../api";

// export const useGetApartmentCount = createQuery({
//   queryKey: [QK_STAT_APARMENT],
//   fetcher: () => Api.statistic.apartmentCount,
//   placeholderData: keepPreviousData,
//   initialData: null,
// });
// export const useGetCustomerCount = createQuery({
//   queryKey: [QK_STAT_CUSTOMER],
//   fetcher: () => Api.statistic.customerCount,
//   placeholderData: keepPreviousData,
//   initialData: null,
// });

// export const useGetUserCount = createQuery({
//   queryKey: [QK_STAT_USER],
//   fetcher: () => Api.statistic.userCount,
//   placeholderData: keepPreviousData,
//   initialData: null,
// });
