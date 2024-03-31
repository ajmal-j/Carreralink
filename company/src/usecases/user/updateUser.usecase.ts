import { IUserRepoType } from "../../database/index.js";

export class UpdateUserUsecase {
  constructor(private readonly userRepository: IUserRepoType) {}

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
