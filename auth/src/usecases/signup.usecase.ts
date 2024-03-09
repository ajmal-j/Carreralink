import { UserRepoType } from "../database/index.js";
import { IUser, User } from "../entities/user.entity.js";
import { CustomError, IPasswordUtil } from "@carreralink/common";

export class SignUpUsecase {
  constructor(
    private readonly passwordUtil: IPasswordUtil,
    private readonly userRepository: UserRepoType
  ) {}

  async execute(userData: IUser) {
    const isAlreadyTaken = await this.userRepository.isAlreadyTaken(userData);
    if (isAlreadyTaken) throw new CustomError("User already exists", 409);
    const hashedPassword = await this.passwordUtil.hashPassword(
      userData.password
    );
    userData.password = hashedPassword;
    const user = new User(userData);
    this.userRepository.createUser(user);
    return user;
  }
}
