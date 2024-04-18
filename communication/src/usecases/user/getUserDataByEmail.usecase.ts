import { BadRequestError } from "@carreralink/common";
import { IUserRepository } from "../../database/index.js";
import { IUser } from "../../database/models/user.model.js";

export class GetUserDataByEmailUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ email }: { email?: string }): Promise<IUser> {
    if (!email) throw new BadRequestError("Email is required");
    const data = await this.userRepository.findByEmail(email);
    if (!data) throw new BadRequestError("User not found");
    return data;
  }
}
