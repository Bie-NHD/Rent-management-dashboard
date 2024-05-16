import { keepPreviousData } from "@tanstack/react-query";
import { createQuery } from "react-query-kit";
import { Api } from "../api";
import { QK_USERS, ApiRoutes, QK_USER } from "../constants";
import UserApi from "../api/user";

export const useGetUsers = createQuery<UseGetUserHookReturns, ApiFetchParams>({
  queryKey: [QK_USERS],
  fetcher: (variables: ApiFetchParams): Promise<UseGetUserHookReturns> =>
    Api.fetch<TUserApiResponse>(ApiRoutes.user.index, variables).then((value) => ({
      users: value.users,
      meta: {
        totalRowCount: value.page.totalElements,
      },
    })),
  placeholderData: keepPreviousData,
});

export const useGetUser = createQuery({
  queryKey: [QK_USER],
  fetcher: async () => {
    console.log(`FETCHING USER FROM HOOK ${new Date()}`);
    return await UserApi.details();
  },
  placeholderData: keepPreviousData,
  refetchInterval: 60000,
});
