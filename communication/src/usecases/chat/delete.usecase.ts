import { IChatRepository } from "../../database/index.js";

export class DeleteChatUsecase {
  constructor(private readonly chatRepository: IChatRepository) {}

  async execute({ chatId }: { chatId: string }) {
    await this.chatRepository.deleteChat({ chatId });
  }
}
