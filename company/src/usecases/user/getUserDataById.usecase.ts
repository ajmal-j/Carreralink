import { BadRequestError, NotFoundError } from "@carreralink/common";
import { IUserRepoType } from "../../database/index.js";
import { IUser } from "../../database/models/user.model.js";

export class GetUserDataByIdUsecase {
  constructor(private readonly UserDataRepo: IUserRepoType) {}

  async execute(id?: string): Promise<IUser> {
    if (!id) throw new BadRequestError("Id is required");
    const user = await this.UserDataRepo.findById(id);
    if (!user) throw new NotFoundError("User not found");
    return user;
  }
}
