import { IUserDataRepo } from "../../database/index.js";

export class GetUserUsecase {
  constructor(private readonly UserDataRepo: IUserDataRepo) {}

  async execute({ username }: { username: string }) {
    return await this.UserDataRepo.findByUsername(username);
  }
}
