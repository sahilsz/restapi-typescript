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
