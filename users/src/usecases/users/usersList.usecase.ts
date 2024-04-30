import { IUserDataRepo } from "../../database/index.js";

export class UsersListUsecase {
  constructor(private readonly UserDataRepo: IUserDataRepo) {}

  async execute(query: { p: number; q: string }) {
    return await this.UserDataRepo.usersList(query);
  }
}
