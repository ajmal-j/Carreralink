import { NotFoundError } from "@carreralink/common";
import { IUserDataRepo } from "../database/index.js";

export class CurrentUserUsecase {
  constructor(private readonly UserDataRepo: IUserDataRepo) {}

  async execute(email: string) {
    const user = await this.UserDataRepo.findByEmail(email);
    if (!user) throw new NotFoundError("User not found");
    return user;
  }
}
