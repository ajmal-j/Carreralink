import { IUserDataRepo } from "../database/index.js";

export class UpdateProfileUsecase {
  constructor(private readonly UserDataRepo: IUserDataRepo) {}

  async execute(email: string, data: Record<string, any>) {
    const user = await this.UserDataRepo.updateProfile(email, data);
    if (!user) throw new Error("User not found");
    return user;
  }
}
