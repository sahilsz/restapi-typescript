import config from "config";
import express from "express";

import routes from "./routes";
import log from "./utils/logger";
import connectDb from "./utils/connectDB";
import deserializeUser from "./middleware/deserializeUser";

const port = config.get<number>("port");

const app = express();

app.use(express.json());

app.use(deserializeUser);

app.listen(port, async () => {
  log.info(`App is listening at port ${port}`);

  await connectDb();

  routes(app);
});
