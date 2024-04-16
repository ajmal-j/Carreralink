import { BadRequestError, NotFoundError } from "@carreralink/common";
import { IUserRepoType } from "../../database/index.js";
import { IUser } from "../../database/models/user.model.js";

export class GetUserDataByEmailUsecase {
  constructor(private readonly UserDataRepo: IUserRepoType) {}

  async execute(email?: string): Promise<IUser> {
    if (!email) throw new BadRequestError("Email is required");
    const user = await this.UserDataRepo.findByEmail(email);
    if (!user) throw new NotFoundError("User not found");
    return user;
  }
}
