import { UserRepoType } from "../../database/index.js";
 

export class UpdateUserBlockUsecase {
  constructor(private readonly userRepository: UserRepoType) {}

  async execute({ email, isBlocked }: { email: string; isBlocked: boolean }) {
    return await this.userRepository.updateBlock({ email, isBlocked });
  }
}
