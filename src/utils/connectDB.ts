import mongoose from "mongoose";
import config from "config";

const dbURI = config.get<string>("dbURI");

export default async function connectDb() {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to db");
  } catch (err) {
    console.log("Someting Went Wrong!!!");
    console.error(err);
    process.exit(1);
  }
}
