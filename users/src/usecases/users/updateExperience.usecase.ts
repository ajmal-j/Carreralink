import { NotFoundError } from "@carreralink/common";
import { IUserDataRepo } from "../../database/index.js";

export class UpdateExperienceUsecase {
  constructor(private readonly UserDataRepo: IUserDataRepo) {}
  async execute(email: string, data: any) {
    const user = await this.UserDataRepo.updateExperience(email, data);
    if (!user) throw new NotFoundError("User not found");
    return user;
  }
}
