import ThreadRepositories from "../repositories/thread.repository";
import { IInputThread } from "../types";
import {
  createError,
  generateErrorMessage,
  validateInputThread,
} from "../utils";

const ThreadServices = {
  getAll: async () => {
    try {
      const allThreads = await ThreadRepositories.getAll();
      return allThreads;
    } catch (error) {
      throw error;
    }
  },
  getById: async (threadId: string) => {
    try {
      const thread = await ThreadRepositories.getById(threadId);

      if (!thread) {
        throw createError(404, "thread not found");
      }
      return thread;
    } catch (error) {
      throw error;
    }
  },
  create: async (thread: IInputThread) => {
    try {
      // input validation
      const validationResult = validateInputThread(thread);
      if (!validationResult.success) {
        throw createError(
          400,
          generateErrorMessage(validationResult.error.issues)
        );
      }

      const newThread = ThreadRepositories.create(thread);

      return newThread;
    } catch (error) {
      throw error;
    }
  },
  update: async (threadId: string, updatedData: IInputThread) => {
    try {
      // input validation
      const validationResult = validateInputThread(updatedData);
      if (!validationResult.success) {
        throw createError(
          400,
          generateErrorMessage(validationResult.error.issues)
        );
      }

      const updatedThread = await ThreadRepositories.update(
        threadId,
        updatedData
      );
      return updatedThread;
    } catch (error) {
      throw error;
    }
  },
  delete: async (threadId: string) => {
    try {
      const result = await ThreadRepositories.delete(threadId);
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default ThreadServices;
