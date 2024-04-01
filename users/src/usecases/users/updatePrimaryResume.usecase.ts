import { NotFoundError } from "@carreralink/common";
import { IUserDataRepo } from "../../database/index.js";
import { IUserData } from "../../database/models/userData.model.js";

export class UpdatePrimaryResumeUsecase {
  constructor(private readonly UserDataRepo: IUserDataRepo) {}

  async execute(
    email: string,
    primary: number
  ): Promise<Pick<IUserData, "resume">> {
    const updated = await this.UserDataRepo.updatePrimaryResume(email, primary);
    if (!updated) throw new NotFoundError("User not found");
    return updated;
  }
}
