/* Add the user object to the request object */
import { get } from "lodash"; // get makes it easier to access a property that we're not sure exists on the object
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) return next();

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
};

export default deserializeUser;
