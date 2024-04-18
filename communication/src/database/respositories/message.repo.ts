import { IMessageModel } from "../models/message.model.js";

export class MessageRepository {
  constructor(private readonly database: IMessageModel) {}

  async create(message: Record<string, any>) {
    return await this.database.create(message);
  }
}
