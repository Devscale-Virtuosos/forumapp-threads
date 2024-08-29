import express from "express";
import ThreadControllers from "../controllers/thread.controller";

export const threadRouter = express.Router();

threadRouter.get("/", ThreadControllers.handleGetAllThreads);
threadRouter.get("/:id", ThreadControllers.handleGetThreadById);
threadRouter.post("/", ThreadControllers.handleCreateThread);
threadRouter.put("/:id", ThreadControllers.handleUpdateThread);
threadRouter.delete("/:id", ThreadControllers.handleDeleteThread);
