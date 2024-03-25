import { UserRepoType } from "../../database/index.js";
import {
  IPasswordUtil,
  NotFoundError,
  UnauthorizedError,
} from "@carreralink/common";

export class LogInUsecase {
  constructor(
    private readonly passwordUtil: IPasswordUtil,
    private readonly userRepository: UserRepoType
  ) {}

  async execute(userData: { email: string; password: string }) {
    const user = await this.userRepository.findByEmail(userData.email);
    if (!user) throw new NotFoundError("Invalid credentials");
    if (user?.isBlocked) throw new UnauthorizedError("You have been blocked");
    const isPasswordValid = await this.passwordUtil.comparePassword(
      userData.password,
      user.password as string
    );
    if (!isPasswordValid) throw new UnauthorizedError("Incorrect password.");
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
