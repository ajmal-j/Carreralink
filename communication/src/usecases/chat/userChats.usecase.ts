import { BadRequestError } from "@carreralink/common";
import { IChatRepository } from "../../database/index.js";

export class GetUserChatsUseCase {
  constructor(private readonly chatRepository: IChatRepository) {}

  async execute({ user }: { user: string }) {
    if (!user) throw new BadRequestError("Invalid user");
    return await this.chatRepository.getUserChats({ user });
  }
}
