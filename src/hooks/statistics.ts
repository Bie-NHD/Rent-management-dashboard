import { keepPreviousData } from "@tanstack/react-query";
import { createQuery } from "react-query-kit";
import { ApiRoutes, QK_STAT_APARMENT, QK_STAT_CUSTOMER, QK_STAT_USER } from "../constants";
import { Api } from "../api";

export const useGetApartmentCount = createQuery({
  queryKey: [QK_STAT_APARMENT],
  fetcher: () =>
    Api.instance
      .get<ApiResponse<{ count: number }>>(ApiRoutes.apartment.Statistics)
      .then((res) => res.data.data?.count),
  placeholderData: keepPreviousData,
});
export const useGetCustomerCount = createQuery({
  queryKey: [QK_STAT_CUSTOMER],
  fetcher: () =>
    Api.instance
      .get<ApiResponse<{ count: number }>>(ApiRoutes.customer.Statistics)
      .then((res) => res.data.data?.count),
  placeholderData: keepPreviousData,
});

export const useGetUserCount = createQuery({
  queryKey: [QK_STAT_USER],
  fetcher: () =>
    Api.instance
      .get<ApiResponse<{ count: number }>>(ApiRoutes.user.Statistics)
      .then((res) => res.data.data?.count),
  placeholderData: keepPreviousData,
});
