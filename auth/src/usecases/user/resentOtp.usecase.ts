import { UnauthorizedError } from "@carreralink/common";
import { OtpRepoType } from "../../database/index.js";
import { UserRepository } from "../../database/repositories/user.repository.js";
import { generateOtp } from "../../utils/generateOtp.js";

export class ResentOtpUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly otpRepository: OtpRepoType,
    private readonly sendOtp: ({
      email,
      otp,
    }: {
      email: string;
      otp: string;
    }) => Promise<void>
  ) {}

  async execute({ email }: { email: string }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UnauthorizedError("User not found");
    const otp = generateOtp();
    await this.sendOtp({ email, otp });
    await this.otpRepository.createOtp({ email, otp });
  }
}
