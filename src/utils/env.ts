import { cleanEnv, port, url } from "envalid";
import dotenv from "dotenv";

dotenv.config();

export const env = cleanEnv(process.env, {
  PORT: port(),
  MONGO_URI: url(),
});
