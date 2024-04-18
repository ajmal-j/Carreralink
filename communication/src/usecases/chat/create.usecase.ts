import { IChatRepository } from "../../database/index.js";
import { IChat } from "../../types/chat.js";

export class CreateChatUsecase {
  constructor(private readonly chatRepository: IChatRepository) {}

  async execute(chat: IChat) {
    return await this.chatRepository.create(chat);
  }
}
