import express from "express";
import morgan from "morgan";

import { checkOriginMiddleware, errorHandlerMiddleware } from "./middlewares";
import { threadRouter } from "./routes/thread.route";
import {
  connectMongodb,
  consumeReplyAddedEvent,
  consumeReplyDeletedEvent,
  env,
} from "./utils";

connectMongodb();
consumeReplyAddedEvent();
consumeReplyDeletedEvent();

const app = express();

app.use(express.json());
app.use(morgan("common")); // to log http request
app.use(checkOriginMiddleware);

/**
 * Routes
 */
app.use("/", threadRouter);

// error handler middleware, place it after all routes
app.use(errorHandlerMiddleware);

app.listen(env.PORT || 8002, () => {
  console.log(`Server running at port: ${env.PORT || 8002}`);
});
