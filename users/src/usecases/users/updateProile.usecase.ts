import { CustomError } from "@carreralink/common";
import { IUserDataRepo } from "../../database/index.js";
import { IUserData } from "../../database/models/userData.model.js";

export class UpdateProfileUsecase {
  constructor(private readonly UserDataRepo: IUserDataRepo) {}

  async execute(email: string, data: Record<string, any>): Promise<IUserData> {
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
