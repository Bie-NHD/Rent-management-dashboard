import { object, string } from "yup";
import zustand, { create, createStore } from "zustand";
import { useStore } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
// https://doichevkostia.dev/blog/authentication-store-with-zustand/

const AuthStoreSchema = object({
  role: string().oneOf(["MANAGER", "STAFF"]),
});

type TUseAuthStore = {
  user: User | undefined;
} & AuthTokens;

type TAuthTokenStore = {
  access_token: string | null | undefined;
  refresh_token: string | null | undefined;
};
type TAuthStoreActions = {
  setAccessToken: (accessToken: string | undefined) => void;
  setRefreshToken: (refreshToken: string | undefined) => void;
};

const initialState: TAuthTokenStore = {
  access_token: undefined,
  refresh_token: undefined,
};

// https://github.com/pmndrs/zustand?tab=readme-ov-file#typescript-usage
// https://github.com/pmndrs/zustand/discussions/2026
export const useAuthTokenStore = create<TAuthTokenStore & { actions: TAuthStoreActions }>()(
  persist(
    (set, get) => ({
      ...initialState,
      actions: {
        setAccessToken: (access_token) => {
          set({ access_token });
        },
        setRefreshToken: (refresh_token) => {
          set({ refresh_token });
        },
        removeAlltokens: () =>
          set({
            access_token: null,
            refresh_token: null,
          }),
      },
    }),
    {
      name: "auth_store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// getters
export const getAccessToken = () => useAuthTokenStore.getState().access_token;
export const getRefreshToken = () => useAuthTokenStore.getState().refresh_token;
export const getAuthStoreActions = () => useAuthTokenStore.getState().actions;

// hooks
export const useAuthActions = () => useAuthTokenStore((state) => state.actions);
