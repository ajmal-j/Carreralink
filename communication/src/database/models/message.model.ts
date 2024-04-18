import mongoose, { Document, ObjectId } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

interface IMessage extends Document {
  sender: ObjectId;
  content: string;
  chatId: ObjectId;
}

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
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

messageSchema.plugin(aggregatePaginate);

export const MessageModel = mongoose.model<IMessage>("Message", messageSchema);
export type IMessageModel = typeof MessageModel & {
  aggregatePaginate?: any;
};
