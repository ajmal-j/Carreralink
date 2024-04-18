import mongoose, { Document, ObjectId } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

interface IChat {
  participants: {
    user: ObjectId;
    recruiter: ObjectId;
    company: string;
  };
  lastMessage: ObjectId;
}

interface IChatSchema extends IChat, Document {}

const chatSchema = new mongoose.Schema(
  {
    participants: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      company: { type: String, required: true },
    },
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

export const ChatModel = mongoose.model<IChatSchema>("Chat", chatSchema);

export type IChatModel = typeof ChatModel & {
  aggregatePaginate?: any;
};
