import { IChat } from "../../types/chat.js";
import { IChatModel } from "../models/chat.model.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export class ChatRepository {
  constructor(private readonly database: IChatModel) {}

  async create(chat: IChat) {
    const exist = await this.database.findOne({
      $and: [
        { "participants.user": chat.participants.user },
        { "participants.recruiter": chat.participants.recruiter },
        { "participants.company": chat.participants.company },
      ],
    });
    if (exist) {
      return exist;
    }
    return await this.database.create(chat);
  }

  async getUserChats({ user }: { user: string }) {
    return await this.database
      .find({ "participants.user": user, lastMessage: { $ne: null } })
      .populate("participants.recruiter")
      .populate("lastMessage");
  }

  async deleteChat({ chatId }: { chatId: string }) {
    return await this.database.deleteOne({ _id: chatId });
  }

  async getRecruiterChats({
    recruiter,
    company,
  }: {
    recruiter: string;
    company: string;
  }) {
    return await this.database
      .find({
        "participants.recruiter": recruiter,
        "participants.company": company,
      })
      .populate("participants.user")
      .populate("lastMessage");
  }

  async updateLatestMessage({
    chatId,
    messageId,
  }: {
    chatId: string;
    messageId: string;
  }) {
    return await this.database.updateOne(
      { _id: chatId },
      { $set: { lastMessage: messageId } }
    );
  }

  async findById(id: string): Promise<IChat | null> {
    return await this.database.findOne({ _id: id });
  }
}
