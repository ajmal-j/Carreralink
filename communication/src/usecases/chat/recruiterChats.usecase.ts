import { BadRequestError } from "@carreralink/common";
import { IChatRepository } from "../../database/index.js";

export class GetRecruiterChatsUseCase {
  constructor(private readonly chatRepository: IChatRepository) {}

  async execute({ recruiter }: { recruiter: string }) {
    if (!recruiter) throw new BadRequestError("Invalid recruiter");
    return await this.chatRepository.getRecruiterChats({ recruiter });
  }
}
