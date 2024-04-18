import { BadRequestError } from "@carreralink/common";
import { IChatRepository } from "../../database/index.js";
import { IChat } from "../../types/chat.js";

export class FindChatUsecase {
  constructor(private readonly chatRepository: IChatRepository) {}

  async execute({ chatId }: { chatId: string }): Promise<IChat> {
    const chat = await this.chatRepository.findById(chatId);
    if (!chat) {
      throw new BadRequestError("Chat not found");
    }
    // @ts-expect-error
    return chat.toJSON();
  }
}
