import z from "zod";
import { IInputThread } from "../types";

export const inputThreadSchema = z.object({
  userId: z.string(),
  content: z.string(),
});

export function validateInputThread(thread: IInputThread) {
  return inputThreadSchema.safeParse(thread);
}
