import express from "express";
import config from "config";
import connectDb from "./utils/connectDB";

const port = config.get<number>("port");

const app = express();

app.listen(port, async () => {
  console.log(`App is listening at port ${port}`);
  await connectDb();
});
