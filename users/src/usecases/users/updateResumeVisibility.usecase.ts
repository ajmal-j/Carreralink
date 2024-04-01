import { NotFoundError } from "@carreralink/common";
import { IUserDataRepo } from "../../database/index.js";
import { IUserData } from "../../database/models/userData.model.js";

export class UpdateResumeVisibilityUsecase {
  constructor(private readonly UserDataRepo: IUserDataRepo) {}

  async execute(
    email: string,
    visibility: boolean
  ): Promise<Pick<IUserData, "resume">> {
    const updated = await this.UserDataRepo.updateVisibility(email, visibility);
    if (!updated) throw new NotFoundError("User not found");
    return updated;
  }
}
