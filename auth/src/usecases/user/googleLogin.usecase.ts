import { OtpRepoType, UserRepoType } from "../../database/index.js";
import {
  CustomResponse,
  NotFoundError,
  UnauthorizedError,
} from "@carreralink/common";
import { generateOtp } from "../../utils/generateOtp.js";

export class GoogleLogInUsecase {
  constructor(
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

  async execute(userData: { email: string }) {
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
