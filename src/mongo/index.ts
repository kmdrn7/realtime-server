import {env} from "@/common/env";
import mongoose from "mongoose";

const mongodbUrl = env.MONGODB_URL;
export const mongodbConnect = () => {
  mongoose
    .connect(mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      authSource: "admin",
    })
    .then(() => {
      return console.info(`Successfully connected to MongoDB on ${mongodbUrl}`);
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB: ", error);
      return process.exit(1);
    });
};

export const mongodbDisconnect = () => {
  mongoose
    .disconnect()
    .then(() => {
      return console.info(
        `Successfully disconnected to MongoDB on ${mongodbUrl}`,
      );
    })
    .catch((error) => {
      console.error("Error disconnecting to MongoDB: ", error);
      return process.exit(1);
    });
};