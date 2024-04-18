import { IMessageRepository } from "../../database/index.js";

export class CreateMessageUsecase {
  constructor(private readonly messageRepository: IMessageRepository) {}

  async execute(data: { sender: string; content: string; chatId: string }) {
    return await this.messageRepository.create(data);
  }
}
