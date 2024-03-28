import {
  BadRequestError,
  CustomError,
  NotFoundError,
} from "@carreralink/common";
import { OtpModelType } from "../models/otp.model.js";

export class OtpRepository {
  constructor(private readonly database: OtpModelType) {}

  async createOtp({ email, otp }: { email: string; otp: string }) {
    const user = await this.database.findOne({ email });
    if (user) {
      user.otp = otp;
      user.expiresAt = new Date(Date.now() + 5 * 60 * 1000);
      await user.save();
      return user;
    } else
      return await this.database.create({
        email,
        otp,
      });
  }
  async verifyOtp({ email, otp }: { email: string; otp: string }) {
    const otpRecord = await this.database.findOne({ email });
    if (!otpRecord) throw new NotFoundError("Please resent OTP.");
    if (otpRecord.otp !== otp) throw new BadRequestError("Invalid OTP.");
    return true;
  }
}
