import { NotFoundError } from "@carreralink/common";
import { OtpRepoType, UserRepoType } from "../../database/index.js";
import { IUserAuth } from "../../database/models/user.model.js";
import { IUser } from "../../entities/user.entity.js";

export class VerifyOtpUsecase {
  constructor(
    private readonly userRepository: UserRepoType,
    private readonly OtpRepository: OtpRepoType
  ) {}

  async execute({
    email,
    otp,
  }: {
    email: string;
    otp: string;
  }): Promise<Omit<IUser, "password">> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundError("User not found");
    const otpRecord = await this.OtpRepository.verifyOtp({
      email,
      otp,
    });
    if (!otpRecord) throw new NotFoundError("OTP not found");
    const updatedUser = await this.userRepository.markAsVerified(email);
    if (!updatedUser) throw new NotFoundError("User not found");
    return updatedUser.toJSON();
  }
}
