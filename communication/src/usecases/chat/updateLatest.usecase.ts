import { IChatRepository } from "../../database/index.js";

export class UpdateLatestUseCase {
  constructor(private readonly chatRepository: IChatRepository) {}

  async execute({ chatId, messageId }: { chatId: string; messageId: string }) {
    return await this.chatRepository.updateLatestMessage({
      chatId,
      messageId,
    });
  }
}
