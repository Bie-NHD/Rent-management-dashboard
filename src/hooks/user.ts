import { keepPreviousData } from "@tanstack/react-query";
import { createMutation, createQuery } from "react-query-kit";
import { Api } from "../api";
import { QK_USERS, ApiRoutes, QK_ACCOUNT, QK_ACCESS_TOKEN } from "../constants";
import UserApi from "../api/user";
import AuthStorageService from "../api/authStorage";

export const useGetUsers = createQuery<UseGetUserHookReturns, ApiFetchParams>({
  queryKey: [QK_USERS],
  fetcher: (variables: ApiFetchParams): Promise<UseGetUserHookReturns> =>
    Api.fetch<UserApiResponse>(ApiRoutes.user.index, variables).then((value) => ({
      data: value.users,
      meta: {
        totalRowCount: value.page.totalElements,
      },
    })),
  placeholderData: keepPreviousData,
});

export const useGetUser = createQuery({
  queryKey: [QK_ACCOUNT],
  fetcher: async () => {
    console.log(`FETCHING USER FROM HOOK ${new Date()}`);
    return await UserApi.details();
  },
  // placeholderData: keepPreviousData,
  staleTime: Infinity,
});

export const useGetAccessToken = createQuery<string | null>({
  fetcher: () => {
    console.log(`fetching tokens`);
    return AuthStorageService.getAccessToken();
  },
  queryKey: [QK_ACCESS_TOKEN],
  initialData: null,
  placeholderData: null,
  refetchInterval: 120000,
});

export const useCreateUser = createMutation({
  mutationFn: (variables: UserCreateDTO) => Api.create(ApiRoutes.user.add, variables),
  onError(error, variables, context) {
    console.log(error);
  },
});

export const useUpdateUser = createMutation({
  mutationFn: (variables: { data: UserUpdateDTO } & { id: string }) =>
    Api.update<UserUpdateDTO>(ApiRoutes.user.update, variables),
});

export const useToggleBlockUser = createMutation({
  mutationFn: (variables: { active: boolean } & { id: string }) =>
    Api.instance
      .post<ApiResponse>(
        `${variables.active ? ApiRoutes.user.block : ApiRoutes.user.unblock}/${variables.id}`
      )
      .then((res) => res.data),
});
