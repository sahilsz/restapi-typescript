import { Express, Request, Response } from "express";

import validate from "./middleware/validateResource";
import sessionSchema from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import { createUserHandler } from "./controller/user.controller";
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import requireUser from "./middleware/requireUser";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register User
  app.post("/api/users", validate(createUserSchema), createUserHandler);

  // Login
  app.post("/api/sessions", validate(sessionSchema), createUserSessionHandler);

  // Get the user's session
  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  // Delete the user's session
  app.delete("/api/sessions", requireUser, deleteUserSessionHandler);
}

export default routes;
