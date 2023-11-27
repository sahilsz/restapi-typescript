import { NextFunction, Request, Response } from "express";

/**
 * Middleware to make sure user object is present on the res object. If user object is present then
 * call the next else send 403 response.
 */
function requireUser(req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
}

export default requireUser;
