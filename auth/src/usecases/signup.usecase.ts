import { UserRepoType } from "../database/index.js";
import { IUser, User } from "../entities/user.entity.js";
import { IPasswordUtil } from "@carreralink/common";

export class SignUpUsecase {
  constructor(
    private readonly passwordUtil: IPasswordUtil,
    private readonly userRepository: UserRepoType
  ) {}

  async execute(userData: IUser) {
    const hashedPassword = await this.passwordUtil.hashPassword(
      userData.password
    );
    userData.password = hashedPassword;
    const user = new User(userData);
    return user;
  }
}
