import mongoose, { Document, ObjectId } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

interface IChat extends Document {
  users: [ObjectId];
  lastMessage: ObjectId;
}

const chatSchema = new mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
      },
    },
  }
);

chatSchema.plugin(aggregatePaginate);

export const ChatModel = mongoose.model<IChat>("Chat", chatSchema);

export type IChatModel = typeof ChatModel & {
  aggregatePaginate?: any;
};
