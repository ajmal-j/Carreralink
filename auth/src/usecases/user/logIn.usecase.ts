import { OtpRepoType, UserRepoType } from "../../database/index.js";
import {
  CustomError,
  CustomResponse,
  IPasswordUtil,
  NotFoundError,
  UnauthorizedError,
} from "@carreralink/common";
import { generateOtp } from "../../utils/generateOtp.js";

export class LogInUsecase {
  constructor(
    private readonly passwordUtil: IPasswordUtil,
    private readonly userRepository: UserRepoType,
    private readonly OtpRepository: OtpRepoType,
    private readonly sendOtp: ({
      email,
      otp,
    }: {
      email: string;
      otp: string;
    }) => Promise<void>
  ) {}

  async execute(userData: { email: string; password: string }) {
    const user = await this.userRepository.findByEmail(userData.email);
    if (!user) throw new NotFoundError("Invalid credentials");
    if (user?.isBlocked) throw new UnauthorizedError("You have been blocked");
    if (!user?.isVerified) {
      const otp = generateOtp();
      await this.sendOtp({ otp, email: userData.email });
      await this.OtpRepository.createOtp({
        email: userData.email,
        otp,
      });
      return new CustomResponse()
        .message("Please verify your email")
        .statusCode(403);
    }
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
