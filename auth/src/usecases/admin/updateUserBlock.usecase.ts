import { IUserRepo } from "../../database/repositories/user.repository.js";

export class UpdateUserBlockUsecase {
  constructor(private readonly userRepository: IUserRepo) {}

  async execute({ email, isBlocked }: { email: string; isBlocked: boolean }) {
    return await this.userRepository.updateBlock({ email, isBlocked });
  }
}
