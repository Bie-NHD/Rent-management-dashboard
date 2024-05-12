interface UseAuthHookResult {
  token: string | undefined;
  setToken: (token: string) => void;
  login: (params: ApiLoginParams) => void;
  logout: () => void;
  refresh: () => void;
}
