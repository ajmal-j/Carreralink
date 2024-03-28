import { CustomError } from "@carreralink/common";
import { IUserDataRepo } from "../../database/index.js";

export class UpdateProfileUsecase {
  constructor(private readonly UserDataRepo: IUserDataRepo) {}

  async execute(email: string, data: Record<string, any>) {
    const isAlreadyTaken = await this.UserDataRepo.isAlreadyTaken({
      email,
      ...data,
    });
    if (isAlreadyTaken)
      throw new CustomError(`${isAlreadyTaken} is already taken.`, 409);
    const user = await this.UserDataRepo.updateProfile(email, data);
    if (!user) throw new Error("User not found");
    return user;
  }
}
