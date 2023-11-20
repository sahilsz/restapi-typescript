import config from "config";
import mongoose from "mongoose";

import log from "./logger";

const dbURI = config.get<string>("dbURI");

export default async function connectDb() {
  try {
    await mongoose.connect(dbURI);
    log.info("Connected to db");
  } catch (err) {
    log.info("Someting Went Wrong!!!");
    log.error(err);
    process.exit(1);
  }
}
