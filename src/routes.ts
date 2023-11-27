import { Express, Request, Response } from "express";

import validate from "./middleware/validateResource";
import sessionSchema from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import { createUserHandler } from "./controller/user.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import requireUser from "./middleware/requireUser";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register User
  app.post("/api/users", validate(createUserSchema), createUserHandler);

  // Login
  app.post("/api/sessions", validate(sessionSchema), createUserSessionHandler);

}

export default routes;
