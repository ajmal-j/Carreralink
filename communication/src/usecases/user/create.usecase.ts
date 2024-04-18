import { IUserRepository } from "../../database/index.js";
import { IUser } from "../../database/models/user.model.js";

export class CreateUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: IUser) {
    return await this.userRepository.create(data);
  }
}
