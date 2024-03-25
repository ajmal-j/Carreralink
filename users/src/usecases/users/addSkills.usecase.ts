import { NotFoundError } from "@carreralink/common";
import { UserDataRepository } from "../../database/repository/userData.repo.js";

export class AddSkillsUsecase {
  constructor(private readonly userDataRepo: UserDataRepository) {}
  async execute(email: string, data: string[]) {
    const user = await this.userDataRepo.addSkills(email, data);
    if (!user) throw new NotFoundError("User not found");
    return user;
  }
}
