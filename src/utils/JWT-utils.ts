import * as jose from "jose";

const key = "mj5UiXDGeiUWpdAaVg8aS4UOYa2Pj5Pi";

const header = {
  typ: "JWT",
  alg: "HS256",
};

export const JWTKey = jose.base64url.decode(key);

export const getPayload = async (jwt: string) =>
  (await jose.jwtDecrypt<TokenPayloadData>(jwt, JWTKey, header)).payload;
