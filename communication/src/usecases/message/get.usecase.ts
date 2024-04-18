import { IMessageRepository } from "../../database/index.js";

export class GetMessageUsecase {
  constructor(private readonly messageRepository: IMessageRepository) {}

  async execute({ chatId }: { chatId: string }) {
    return await this.messageRepository.getMessages({ chatId });
  }
}
