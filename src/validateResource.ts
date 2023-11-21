/* 
When a request comes in, we're going to provide a schema and it's going to validate the request against that schema
*/
import { AnyZodObject } from "zod";
import { NextFunction, Request, Response } from "express";
import log from "./utils/logger";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (err: any) {
      log.error(err);
      return res.status(400).send(err.errors);
    }
  };

export default validate;
