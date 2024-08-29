import type { NextFunction, Request, Response } from "express";

import ThreadServices from "../services/thread.service";
import { createError } from "../utils";

const ThreadControllers = {
  handleGetAllThreads: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const allThreads = await ThreadServices.getAll();

      res.status(200).json({
        message: "Successfully get all threads",
        data: allThreads,
      });
    } catch (error) {
      next(error);
    }
  },
  handleGetThreadById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const thread = await ThreadServices.getById(req.params.id);

      res.status(200).json({
        message: "Successfully get thread",
        data: thread,
      });
    } catch (error) {
      next(error);
    }
  },
  handleCreateThread: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { content, userId } = req.body;

      const newThread = await ThreadServices.create({ content, userId });

      if (!newThread) {
        throw createError(400, "Failed to create thread");
      }

      res.status(201).json({
        message: "Successfully created thread",
        data: newThread,
      });
    } catch (error) {
      next(error);
    }
  },
  handleUpdateThread: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId, content } = req.body;
      const updatedThread = await ThreadServices.update(req.params.id, {
        userId,
        content,
      });

      res.status(200).json({ message: "Successfully update thread" });
    } catch (error) {
      next(error);
    }
  },
  handleDeleteThread: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await ThreadServices.delete(req.params.id);

      if (!result) {
        throw createError(400, "Failed to delete thread");
      }

      res.status(200).json({
        message: "Successfully delete thread",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default ThreadControllers;
