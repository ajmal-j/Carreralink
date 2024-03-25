import { IUserDataRepo } from "../../database/index.js";

export class AddExperienceUsecase {
  constructor(private readonly UserDataRepo: IUserDataRepo) {}

  async execute(email: string, data: Record<string, any>) {
    const user = await this.UserDataRepo.addExperience(email, data);
    if (!user) throw new Error("User not found");
    return user;
  }
}
