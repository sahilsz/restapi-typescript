/* Add the user object to the request object */
import { get } from "lodash"; // get makes it easier to access a property that we're not sure exists on the object
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh") as string;

  if (!accessToken) return next();

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  // re-issue token
  if (refreshToken && expired) {
    const newAcessToken = await reIssueAccessToken({
      refreshToken,
    });

    if (newAcessToken) {
      res.setHeader("x-access-token", newAcessToken);
    }

    const result = verifyJwt(newAcessToken as string);
    res.locals.user = result.decoded;

    return next();
  }
};

export default deserializeUser;
