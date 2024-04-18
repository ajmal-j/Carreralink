import { IUserRepository } from "../../database/index.js";

export class UpdateUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({
    user: { email, ...userData },
  }: {
    user: {
      email: string;
      username: string;
      profile: string;
    };
  }) {
    return await this.userRepository.update({ email, userData });
  }
}
