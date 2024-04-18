import { IMessageModel } from "../models/message.model.js";

export class MessageRepository {
  constructor(private readonly database: IMessageModel) {}

  async create(data: { sender: string; content: string; chatId: string }) {
    return await this.database.create(data);
  }

  async getMessages({ chatId }: { chatId: string }) {
    return await this.database.find({ chatId });
  }
}
