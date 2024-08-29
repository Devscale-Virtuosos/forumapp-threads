import { model, Schema } from "mongoose";

// schema
const threadSchema = new Schema(
  {
    userId: String,
    content: String,
    replies: [String],
  },
  {
    timestamps: true,
  }
);

// create collection and export it
export const Thread = model("Thread", threadSchema);
