import { cleanEnv, port, str, url } from "envalid";
import dotenv from "dotenv";

dotenv.config();

export const env = cleanEnv(process.env, {
  PORT: port(),
  MONGO_URI: url(),
  RABBITMQ_URI: str(),
  ADD_REPLY_RABBITMQ_QUEUE: str(),
  DELETE_REPLY_RABBITMQ_QUEUE: str(),
});
