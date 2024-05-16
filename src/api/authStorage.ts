const ACCESS_TOKEN = "access_token" as const;
const REFRESH_TOKEN = "refresh_token" as const;

const getAccessToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) console.log(`No access_token available`);
  return token;
};
const getRefreshToken = () => {
  const token = localStorage.getItem(REFRESH_TOKEN);
  if (!token) {
    console.log(`No refresh_token available`);
    removeAccessToken();
    throw Error("JWT Error: No refresh_token");
  }
  return token;
};
const setAccessToken = (token: string) => localStorage.setItem(ACCESS_TOKEN, token);
const setRefreshToken = (token: string) => localStorage.setItem(REFRESH_TOKEN, token);
const removeAllTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};
const removeAccessToken = () => {
  if (getAccessToken()) {
    localStorage.removeItem(ACCESS_TOKEN);
    console.log(`${ACCESS_TOKEN} removed.`);
  }
};
const refreshTokens = (tokens: TAuthTokens) => {
  setAccessToken(tokens.access_token);
  setRefreshToken(tokens.refresh_token);
};

const AuthStorageService = Object.freeze({
  getAccessToken: getAccessToken,
  getRefreshToken: getRefreshToken,
  setAccessToken: setAccessToken,
  // setRefreshToken: setRefreshToken,
  removeAllTokens: removeAllTokens,
  refreshTokens: refreshTokens,
  removeAccessToken: removeAccessToken,
});
export default AuthStorageService;
