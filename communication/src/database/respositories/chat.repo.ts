import { IChatModel } from "../models/chat.model.js";

export class ChatRepository {
  constructor(private readonly database: IChatModel) {}

  async create(chat: Record<string, any>) {
    return await this.database.create(chat);
  }

}
