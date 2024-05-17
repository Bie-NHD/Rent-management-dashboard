const ACCESS_TOKEN = "access_token" as const;
const REFRESH_TOKEN = "refresh_token" as const;

const no_available = (type: string) => `No ${type} available.`;

const getAccessToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) {
    return Promise.reject(new Error(no_available(ACCESS_TOKEN)));
  }
  return Promise.resolve(token);
};
const getRefreshToken = () => {
  const token = localStorage.getItem(REFRESH_TOKEN);
  if (!token) {
    console.log(`No refresh_token available`);
    removeAccessToken();
    return Promise.reject(new Error("JWT Error: No refresh_token"));
  }
  return Promise.resolve(token);
};
const setAccessToken = (token: string) => localStorage.setItem(ACCESS_TOKEN, token);
const setRefreshToken = (token: string) => localStorage.setItem(REFRESH_TOKEN, token);
const removeAllTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};
const removeAccessToken = () => {
  getAccessToken().then(
    () => {
      localStorage.removeItem(ACCESS_TOKEN);
      console.log(`${ACCESS_TOKEN} removed.`);
      return Promise.resolve();
    },
    (error) => Promise.reject(error)
  );
};
const refreshTokens = (tokens: TAuthTokens) => {
  setRefreshToken(tokens.refresh_token);
  setAccessToken(tokens.access_token);
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
