import { NotFoundError } from "@carreralink/common";
import { IUserDataRepo } from "../database/index.js";

export class UpdateProfilePicUsecase {
  constructor(private userDataRepo: IUserDataRepo) {}

  async execute(email: string, url: string) {
    if (!email) throw new NotFoundError("Email is required");
    if (!url) throw new NotFoundError("Url is required");
    return await this.userDataRepo.updateProfilePic(email, url);
  }
}
