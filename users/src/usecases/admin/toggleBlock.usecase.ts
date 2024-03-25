import { IUserDataRepo } from "../../database/index.js";

export class ToggleBlockUsecase {
  constructor(private readonly UserDataRepo: IUserDataRepo) {}

  async execute(email: string) {
    return await this.UserDataRepo.toggleBlock(email);
  }
}
