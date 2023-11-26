import jwt from "jsonwebtoken";
import config from "config";
import log from "./logger";

const publicKey = config.get<string>("publicKey");
const privateKey = config.get<string>("privateKey");

export function signJwt(
  payload: object,
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256", // this algorithm allow us to use public & private key
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);

    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (err: any) {
    log.error(err);

    return {
      valid: false,
      expired: err.message === "jwt expired",
      decoded: null,
    };
  }
}
