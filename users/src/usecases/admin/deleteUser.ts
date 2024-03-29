import { IUserDataRepo } from "../../database/index.js";

export class DeleteUsersUsecase {
  constructor(private readonly UserDataRepo: IUserDataRepo) {}

  async execute(users: string[]) {
    return await this.UserDataRepo.deleteUsers(users);
  }
}
