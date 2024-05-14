const ACCESS_TOKEN = "access_token" as const;
const REFRESH_TOKEN = "refresh_token" as const;

const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);
const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);
const setAccessToken = (token: string) => localStorage.setItem(ACCESS_TOKEN, token);
const setRefreshToken = (token: string) => localStorage.setItem(REFRESH_TOKEN, token);
const removeAllTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};
const refreshTokens = (tokens: TAuthTokens) => {
  setAccessToken(tokens.access_token);
  setRefreshToken(tokens.refresh_token);
};

const AuthStorageService = Object.freeze({
  getAccessToken: getAccessToken,
  getRefreshToken: getRefreshToken,
  setAccessToken: setAccessToken,
  setRefreshToken: setRefreshToken,
  removeAllTokens: removeAllTokens,
  refreshTokens: refreshTokens,
});
export default AuthStorageService;
