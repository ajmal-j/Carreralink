import { UserRepoType } from "../database/index.js";
import { NotFoundError } from "@carreralink/common";

export class GoogleLogInUsecase {
  constructor(private readonly userRepository: UserRepoType) {}

  async execute(userData: { email: string }) {
    const user = await this.userRepository.findByEmail(userData.email);
    if (!user) throw new NotFoundError("Invalid credentials");
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