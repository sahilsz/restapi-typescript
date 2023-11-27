import config from "config";
import { Request, Response } from "express";

import { signJwt } from "../utils/jwt.utils";
import { validatePassword } from "../service/user.service";
import { createUserSession, findSessions } from "../service/session.service";

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  // create a session
  const session = await createUserSession(
    user._id,
    req.get("user-agent") || ""
  );

  // create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: config.get<string>("accessTokenTTL"),
    } // 15 mins
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get<string>("refreshTokenTTL") }
  );

  // return access & refresh tokens
  return res.send({ accessToken, refreshToken });
}

