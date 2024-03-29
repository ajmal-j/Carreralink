import {
  BadRequestError,
  IPasswordUtil,
  NotFoundError,
  UnauthorizedError,
} from "@carreralink/common";
import { UserRepoType } from "../../database/index.js";

export class AdminLoginUsecase {
  constructor(
    private readonly UserRepository: UserRepoType,
    private readonly passwordUtil: IPasswordUtil
  ) {}

  async execute(email: string, password: string) {
    const user = await this.UserRepository.findByEmail(email);
    if (!user) throw new NotFoundError("User not found");

    if (!user?.isAdmin) throw new UnauthorizedError("Invalid credentials.");

    const isPasswordValid = await this.passwordUtil.comparePassword(
      password,
      user.password as string
    );
    if (!isPasswordValid) throw new BadRequestError("Invalid password");
    const data = {
      username: user.username,
      email: user.email,
      contact: user.contact,
      role: user.role,
      id: user._id,
      isAdmin: user.isAdmin,
    };
    return data;
  }
}
