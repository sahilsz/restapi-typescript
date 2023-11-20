import config from "config";
import express from "express";

import log from "./utils/logger";
import connectDb from "./utils/connectDB";

const port = config.get<number>("port");

const app = express();

app.listen(port, async () => {
  log.info(`App is listening at port ${port}`);
  await connectDb();
});
