import { IUserDataRepo } from "../../database/index.js";

export class GetUsersUsecase {
  constructor(private readonly UserDataRepo: IUserDataRepo) {}

  async execute(query: { p: number, q: string }) {
    return await this.UserDataRepo.getUsers(query);
  }
}
