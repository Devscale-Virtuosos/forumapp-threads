import amqplib from "amqplib";
import ThreadRepositories from "../repositories/thread.repository";
import { env } from "./env";

export async function rabbitmq(queue: string) {
  const connection = await amqplib.connect(env.RABBITMQ_URI);

  // create channel
  const channel = await connection.createChannel();

  // ensure that "queue" exists in the channel
  await channel.assertQueue(queue, { durable: false });

  return channel;
}

export async function consumeReplyAddedEvent() {
  const queue = env.ADD_REPLY_RABBITMQ_QUEUE;
  const channel = await rabbitmq(queue);

  channel.consume(queue, async (message) => {
    if (message === null) return;

    try {
      const { _id: replyId, threadId } = JSON.parse(message.content.toString());

      const thread = await ThreadRepositories.getById(threadId);

      if (!thread) {
        throw new Error("Thread not found");
      }

      const newReplies = [...thread.replies, replyId];
      const updatedThread = await ThreadRepositories.updateReplies(
        threadId,
        newReplies
      );

      console.log("Successfully add reply");
      return updatedThread;
    } catch (error) {
      console.log("Failed to add reply", error);
    }
  });
}

export async function consumeReplyDeletedEvent() {
  const queue = env.DELETE_REPLY_RABBITMQ_QUEUE;
  const channel = await rabbitmq(queue);

  channel.consume(queue, async (message) => {
    if (message === null) return;

    try {
      const { _id: deletedReplyId, threadId } = JSON.parse(
        message.content.toString()
      );

      const thread = await ThreadRepositories.getById(threadId);

      if (!thread) {
        throw new Error("Thread not found");
      }

      const newReplies = thread.replies.filter(
        (replyId) => replyId !== deletedReplyId
      );
      const updatedThread = await ThreadRepositories.updateReplies(
        threadId,
        newReplies
      );

      console.log("Successfully delete reply");
      return updatedThread;
    } catch (error) {
      console.log("Failed to delete reply", error);
    }
  });
}
