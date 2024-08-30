import { Thread } from "./models/thread.schema";
import { IInputThread } from "../types";

const ThreadRepositories = {
  getAll: async () => {
    try {
      const allThreads = await Thread.find();
      return allThreads;
    } catch (error) {
      throw error;
    }
  },
  getById: async (threadId: string) => {
    try {
      const thread = await Thread.findById(threadId);
      return thread;
    } catch (error) {
      throw error;
    }
  },
  create: async (thread: IInputThread) => {
    try {
      const createThread = new Thread(thread);

      const newThread = await createThread.save();

      return newThread;
    } catch (error) {
      throw error;
    }
  },
  update: async (threadId: string, updatedData: IInputThread) => {
    try {
      const updatedThread = await Thread.findByIdAndUpdate(
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
      const result = await Thread.findByIdAndDelete(threadId);
      return result;
    } catch (error) {
      throw error;
    }
  },
  updateReplies: async (threadId: string, replies: string[]) => {
    try {
      const updatedThread = await Thread.findByIdAndUpdate(threadId, {
        replies,
      });
      return updatedThread;
    } catch (error) {
      throw error;
    }
  },
};

export default ThreadRepositories;
