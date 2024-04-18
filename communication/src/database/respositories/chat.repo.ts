import { IChat } from "../../types/chat.js";
import { IChatModel } from "../models/chat.model.js";

export class ChatRepository {
  constructor(private readonly database: IChatModel) {}

  async create(chat: IChat) {
    return await this.database.create(chat);
  }

  async getUserChats({ user }: { user: string }) {
    return await this.database.find({ "participants.user": user });
  }
  async getRecruiterChats({ recruiter }: { recruiter: string }) {
    return await this.database.find({ "participants.recruiter": recruiter });
  }
}
