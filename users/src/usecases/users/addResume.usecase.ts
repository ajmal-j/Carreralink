import { NotFoundError } from "@carreralink/common";
import { IUserDataRepo } from "../../database/index.js";
import { IUserData } from "../../database/models/userData.model.js";

export class AddResumeUsecase {
  constructor(private readonly UserDataRepo: IUserDataRepo) {}

  async execute({
    email,
    url,
    name,
  }: {
    email: string;
    url: string;
    name: string;
  }): Promise<Pick<IUserData, "resume">> {
    const updated = await this.UserDataRepo.addResume({
      email,
      url,
      name,
    });
    if (!updated) throw new NotFoundError("User not found");
    return updated;
  }
}
