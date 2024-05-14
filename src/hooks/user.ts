import { keepPreviousData } from "@tanstack/react-query";
import { createQuery } from "react-query-kit";
import { Api } from "../api";
import { QK_USERS, ApiRoutes, QK_USER } from "../constants";
import UserApi from "../api/user";

type UseGetUserHookReturns = {
  data: IUser[];
  meta: { totalRowCount: number };
};

export const useGetUsers = createQuery<UseGetUserHookReturns, ApiFetchParams>({
  queryKey: [QK_USERS],
  fetcher: (variables: ApiFetchParams): Promise<UseGetUserHookReturns> =>
    Api.fetch<TUserApiResponse>(ApiRoutes.user.index, variables).then((value) => ({
      data: value.users,
      meta: {
        totalRowCount: value.page.totalElements,
      },
    })),
  placeholderData: keepPreviousData,
});

export const useUser = createQuery({
  queryKey: [QK_USER],
  fetcher: async () => {
    return await UserApi.details();
  },
  placeholderData: keepPreviousData,
  refetchInterval: 60000,
});
